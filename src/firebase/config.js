import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDS9vYChMpL0PkqaeTP7Y8MamMfu-4vIQ",
  authDomain: "contact-mana.firebaseapp.com",
  projectId: "contact-mana",
  storageBucket: "contact-mana.appspot.com",
  messagingSenderId: "392955690089",
  appId: "1:392955690089:web:44ef137609d9ca4d1b76f8",
  measurementId: "G-ZL7007BQC9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);