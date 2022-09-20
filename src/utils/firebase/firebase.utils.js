import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  GithubAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjH0uhC5GApdu2bwBzqq43YTEobkjklAw",
  authDomain: "crwn-clothing-cf235.firebaseapp.com",
  projectId: "crwn-clothing-cf235",
  storageBucket: "crwn-clothing-cf235.appspot.com",
  messagingSenderId: "806615004400",
  appId: "1:806615004400:web:54bd444bd7a8bfa4717e35",
  measurementId: "G-K73LEQ0PS2",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provider);
};

const gitProvider = new GithubAuthProvider();
gitProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGitHub = () => {
  return signInWithPopup(auth, gitProvider);
};

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithFacebook = () => {
  return signInWithPopup(auth, facebookProvider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log("userSnapshot:", userSnapshot);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

// export const db = getFirestore();

// export const createUserDocumentFromAuth = async (userAuth) => {
//   const userDocRef = doc(db, 'users', userAuth.uid);

//   const userSnapshot = await getDoc(userDocRef);

//   if (!userSnapshot.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createdAt,
//       });
//     } catch (error) {
//       console.log('error creating the user', error.message);
//     }
//   }

//   return userDocRef;
// };

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
