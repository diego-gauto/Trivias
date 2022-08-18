import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { db } from "../../firebase/firebaseConfig";

export const getLevel = async () => {
  const levelRef = query(collection(db, "levelPoints"), orderBy("level"))
  let tempData: any = []
  const data = await getDocs(levelRef)
  data.forEach((doc) => {
    tempData.push({ ...doc.data(), id: doc.id })
  })
  tempData.forEach((element: any, index: any) => {
    element.level = index + 1;
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
  const docRef = query(collection(db, "rewards"), orderBy("points", "asc"));
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
export const addRequest = async (request: any) => {
  console.log(request)
  const docRef = await addDoc(
    collection(db, "requests"),
    {
      ...request
    }
  );
  return 'exito'
}
export const getRequest = async () => {
  const requestRef = query(collection(db, "requests"), orderBy("createAt"))
  let tempData: any = []
  const data = await getDocs(requestRef)
  data.forEach((doc) => {
    tempData.push({ ...doc.data(), id: doc.id })
  })
  return tempData
}
export const addUserReward = async (userRewards: any, userId: any) => {
  const docRef = await addDoc(
    collection(db, "users", userId, "userRewards"),
    {
      ...userRewards
    }
  );
  return 'exito'
}
export const addUserReward2 = async (userRewards: any, userId: any) => {
  console.log(userRewards, userId)
  const docRef = await setDoc(
    doc(db, "users", userId, "rewards", userRewards.id),
    {
      ...userRewards
    }
  );
}
export const getUserRewards = async (userId: any) => {
  let data: any = []
  const docRef = collection(db, 'users', userId, "userRewards");
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  });
  return data
}