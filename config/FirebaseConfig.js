// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mypet-d7ebd.firebaseapp.com",
  projectId: "mypet-d7ebd",
  storageBucket: "mypet-d7ebd.appspot.com",
  messagingSenderId: "32608058747",
  appId: "1:32608058747:web:bc81b06685eed25c2cd1de",
  measurementId: "G-HNZPWEEDB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);