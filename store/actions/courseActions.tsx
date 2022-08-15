import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc, getDoc,
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

export const getcourse = async (id: any) => {
  const docRef = doc(db, "courses", id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  return docSnap.data();
}