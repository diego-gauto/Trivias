import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc, orderBy, Timestamp,
} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

export const addPaymentMethod = async (paymentMethod: any, userId: any) => {
  delete paymentMethod.status
  const docRef = await addDoc(
    collection(db, "users", userId, "paymentMethods"),
    {
      ...paymentMethod
    }
  );
  return 'exito'
}
export const updateUserPlan = async (plan: any, userId: any) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    membership: {
      finalDate: plan.finalDate,
      level: 1,
      method: plan.method,
      paymentMethod: plan.paymentMethod,
      planId: plan.id,
      planName: plan.name
    }
  })
  return 'exito'
}

export const getPaymentmethods = async (userId: any) => {
  let data: any = []
  const docRef = collection(db, 'users', userId, "paymentMethods");
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}

export const addCourseUser = async (course: any, userId: any) => {
  const docRef = await setDoc(
    doc(db, "users", userId, "courses", course.id),
    {
      finalDate: course.duration
    }
  );
}


export const addInvoice = async (invoice: any) => {
  const docRef = await addDoc(
    collection(db, "invoice"),
    {
      ...invoice
    }
  );
}

export const getInvoice = async () => {
  let data: any = []
  const docRef = query(collection(db, "invoice"), orderBy("paidAt"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  });
  return data
}