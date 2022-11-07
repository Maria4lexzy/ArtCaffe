import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
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
  const monthName = getMonthName(date);
  const docRef = doc(firestore, "openning_hours", monthName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return "Error";
  } else {
    getOpeningHours()
      .then((oh) => {
        let data = {};
        const openning_hours = oh.schedule;
        const lastMonthDay = getLastDayOfMonth(date);
        let tempDate = new Date(date);
        let actualDay = getFirstDayIndex(date);
        for (let a = 1; a <= lastMonthDay; a++) {
          data[getDateYYYYMMDD(tempDate)] = {
            end: openning_hours[actualDay * 2].toString(),
            start: openning_hours[actualDay * 2 + 1].toString(),
          };
          if (actualDay == 6) actualDay = 0;
          else actualDay++;
          tempDate.setDate(tempDate.getDate() + 1);
        }
        setDoc(doc(firestore, "openning_hours", monthName), data)
          .then(() => {
            return "Success";
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
export const getMonthOpeningHours = async (date) => {
  const docRef = doc(firestore, "openning_hours", getMonthName(date));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
export const getReservations = async (date) => {
  const docRef = doc(firestore, "reservations", getDateYYYYMM(date));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("exist")
    return docSnap.data();
  } else {
    return null;
  }

};

