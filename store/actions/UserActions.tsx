import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc, deleteDoc, orderBy,
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
export const getHomeworks = async (userId: any) => {
  const homeWorksRef = query(collection(db, "homeworks"), orderBy("createdAt", "asc"), where("professorId", "==", userId))
  let tempHomeWorks: any = [];
  const data = await getDocs(homeWorksRef);
  data.forEach((homeWork) => {
    tempHomeWorks.push({ ...homeWork.data(), id: homeWork.id });
  })
  return tempHomeWorks
}
export const addReview = async (review: any) => {
  console.log(review)

  const docRef = await addDoc(
    collection(db, "reviewHomeWork"),
    {
      ...review
    }
  );
  return 'exito'
}