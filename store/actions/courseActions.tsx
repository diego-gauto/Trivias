import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { db } from "../../firebase/firebaseConfig";

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
  return docSnap.data();
}

export const getLesson = async (courseId: any, seasonId: any, lessonId: any) => {
  const docRef = doc(db, "courses", courseId, "seasons", seasonId, "lessons", lessonId);
  const docSnap = await getDoc(docRef);
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
  const docRef = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc: any) => {
    courses.push({ ...doc.data(), id: doc.id, seasons: [], totalLessons: 0 });
  })
  for (let i = 0; i < courses.length; i++) {
    const docRefSeasons = query(collection(db, 'courses', courses[i].id, "seasons"), orderBy('season'));
    const querySnapshotSeasons = await getDocs(docRefSeasons);
    querySnapshotSeasons.forEach((season: any) => {
      courses[i].seasons.push({ seasons: season.data().season, lessons: [], id: season.id })
    });
    for (let c = 0; c < courses[i].seasons.length; c++) {
      const docRefLesson = query(collection(db, 'courses', courses[i]?.id, "seasons", courses[i].seasons[c].id, "lessons"), orderBy('number'));
      const querySnapshotLesson = await getDocs(docRefLesson);
      querySnapshotLesson.forEach((lesson: any) => {
        courses[i].totalLessons++;
        courses[i].seasons[c].lessons.push({ ...lesson.data(), id: lesson.id });
      });
    }
  }
  return courses;
}
export const getWholeCourse = async (courseId: any) => {
  let seasons: any = [];
  let lessons: any = [];
  let totalLessons = 0;
  const docRef = doc(db, "courses", courseId);
  const docSnap: any = await getDoc(docRef);
  const docRefSeasons = query(collection(db, 'courses', courseId, "seasons"), orderBy('season'));
  const querySnapshotSeasons = await getDocs(docRefSeasons);
  querySnapshotSeasons.forEach((season: any) => {
    seasons.push({ seasons: season.data().season, lessons: [], id: season.id })
  });
  for (let c = 0; c < seasons.length; c++) {
    const docRefLesson = query(collection(db, 'courses', courseId, "seasons", seasons[c].id, "lessons"), orderBy('number'));
    const querySnapshotLesson = await getDocs(docRefLesson);
    querySnapshotLesson.forEach((lesson: any) => {
      totalLessons++;
      lessons.push({ ...lesson.data(), id: lesson.id });
      seasons[c].lessons.push({ ...lesson.data(), id: lesson.id });
    });
  }
  return { ...docSnap.data(), id: courseId, seasons: seasons, totalLessons: totalLessons, lessons: lessons }
}
export const addComment = async (data: any) => {
  const docRef = await addDoc(
    collection(db, "comments"),
    {
      ...data
    }
  );
  return 'exito'
}


export const getComments = async () => {
  let comment: any = []
  const docRef = query(collection(db, 'comments'), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    comment.push({ ...doc.data(), id: doc.id });
  });
  return comment;
}

export const addUserToLesson = async (lesson: any, courseId: any, seasonId: any, lessonId: any, user: any) => {
  let temp_lesson: any;
  delete lesson.id
  delete lesson.seasonId
  delete lesson.courseId

  const docRef = doc(db, "courses", courseId, "seasons", seasonId, "lessons", lessonId);
  const docSnap = await getDoc(docRef);
  temp_lesson = docSnap.data();

  temp_lesson.users.push(user.id);
  const docRefNew = doc(db, 'courses', courseId, 'seasons', seasonId, 'lessons', lessonId);
  await updateDoc(docRefNew, {
    ...temp_lesson
  });
  const docRefUser = doc(db, 'users', user.id);
  await updateDoc(docRefUser, {
    ...user
  })
  return 'success'
}

const uploadImageHwk = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `homeworks/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url')
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        });
      })
  });
}

export const addHomework = async (data: any) => {
  data.path = await uploadImageHwk(data.path, `${data.title}-${uuidv4()}`);
  const docRef = await addDoc(
    collection(db, "homeworks"),
    {
      ...data
    }
  );
  return 'exito'
}
export const addHistoryCourse = async (course: any, userId: any, season: any, lesson: any) => {
  course.userId = userId;
  course.viewed = new Date();
  course.season = parseInt(season);
  course.lesson = parseInt(lesson);
  const docRef = await setDoc(
    doc(db, "viewedCourses", `${course.documentID}-${userId}`),
    {
      ...course
    }
  );
}
export const getViewedCourses = async (userdId: any) => {
  let courses: any = []
  const docRef = query(collection(db, 'viewedCourses'), orderBy("viewed", "desc"), where("userId", "==", userdId));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    courses.push({ ...doc.data(), id: doc.id });
  });
  return courses;
}
// export const getUsers = async () => {
//   const docRef = doc(db, "users", role);
//   const docSnap = await getDoc(docRef);
//   return docSnap.data();
// }
export const getUsers = async () => {
  const usersRef = query(collection(db, "users"), orderBy("name"))
  let tempUsers: any = [];
  const data = await getDocs(usersRef);
  data.forEach((user) => {
    tempUsers.push({ ...user.data(), id: user.id });
  })
  return tempUsers
}
export const deleteWholeCourse = async (course: DocumentData) => {
  if (course.seasons.length == 0) {
    await deleteDoc(doc(db, "courses", course.id));
  }
  for (let s = 0; s < course.seasons.length; s++) {
    for (let l = 0; l < course.seasons[s].lessons.length; l++) {
      await deleteDoc(doc(db, "courses", course.id, "seasons", course.seasons[s].id, "lessons", course.seasons[s].lessons[l].id));
      if (l == course.seasons[s].lessons.length - 1) {
        await deleteDoc(doc(db, "courses", course.id, "seasons", course.seasons[s].id));
      }
    }
    if (s == course.seasons.length - 1) {
      await deleteDoc(doc(db, "courses", course.id));
    }
  }
}

export const updateLessonProgress = async (progress: any, courseId: any, seasonId: any, lessonId: any) => {
  const docRef = doc(db, 'courses', courseId, 'seasons', seasonId, 'lessons', lessonId);
  await updateDoc(docRef, {
    progress: progress
  })
  return 'exito'
}