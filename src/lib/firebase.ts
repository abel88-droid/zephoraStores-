// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "zephora-luxe",
  "appId": "1:492661900997:web:b63c0be31cb5131caa92ac",
  "storageBucket": "zephora-luxe.firebasestorage.app",
  "apiKey": "AIzaSyDasLgsw8WBXTgJmo2m0W-Kcwmp_0Ioq7k",
  "authDomain": "zephora-luxe.firebaseapp.com",
  "messagingSenderId": "492661900997"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
