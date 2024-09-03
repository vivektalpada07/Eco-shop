import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const collectionName = "checkout";
const checkoutCollectionRef = collection(db, collectionName);

class CheckoutService {
  // Use addDoc to add a new document with an auto-generated ID
  addCheckout = async (newCheckout) => {
    try {
      // First, add the document without the paymentId
      const docRef = await addDoc(checkoutCollectionRef, newCheckout);

      // Then, update the document to set the paymentId to the document ID
      await updateDoc(docRef, {
        paymentId: docRef.id,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding checkout: ", error);
    }
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
