import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc,
} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

export const getCourses = async () => {
  let courses: any = []
  const docRef = collection(db, 'courses');
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    courses.push({ ...doc.data(), id: doc.id });
  });
  return courses;
}