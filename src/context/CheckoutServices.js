import { db } from "../firebase"; 

import {
  collection,
  getDocs,
  doc,
  setDoc, // Use setDoc to specify the document ID
  getDoc,
} from "firebase/firestore";

const collectionName = "checkout"; 
const checkoutCollectionRef = collection(db, collectionName);

class CheckoutService {
  // Use the paymentId as the document ID
  addCheckout = (newCheckout, paymentId) => {
    const checkoutDoc = doc(db, collectionName, paymentId);
    return setDoc(checkoutDoc, newCheckout); // Use setDoc to set the document with the specific ID
  };

  getAllCheckouts = () => {
    return getDocs(checkoutCollectionRef);
  };

  getCheckout = (id) => {
    const checkoutDoc = doc(db, collectionName, id);
    return getDoc(checkoutDoc);
  };
}

export default new CheckoutService();
