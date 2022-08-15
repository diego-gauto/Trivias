import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc, deleteDoc, orderBy,
} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, getDownloadURL, uploadString, deleteObject } from "firebase/storage";


export const getLevel = async () => {
  const levelRef = query(collection(db, "levelPoints"), orderBy("level"))
  let tempData: any = []
  const data = await getDocs(levelRef)
  data.forEach((doc) => {
    tempData.push({ ...doc.data(), id: doc.id })
  })
  // tempData = tempData.filter((data: any) => (data.maximum >= userData.score && data.minimum <= userData.score) || data.level == size)
  return tempData
}
export const getLevels = async () => {
  const levelsRef = query(collection(db, "levelPoints"), orderBy("minimum"))
  let temp_levels: any = [];
  const data = await getDocs(levelsRef);
  data.forEach((level) => {
    temp_levels.push({ ...level.data(), id: level.id });
  })
  return temp_levels
}

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

export const addReward = async (reward: any) => {
  console.log(reward)
  reward.reference = `${reward.title}-${uuidv4()}`
  reward.path = await uploadImage(reward.path, reward.reference);

  console.log(reward)
  const docRef = await addDoc(
    collection(db, "rewards"),
    {
      ...reward
    }
  );
  return 'exito'
}

const uploadImage = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `rewards/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    });
  });
}
export const getRewards = async () => {
  let data: any = []
  const docRef = query(collection(db, "rewards"), orderBy("points"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}

export const updateRewards = async (reward: any, id: any) => {
  let tempReward: any = JSON.parse(JSON.stringify(reward))
  const storage = getStorage();
  const desertRef = ref(storage, `rewards/${tempReward.reference}`);
  if ("format" in tempReward) {
    await deleteObject(desertRef).then(async () => {
      tempReward.reference = `${tempReward.title}-${uuidv4()}`
    }).catch((error) => {
      console.log(error)
    });
    tempReward.path = await uploadImage(tempReward.format, tempReward.reference);
    delete tempReward.format;
  }
  console.log(tempReward)
  console.log(id)
  const docRef = doc(db, 'rewards', id);
  delete tempReward.id;

  await updateDoc(docRef, {
    ...tempReward
  })

  return 'exito'
}
