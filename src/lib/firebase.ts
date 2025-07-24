// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration is read from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase for client-side usage
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// This check ensures that Firebase is only initialized on the client side.
if (typeof window !== "undefined" && !getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (e) {
    console.error("Failed to initialize Firebase", e);
    // Provide dummy objects to prevent the app from crashing on import
    // if initialization fails.
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
  }
} else if (getApps().length) {
  // If the app is already initialized, get the existing instances.
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} else {
    // On the server, we provide dummy objects to prevent crashing.
    app = {} as FirebaseApp;
    auth = {} as Auth;
    db = {} as Firestore;
}

export { app, db, auth };