import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { db } from "../../firebase/firebaseConfig";

//CONSEGUIR EL NIVEL ACTUAL POR PUNTOS

export const getLevel = async () => {
  const levelRef = query(collection(db, "levelPoints"), orderBy("minimum", "desc"))
  let tempData: any = []
  const data = await getDocs(levelRef)
  data.forEach((doc) => {
    tempData.push({ ...doc.data(), id: doc.id })
  })
  // tempData.forEach((element: any, index: any) => {
  //   element.level = index + 1;
  // })
  // tempData = tempData.filter((data: any) => (data.maximum >= userData.score && data.minimum <= userData.score) || data.level == size)
  return tempData
}
// RECIBIR TODOS LOS NIVELES POR PUNTOS
export const getLevels = async () => {
  const levelsRef = query(collection(db, "levelPoints"), orderBy("minimum"))
  let temp_levels: any = [];
  const data = await getDocs(levelsRef);
  data.forEach((level) => {
    temp_levels.push({ ...level.data(), id: level.id });
  })
  return temp_levels
}
// CONSEGUIR EL NIVEL ACTUAL POR TIEMPO
export const getTimeLevel = async () => {
  const levelsRef = query(collection(db, "levelTimes"), orderBy("minimum", "asc"))
  let temp_levels: any = [];
  const data = await getDocs(levelsRef);
  data.forEach((level) => {
    temp_levels.push({ ...level.data(), id: level.id });
  })
  return temp_levels
}
// CONSEGUIR LOS NIVELES POR TIEMPO
export const getTimeLevels = async () => {
  const levelsRef = query(collection(db, "levelTimes"), orderBy("minimum"))
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
export const deleteTimeLevel = async (level: any) => {
  await deleteDoc(doc(db, "levelTimes", level.id));
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
export const addLevelTime = async (level: any) => {
  const docRef = await addDoc(
    collection(db, "levelTimes"),
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
export const updateLevelTime = async (level: any, id: any) => {

  const docRef = doc(db, 'levelTimes', id);
  await updateDoc(docRef, {
    maximum: level.maximum,
    minimum: level.minimum
  })
  return 'exito'
}

const uploadPointRewardsImage = (image: any, name: any) => {
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

export const addReward = async (reward: any) => {
  reward.reference = `${reward.title}-${uuidv4()}`
  reward.path = await uploadPointRewardsImage(reward.path, reward.reference);

  const docRef = await addDoc(
    collection(db, "allRewards"),
    {
      ...reward
    }
  );

  return docRef.id
}

export const getRewards = async () => {
  let data: any = []
  const docRef = query(collection(db, "allRewards"));
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
    tempReward.path = await uploadPointRewardsImage(tempReward.format, tempReward.reference);
    delete tempReward.format;
  }
  const docRef = doc(db, 'allRewards', id);
  delete tempReward.id;

  await updateDoc(docRef, {
    ...tempReward
  })

  return 'exito'
}

export const deletePointPrize = async (reward: any) => {
  const storage = getStorage();
  const desertRef = ref(storage, `rewards/points/${reward.reference}`);
  await deleteObject(desertRef).then(async () => {
    await deleteDoc(doc(db, "rewards", reward.id));
    return 'success'
  }).catch((error) => {
    console.log(error)
  });

}
const uploadTimeRewardsImage = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `rewards/time/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    });
  });
}

export const addTimeReward = async (reward: any) => {
  reward.reference = `${reward.title}-${uuidv4()}`
  reward.path = await uploadTimeRewardsImage(reward.path, reward.reference);

  const docRef = await addDoc(
    collection(db, "rewardsTime"),
    {
      ...reward
    }
  );
  return 'exito'
}

export const getTimeRewards = async () => {
  let data: any = []
  const docRef = query(collection(db, "rewardsTime"), orderBy("month", "asc"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}

export const updateTimeRewards = async (reward: any, id: any) => {
  let tempReward: any = JSON.parse(JSON.stringify(reward))
  const storage = getStorage();
  const desertRef = ref(storage, `rewards/time/${tempReward.reference}`);
  if ("format" in tempReward) {
    await deleteObject(desertRef).then(async () => {
      tempReward.reference = `${tempReward.title}-${uuidv4()}`
    }).catch((error) => {
      console.log(error)
    });
    tempReward.path = await uploadTimeRewardsImage(tempReward.format, tempReward.reference);
    delete tempReward.format;
  }
  const docRef = doc(db, 'rewardsTime', id);
  delete tempReward.id;

  await updateDoc(docRef, {
    ...tempReward
  })
  return 'exito'
}
export const deleteTimePrize = async (reward: any) => {
  const storage = getStorage();
  const desertRef = ref(storage, `rewards/time/${reward.reference}`);
  await deleteObject(desertRef).then(async () => {
    await deleteDoc(doc(db, "rewardsTime", reward.id));
    return 'success'
  }).catch((error) => {
    console.log(error)
  });

}
export const addRequest = async (request: any) => {
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
export const updateRequest = async (id: any) => {

  const docRef = doc(db, 'requests', id);
  await updateDoc(docRef, {
    status: true
  })
  return 'exito'
}
export const addUserReward = async (userRewards: any, userId: any) => {
  const docRef = await setDoc(
    doc(db, "users", userId, "rewards", userRewards.id),
    {
      ...userRewards
    }
  );
}
export const getUserRewards = async (userId: any) => {
  let data: any = []
  const docRef = collection(db, 'users', userId, "rewards");
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}

export const getBanner = async () => {
  let data: any = []
  const docRef = doc(db, "rewardBanner", "banner");
  const docSnap = await getDoc(docRef);

  return data = docSnap.data()
}

const uploadBanner = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `rewards/banner/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    });
  });
}
export const updateBanner = async (banner: any) => {
  let tempBanner: any = JSON.parse(JSON.stringify(banner))
  tempBanner.path = await uploadBanner(tempBanner.format, tempBanner.reference);
  delete tempBanner.format;
  const docRef = doc(db, 'rewardBanner', 'banner');
  delete tempBanner.id;
  await updateDoc(docRef, {
    ...tempBanner
  })

  return 'exito'
}