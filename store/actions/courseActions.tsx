import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot, updateDoc, getDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { db } from '../../firebase/firebaseConfig';
import { v4 as uuidv4 } from "uuid";

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
export const getLessons = async (courseId: any, seasonId: any, lessonId: any) => {
  let data: any = []
  const docRef = collection(db, 'courses', courseId, "seasons", seasonId, "lessons");
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}

export const getLesson = async (courseId: any, seasonId: any, lessonId: any) => {
  const docRef = doc(db, "courses", courseId, "seasons", seasonId, "lessons", lessonId);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  return docSnap.data();
}
const uploadImage = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `courses/lesson/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url')
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        });
      })
  });
}
export const updateLesson = async (lesson: any, courseId: any, seasonId: any, lessonId: any) => {
  console.log(lesson)
  let tempLesson: any = JSON.parse(JSON.stringify(lesson))
  if ('format' in tempLesson) {
    tempLesson.image = await uploadImage(tempLesson.format, tempLesson.imageReference);
    delete tempLesson.format
  }
  if (tempLesson.extra.length > 0) {
    tempLesson.extra.forEach(async (element: any, index: any) => {
      if ("format" in element) {
        element.reference = `${uuidv4()}`
        element.path = await uploadImage(element.path, element.reference);
        delete element.format
      }

      if (index == tempLesson.extra.length - 1) {
        const docRef = doc(db, 'courses', courseId, 'seasons', seasonId, 'lessons', lessonId);
        delete tempLesson.id;

        await updateDoc(docRef, {
          ...tempLesson
        })
      }
    });
  } else {
    const docRef = doc(db, 'courses', courseId, 'seasons', seasonId, 'lessons', lessonId);
    delete tempLesson.id;

    await updateDoc(docRef, {
      ...tempLesson
    })
  }


  return 'exito'
}

export const deleteLessonMaterial = async (material: any) => {
  const storage = getStorage();
  const desertRef = ref(storage, `courses/lesson/${material.reference}`);
  await deleteObject(desertRef).then(async () => {
    return 'success'
  }).catch((error) => {
    console.log(error)
  });
}