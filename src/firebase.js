import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import {
  getFirstDayIndex,
  getLastDayOfMonth,
  getMonthName,
} from "./utils/calendar";
import { getDateYYYYMMDD, getDateYYYYMM } from "./utils/dateParser";

/**FIREBASE CONFIGURATION AND INSTANCES */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

/**************************************************************************************
 **************************************************************************************
 *********************SIGNING IN AND CREATING NEW PROFILE(WORKER)**********************
 **************************************************************************************
 *************************************************************************************/

export const connectTicketWithEmail = async (email, password) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};
export const connectTicketWithEmailGoogle = async () => {
  return await auth.signInWithPopup(provider);
};
export const connectTicketWithEmailFacebook = async () => {
  return await auth.signInWithPopup(providerFacebook);
};

export const signInWithGoogle = async () => {
  auth.signInWithPopup(provider);
};
export const fetchSignInMethodsForEmail = async (email) => {
  //auth.signInWithPopup(provider);
  return auth.fetchSignInMethodsForEmail(email);
};
export const signInWithFacebook = async () => {
  return await auth.signInWithPopup(providerFacebook);
};

export const signOutUser = () => {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const sendUserVerificationEmail = async () => {
  return await auth.currentUser.sendEmailVerification();
};

export const signInWithEmailAndPassword = async (email, password) => {
  return await auth
    .signInWithEmailAndPassword(email, password)
    .then(function (firebaseUser) {
      return firebaseUser;
    })
    .catch(function (error) {
      return error;
    });
};
/**************************************************************************************
 **************************************************************************************
 *********************UPDATING PROFILE OF THE USER*************************************
 **************************************************************************************
 *************************************************************************************/

export const sendResetEmail = (email) => {
  return auth.sendPasswordResetEmail(email);
};

export const updateUserPassword = (currentPassword, newPassword) => {
  var user = auth.currentUser;
  const emailCred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  user
    .reauthenticateWithCredential(emailCred)
    .then(() => {
      // User successfully reauthenticated.
      return user.updatePassword(newPassword);
    })
    .catch((error) => {
      return error.message;
    });
};
//////////////////////ARTCAFFE///////////////////////////////
export const getOpeningHours = async () => {
  const docRef = doc(firestore, "opening_hours_schedule", "monday-sunday");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("Missing opening hours");
  }
};
export const updateOpeningHours = async (openingHours) => {
  const docRef = doc(firestore, "opening_hours_schedule", "monday-sunday");
  return await updateDoc(docRef, { schedule: openingHours });
};

export const generateMonthOpeningHours = async (date) => {
  try {
    const yearMonth = getDateYYYYMM(date);
    const openningHoursDoc = doc(firestore, "opening_hours_days", yearMonth);
    return await runTransaction(firestore, async (transaction) => {
      //month document does not exist
      const openingHoursDoc = await transaction.get(openningHoursDoc);
      if (!openingHoursDoc.exists()) {
        const openingHoursSchedule = doc(
          firestore,
          "opening_hours_schedule",
          "monday-sunday"
        );
        const openingHoursScheduleDoc = await transaction.get(
          openingHoursSchedule
        );
        if (openingHoursScheduleDoc.exists()) {
          const previousMonth = new Date();
          previousMonth.setMonth(date.getMonth() - 1);
          const previousYearMonth = getDateYYYYMM(previousMonth);
          const previousMonthSchedule = doc(
            firestore,
            "opening_hours_days",
            previousYearMonth
          );
          const previousOpeningHoursScheduleDoc = await transaction.get(
            previousMonthSchedule
          );
          let data;
          if (previousOpeningHoursScheduleDoc.exists()) {
            const oh = openingHoursScheduleDoc.data();
            data = previousOpeningHoursScheduleDoc.data();
            delete data[getMonthName(previousMonth)];
            delete data["Closed"][getMonthName(previousMonth)];
            const newMonth = new Date();
            newMonth.setMonth(date.getMonth() + 3);
            const newDocRef = doc(firestore, "opening_hours_days", yearMonth);
            const openning_hours = oh.schedule;
            let tempDate = new Date(newMonth);
            const lastMonthDay = getLastDayOfMonth(newMonth);
            let actualDay = getFirstDayIndex(newMonth);
            const monthName = getMonthName(newMonth);
            data["Closed"][monthName] = [];
            data[monthName] = {};
            for (let a = 1; a <= lastMonthDay; a++) {
              data[monthName][getDateYYYYMMDD(tempDate)] = {
                start: openning_hours[actualDay * 2].toString(),
                end: openning_hours[actualDay * 2 + 1].toString(),
              };
              if (actualDay == 6) actualDay = 0;
              else actualDay++;
              tempDate.setDate(tempDate.getDate() + 1);
            }

            transaction.set(newDocRef, data);
          }
          //previous schedule does not exist
          else {
            const oh = openingHoursScheduleDoc.data();
            const newDocRef = doc(firestore, "opening_hours_days", yearMonth);
            const openning_hours = oh.schedule;
            data = {};
            data["Closed"] = {};
            for (let i = 0; i < 4; i++) {
              let tempMonthDate = new Date(date);
              tempMonthDate.setMonth(tempMonthDate.getMonth() + i);
              const lastMonthDay = getLastDayOfMonth(tempMonthDate);
              const monthName = getMonthName(tempMonthDate);

              data[monthName] = {};
              data["Closed"][monthName] = [];

              let tempDate = new Date(tempMonthDate);
              let actualDay = getFirstDayIndex(tempMonthDate);
              for (let a = 1; a <= lastMonthDay; a++) {
                data[monthName][getDateYYYYMMDD(tempDate)] = {
                  start: openning_hours[actualDay * 2].toString(),
                  end: openning_hours[actualDay * 2 + 1].toString(),
                };
                if (actualDay == 6) actualDay = 0;
                else actualDay++;
                tempDate.setDate(tempDate.getDate() + 1);
              }
            }

            //////////////////////////////////////////////////
            transaction.set(newDocRef, data);
          }
          return data;
        } else {
          Promise.reject("Sorry! Contact manager due to this error");
          return "Schedule not found";
        }
      }
      //month document exists not able to rewrite
      else {
        Promise.reject("Sorry! Month document already generated");
        return "error";
      }
    });
  } catch (e) {
    console.error(e);
  }
};
export const getThreeMonthsOpeningHours = async (date) => {
  const docRef = doc(firestore, "opening_hours_days", getDateYYYYMM(date));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return generateMonthOpeningHours(date);
  }
};
export const getReservations = async (date) => {
  const docRef = doc(firestore, "reservations", getDateYYYYMM(date));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("exist");
    return docSnap.data();
  } else {
    return null;
  }
};
export const getReservationsPublic = async (date) => {
  const docRef = doc(firestore, "reservations_public", getDateYYYYMM(date));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("exist");
    return docSnap.data();
  } else {
    return null;
  }
};
export const createReservation = async (
  date,
  name,
  phone,
  email,
  people,
  table,
  time
) => {
  // Create an initial document to update.
  const monthDocumentPublic = doc(
    firestore,
    "reservations_public",
    getDateYYYYMM(date)
  );

  try {
    const month = getDateYYYYMM(date);
    const day = getDateYYYYMMDD(date);
    return await runTransaction(firestore, async (transaction) => {
      //have to access public document user does not have permission to read reservation collection just to write to it.
      const monthDoc = await transaction.get(monthDocumentPublic);
      //month document does not exist
      if (!monthDoc.exists()) {
        const newDocRef = doc(firestore, "reservations", month);
        const newPublicDocRef = doc(firestore, "reservations_public", month);

        transaction.set(newDocRef, {
          [day]: {
            [table[0]]: {
              email: email,
              name: name,
              people: people,
              phone: phone,
              time: time,
            },
          },
        });
        transaction.set(newPublicDocRef, {
          [day]: {
            [table[0]]: time,
          },
        });
        //check fi there is multiple tables
        if (table.length > 1) {
          console.log("bigger");
          //starts from 1 since first document is already written
          for (let i = 1; i < table.length; i++) {
            const dayTable = day + "." + table[i];
            transaction.update(newDocRef, {
              [dayTable]: {
                email: email,
                name: name,
                people: people,
                phone: phone,
                time: time,
              },
            });
          }
        }
        // Add a new month document with first table reservations

        return "success";
      }
      //month document exists
      else {
        const dayData = monthDoc.data()[day];
        //day document does not exist
        if (!dayData) {
          const monthDocument = doc(
            firestore,
            "reservations",
            getDateYYYYMM(date)
          );

          transaction.update(monthDocument, {
            [day]: {
              [table[0]]: {
                email: email,
                name: name,
                people: people,
                phone: phone,
                time: time,
              },
            },
          });
          transaction.update(monthDocumentPublic, {
            [day]: {
              [table[0]]: time,
            },
          });
          //check fi there is multiple tables
          if (table.length > 1) {
            console.log("bigger");
            //starts from 1 since first document is already written
            for (let i = 1; i < table.length; i++) {
              const dayTable = day + "." + table[i];
              transaction.update(monthDocument, {
                [dayTable]: {
                  email: email,
                  name: name,
                  people: people,
                  phone: phone,
                  time: time,
                },
              });
              transaction.update(monthDocumentPublic, {
                [dayTable]: time,
              });
            }
          }

          return "success";
        }
        //day document exists
        else {
          //table does not exist (it is not reserved)
          if (!checkTableExists(table, dayData)) {
            const monthDocument = doc(
              firestore,
              "reservations",
              getDateYYYYMM(date)
            );
            table.forEach((singleTable) => {
              const dayTable = day + "." + singleTable;
              transaction.update(monthDocument, {
                [dayTable]: {
                  email: email,
                  name: name,
                  people: people,
                  phone: phone,
                  time: time,
                },
              });
              transaction.update(monthDocumentPublic, {
                [dayTable]: time,
              });
            });
            return "success";
          }
          //table exist (it is reserved)
          else {
            Promise.reject("Sorry! Somebody reserved the table before you");
            return "error";
          }
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
};

const checkTableExists = (tables, firestoreData) => {
  let exists = false;
  tables.every((table) => {
    if (firestoreData[table]) {
      exists = true;
      return false;
    }
    return true;
  });
  return exists;
};
