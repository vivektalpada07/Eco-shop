import { db } from "../firebase";
import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

const collectionName = "users";

class FBDataService {
  // Adding new data
  addData = (newData) => {
    return addDoc(collection(db, collectionName), newData);
  };

  // Setting data with a specific document ID (e.g., UID)
  setData = (newData) => {
    return setDoc(doc(db, collectionName, newData.id), newData);
  };

  // Updating existing data by document ID
  updateData = (id, newData) => {
    const docRef = doc(db, collectionName, id);
    return updateDoc(docRef, newData);
  };

  // Deleting data by document ID
  deleteData = (id) => {
    const docRef = doc(db, collectionName, id);
    return deleteDoc(docRef);
  };

  // Fetching single user data by document ID
  getData = (id) => {
    const docRef = doc(db, collectionName, id);
    return getDoc(docRef);
  };
}

export default new FBDataService();
