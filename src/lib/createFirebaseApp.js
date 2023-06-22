// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
import { getAuth, connectAuthEmulator, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librariess

const firebaseKeys = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: firebaseKeys.apiKey,
  authDomain: firebaseKeys.authDomain,
  projectId: firebaseKeys.projectId,
  storageBucket: firebaseKeys.storageBucket,
  messagingSenderId: firebaseKeys.messagingSenderId,
  appId: firebaseKeys.appId,
  measurementId: firebaseKeys.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
// export const db = getFirestore();
// export const storage = getStorage();
