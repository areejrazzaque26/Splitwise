import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu5FWrW6nvFeRqIQwjD4639GX2l1HUV1Y",
  authDomain: "fir-auth-1a6dd.firebaseapp.com",
  projectId: "fir-auth-1a6dd",
  storageBucket: "fir-auth-1a6dd.appspot.com",
  messagingSenderId: "615280859745",
  appId: "1:615280859745:web:c8a653bd8082868693a820",
  measurementId: "G-W4XVN5Y7SX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
