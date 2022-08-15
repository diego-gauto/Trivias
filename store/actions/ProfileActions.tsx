import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc, deleteDoc, orderBy,
} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, getDownloadURL, uploadString, deleteObject } from "firebase/storage";

export const getRewards = async () => {
  let data: any = []
  const docRef = query(collection(db, "rewards"), orderBy("points"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}