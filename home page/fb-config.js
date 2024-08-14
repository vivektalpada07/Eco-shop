import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8rjGG3MIYtDjSnZRDaIKnCD6l46ybW-Y",
  authDomain: "eco-shop-60df7.firebaseapp.com",
  projectId: "eco-shop-60df7",
  storageBucket: "eco-shop-60df7.appspot.com",
  messagingSenderId: "292693377073",
  appId: "1:292693377073:web:3a88b142c8a2889242d510"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
