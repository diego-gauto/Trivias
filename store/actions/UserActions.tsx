import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc, deleteDoc,
} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

export const getPaidCourses = async (userId: any) => {
  let data: any = []
  const docRef = collection(db, 'users', userId, "courses");
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}