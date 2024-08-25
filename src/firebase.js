import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-63Q4LcX0Cvan3RowraBlX8Gd_XgH8fQ",
  authDomain: "authfirebase-9d59f.firebaseapp.com",
  projectId: "authfirebase-9d59f",
  storageBucket: "authfirebase-9d59f.appspot.com",
  messagingSenderId: "901481647082",
  appId: "1:901481647082:web:2bae1d7fdf530b08930093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
