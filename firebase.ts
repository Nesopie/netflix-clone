// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXonu2zpC3YfxW0cBH0bVZ2tlw8YKcILw",
  authDomain: "netflix-clone-f1684.firebaseapp.com",
  projectId: "netflix-clone-f1684",
  storageBucket: "netflix-clone-f1684.appspot.com",
  messagingSenderId: "164381566123",
  appId: "1:164381566123:web:2bec6ea68b5e29427143ee",
  measurementId: "G-PM01CD45VX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };