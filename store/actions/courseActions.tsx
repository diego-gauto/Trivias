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

export const getWholeCourses = async () => {
  let courses: any = []
  const docRef = collection(db, 'courses');
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc: any) => {
    courses.push({ ...doc.data(), id: doc.id, seasons: [], totalLessons: 0 });
  })
  for (let i = 0; i < courses.length; i++) {
    const docRefSeasons = collection(db, 'courses', courses[i].id, "seasons");
    const querySnapshotSeasons = await getDocs(docRefSeasons);
    querySnapshotSeasons.forEach((season: any) => {
      courses[i].seasons.push({ seasons: season.data().season, lessons: [], id: season.id })
    });
    for (let c = 0; c < courses[i].seasons.length; c++) {
      const docRefLesson = collection(db, 'courses', courses[i]?.id, "seasons", courses[i].seasons[c].id, "lessons");
      const querySnapshotLesson = await getDocs(docRefLesson);
      querySnapshotLesson.forEach((lesson: any) => {
        courses[i].totalLessons++;
        courses[i].seasons[c].lessons.push(lesson.data());
      });
    }
  }
  return courses;
}
export const getWholeCourse = async (courseId: any) => {
  const docRef = doc(db, "courses", courseId);
  const docSnap: any = await getDoc(docRef);
  docSnap.data().season = [];
  const docRefSeasons = collection(db, 'courses', docSnap.id, "seasons");
  const querySnapshotSeasons = await getDocs(docRefSeasons);
  querySnapshotSeasons.forEach((season: any) => {
    docSnap.data().seasons.push({ seasons: season.data().season, lessons: [], id: season.id })
  });
  for (let c = 0; c < docSnap.data().seasons.length; c++) {
    const docRefLesson = collection(db, 'courses', docSnap.id, "seasons", docSnap.data().seasons[c].id, "lessons");
    const querySnapshotLesson = await getDocs(docRefLesson);
    querySnapshotLesson.forEach((lesson: any) => {
      docSnap.data().seasons[c].lessons.push(lesson.data());
    });
  }
  return { ...docSnap.data(), id: docSnap.id };
}