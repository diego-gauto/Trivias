import {
  collection, doc, getDocs, query, setDoc, addDoc, deleteDoc, orderBy, updateDoc, where,
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
export const getTimeRewards = async () => {
  let data: any = []
  const docRef = query(collection(db, "rewardsTime"), orderBy("month"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}
// export const updateUser = async (user: any, id: any) => {
//   const docRef = doc(db, 'users', id);
//   await updateDoc(docRef, {
//     name: user.name,
//     phone: user.phoneNumber,
//     country: user.country,
//   })
//   return 'exito'
// }

export const deletePaymentMethod = async (userId: any, card: any) => {
  await deleteDoc(doc(db, "users", userId, 'paymentMethods', card));
}

export const updatePaymentMethod = async (pm: any, userId: any) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    'membership.paymentMethod': pm,
  })
  return 'exito'
}

export const getUserInvoices = async (email: string) => {
  let data: any = []
  const docRef = query(collection(db, "invoice"), where("userEmail", "==", email), orderBy("paidAt", "desc"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}