import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc, deleteDoc,
} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

export const deleteLevel = async (level: any) => {
  await deleteDoc(doc(db, "levelPoints", level.id));
}
export const addLevel = async (level: any) => {
  const docRef = await addDoc(
    collection(db, "levelPoints"),
    {
      ...level
    }
  );
  return 'exito'
}
export const updateLevel = async (level: any, id: any) => {

  const docRef = doc(db, 'levelPoints', id);
  await updateDoc(docRef, {
    maximum: level.maximum,
    minimum: level.minimum
  })
  return 'exito'
}