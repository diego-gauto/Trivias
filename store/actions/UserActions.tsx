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
export const getHomeworks = async (userId: string, role: string) => {
  let tempRole = '';
  if (role == 'admin') {
    tempRole = 'teacherId'
  }
  if (role == 'user') {
    tempRole = 'userId'
  }
  const homeWorksRef = query(collection(db, "homeworks"), orderBy("createdAt", "asc"), where(`${tempRole}`, "==", userId))
  let tempHomeWorks: any = [];
  const data = await getDocs(homeWorksRef);
  data.forEach((homeWork) => {
    tempHomeWorks.push({ ...homeWork.data(), id: homeWork.id });
  })
  return tempHomeWorks
}
export const getAllHomeWorks = async () => {
  const homeWorksRef = query(collection(db, "homeworks"), orderBy("createdAt", "asc"))
  let tempHomeWorks: any = [];
  const data = await getDocs(homeWorksRef);
  data.forEach((homeWork) => {
    tempHomeWorks.push({ ...homeWork.data(), id: homeWork.id });
  })
  return tempHomeWorks
}
export const addReview = async (review: any) => {
  const docRef = await addDoc(
    collection(db, "reviewHomeWork"),
    {
      ...review
    }
  );
  return 'exito'
}
export const getUserScore = async (userId: any) => {
  const usersRef = query(collection(db, "users"), where("id", "==", userId))
  let tempUsers: any = [];
  const data = await getDocs(usersRef);
  data.forEach((user) => {
    tempUsers.push({ ...user.data(), id: user.id });
  })
  return tempUsers
}

export const updateUserPlan = async (days: number, userId: string) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    'membership.finalDate': days,
  })
  return 'exito'
}