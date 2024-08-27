import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
const collectionName ="users";

const collectionRef = collection(db, collectionName);

class FBDataService{
    addData = (newData) =>{
        return addDoc( collectionRef, newData);
    }

    setData =(newData)=>{
        return setDoc(doc(db, collectionName,newData.id), newData);
    }
    updateData = (id, newData) =>{
        const oldData = doc(db, collectionName, id);
        return updateDoc(oldData, newData);        
    }
    deleteData =(id)=>{
        const data = doc(db, collectionName, id);
        return deleteDoc(data);
    }
    getData =(id) =>{
        const data = doc(db, collectionName, id);
        return getDoc(data);
    }
    getAllData =()=>{
        return getDocs(collectionRef)
    }
}
export default new FBDataService();
