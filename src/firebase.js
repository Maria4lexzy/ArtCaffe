import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

export const updateTicketDocument = async (email, ticketID) => {
  return firestore
    .collection("tickets")
    .doc(ticketID)
    .update({ used: true, user: "" + email });
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

export const getUserTicket = async (ticketID) => {
  var docRef = firestore.collection("tickets").doc(ticketID);
  return docRef.get();
};
