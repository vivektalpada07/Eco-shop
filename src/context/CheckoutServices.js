import { db } from "../firebase"; 

import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const collectionName = "checkout"; 
const checkoutCollectionRef = collection(db, collectionName);

class CheckoutService {
  addCheckout = (newCheckout) => {
    return addDoc(checkoutCollectionRef, newCheckout);
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
