import { db } from "../firebase"; // Adjust the import based on your project structure

import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const collectionName = "contacts"; // Adjust the collection name for contact submissions
const contactCollectionRef = collection(db, collectionName);

class ContactusService {
  // Add a new contact message
  addContact = (newContact) => {
    return addDoc(contactCollectionRef, newContact);
  };

  // Retrieve all contact messages (if needed)
  getAllContacts = () => {
    return getDocs(contactCollectionRef);
  };

  // Retrieve a specific contact message by ID (if needed)
  getContact = (id) => {
    const contactDoc = doc(db, collectionName, id);
    return getDoc(contactDoc);
  };
}

export default new ContactusService();
