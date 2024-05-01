import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  addDoc,
  deleteDoc,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const createCoupon = async (coupon: any) => {
  const docRef = await addDoc(collection(db, 'coupons'), {
    ...coupon,
  });
  return 'exito';
};

export const getCoupons = async () => {
  let data: any = [];
  const docRef = collection(db, 'coupons');
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

export const updateCoupon = async (coupon: any, id: any) => {
  const docRef = doc(db, 'coupons', id);
  await updateDoc(docRef, {
    ...coupon,
  });
  return 'exito';
};

export const deleteCoupon = async (coupon: any) => {
  await deleteDoc(doc(db, 'coupons', coupon.id));
};
