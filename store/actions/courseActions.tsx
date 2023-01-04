import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
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
export const getSeason = async (courseId: any) => {
  let courses: any = []
  const docRef = query(collection(db, 'courses', courseId, 'seasons'), orderBy('name'));
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
  let tempCourses: any = []
  const docRef = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc: any) => {
    courses.push({ ...doc.data(), id: doc.id, seasons: [], totalLessons: 0, totalDuration: 0 });
  })

  // courses.forEach(async (element: any, index: number) => {
  //   const docRefSeasons = query(collection(db, 'courses', element.id, "seasons"), orderBy('season'));
  //   const querySnapshotSeasons = await getDocs(docRefSeasons);
  //   querySnapshotSeasons.forEach((season: any) => {
  //     element.seasons.push({ seasons: season.data().season, lessons: [], id: season.id })
  //   });
  //   element.seasons.forEach(async (season: any) => {
  //     const docRefLesson = query(collection(db, 'courses', element?.id, "seasons", season.id, "lessons"), orderBy('number'));
  //     const querySnapshotLesson = await getDocs(docRefLesson);
  //     querySnapshotLesson.forEach((lesson: any) => {
  //       element.totalLessons++;
  //       season.lessons.push({ ...lesson.data(), id: lesson.id });
  //     });
  //   });
  // });
  await Promise.all(courses.map(async (course: any) => {
    const docRefSeasons = query(collection(db, 'courses', course.id, "seasons"), orderBy('season'));
    const querySnapshotSeasons = await getDocs(docRefSeasons);
    querySnapshotSeasons.forEach((season: any) => {
      course.seasons.push({ seasons: season.data().season, lessons: [], id: season.id })
    });
    await Promise.all(course.seasons.map(async (season: any) => {
      const docRefLesson = query(collection(db, 'courses', course?.id, "seasons", season.id, "lessons"), orderBy('number'));
      const querySnapshotLesson = await getDocs(docRefLesson);
      querySnapshotLesson.forEach((lesson: any) => {
        var newobj = Object.assign({}, lesson.data());
        if (!("duration" in lesson.data())) {
          newobj["duration"] = 0;
        }
        course.totalDuration = course.totalDuration + newobj.duration;
        course.totalLessons++;
        season.lessons.push({ ...newobj, id: lesson.id });
      });
    }))
  }))
  // for (let i = 0; i < courses.length; i++) {
  //   const docRefSeasons = query(collection(db, 'courses', courses[i].id, "seasons"), orderBy('season'));
  //   const querySnapshotSeasons = await getDocs(docRefSeasons);
  //   querySnapshotSeasons.forEach((season: any) => {
  //     courses[i].seasons.push({ seasons: season.data().season, lessons: [], id: season.id })
  //   });
  //   for (let c = 0; c < courses[i].seasons.length; c++) {
  //     const docRefLesson = query(collection(db, 'courses', courses[i]?.id, "seasons", courses[i].seasons[c].id, "lessons"), orderBy('number'));
  //     const querySnapshotLesson = await getDocs(docRefLesson);
  //     querySnapshotLesson.forEach((lesson: any) => {
  //       courses[i].totalLessons++;
  //       courses[i].seasons[c].lessons.push({ ...lesson.data(), id: lesson.id });
  //     });
  //   }
  // }
  return courses;
}
export const getWholeCourse = async (courseId: any) => {
  let seasons: any = [];
  let lessons: any = [];
  let totalLessons = 0;
  let totalDuration = 0;
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
      var newobj = Object.assign({}, lesson.data());
      if (!("duration" in lesson.data())) {
        newobj["duration"] = 0;
      }
      totalLessons++;
      totalDuration = totalDuration + newobj.duration;
      lessons.push({ ...newobj, id: lesson.id });
      seasons[c].lessons.push({ ...newobj, id: lesson.id });
    });
  }
  return { ...docSnap.data(), id: courseId, seasons: seasons, totalLessons: totalLessons, lessons: lessons, totalDuration: totalDuration }
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
  onSnapshot(query(collection(db, 'comments'), orderBy("createdAt", "desc")), (doc) => {
    doc.docChanges().map((x) => {
      comment.push({ ...x.doc.data(), id: x.doc.id })
    });
  })
  return comment;
}

export const addUserToLesson = async (lesson: any, courseId: any, seasonId: any, lessonId: any, user: any) => {
  let temp_lesson: any;
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

export const getHomework = async (lessonId: string, userId: string) => {
  const docRef = doc(db, "homeworks", `${lessonId}-${userId}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const addHomework = async (data: any, userId: string) => {
  data.path = await uploadImageHwk(data.path, `${data.title}-${uuidv4()}`);
  const docRef = await setDoc(
    doc(db, "homeworks", `${data.lessonId}-${userId}`),
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

export const updateLessonProgress = async (userId: string, time: any, seconds: any, courseId: any, seasonId: any, lessonId: any) => {
  const docRef = doc(db, 'courses', courseId, 'seasons', seasonId, 'lessons', lessonId);
  const docSnap: any = await getDoc(docRef);
  let tempProgress = []
  tempProgress = docSnap.data().progress;
  if (!("progress" in docSnap.data())) {
    tempProgress = [];
  }
  if (!tempProgress.some((x: any) => x.id == userId)) {
    tempProgress.push({ id: userId, status: false, seconds: seconds, time: time })
  } else {
    let index = docSnap.data().progress.findIndex((x: any) => x.id == userId);
    tempProgress[index].seconds = seconds;
    tempProgress[index].time = time;
  }

  await updateDoc(docRef, {
    progress: tempProgress
  })
  return 'exito'
}

export const updateProgressStatus = async (progress: any, courseId: any, seasonId: any, lessonId: any) => {
  const docRef = doc(db, 'courses', courseId, 'seasons', seasonId, 'lessons', lessonId);
  const docSnap: any = await getDoc(docRef);

  await updateDoc(docRef, {
    progress: progress
  })
  return 'exito'
}

export const addCategory = async (category: any) => {
  const docRef = await addDoc(
    collection(db, "category"),
    {
      ...category
    }
  );
  return 'exito'
}
export const getCategory = async () => {
  let data: any = []
  const docRef = query(collection(db, "category"), orderBy("name", "asc"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}
export const deleteCategory = async (category: any) => {
  await deleteDoc(doc(db, "category", category.id));
}
export const updateCategory = async (category: any, id: any) => {
  console.log(category)
  const docRef = doc(db, 'category', id);
  await updateDoc(docRef, {
    name: category.name
  })
  return 'exito'
}

// "CREAR MATERIALES"
export const addMaterial = async (material: any) => {
  const docRef = await addDoc(
    collection(db, "material"),
    {
      ...material
    }
  );
  return 'exito'
}
export const getMaterial = async () => {
  let data: any = []
  const docRef = query(collection(db, "material"), orderBy("name", "asc"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}
export const deleteMaterial = async (material: any) => {
  await deleteDoc(doc(db, "material", material.id));
}
export const updateMaterial = async (material: any, id: any) => {
  const docRef = doc(db, 'material', id);
  await updateDoc(docRef, {
    name: material.name
  })
  return 'exito'
}
// "CREAR PROFESOR"
const uploadProfessorImage = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `professorPicture/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    });
  });
}
const uploadSignImage = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `professorSign/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    });
  });
}
export const addTeacher = async (professor: any) => {
  professor.reference = `${professor.name}-${uuidv4()}`
  professor.referenceSign = `${professor.name}-${uuidv4()}`
  professor.sign = await uploadSignImage(professor.sign, professor.referenceSign);
  professor.path = await uploadProfessorImage(professor.path, professor.reference);
  const docRef = await addDoc(
    collection(db, "professor"),
    {
      ...professor
    }
  );
  return docRef.id
}
export const getTeacher = async () => {
  let data: any = []
  const docRef = query(collection(db, "professor"), orderBy("name", "asc"));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}
export const deleteTeacher = async (professor: any) => {
  const storage = getStorage();
  const desertRef = ref(storage, `professorPicture/${professor.reference}`);
  const desertRefSign = ref(storage, `professorSign/${professor.referenceSign}`);
  await deleteObject(desertRef).then(async () => {
    await deleteObject(desertRefSign).then(async () => {
      await deleteDoc(doc(db, "professor", professor.id));
    }).catch((error) => {
      console.log(error)
    })
  }).catch((error) => {
    console.log(error)
  });
}
export const updateTeacher = async (professor: any, id: any) => {
  let tempProfessor: any = JSON.parse(JSON.stringify(professor))
  const storage = getStorage();
  const desertRef = ref(storage, `professorPicture/${tempProfessor.reference}`);
  const desertRefSign = ref(storage, `professorSign/${professor.referenceSign}`);
  console.log(tempProfessor)
  if ("format" in tempProfessor) {
    await deleteObject(desertRef).then(async () => {
      tempProfessor.reference = `${tempProfessor.name}-${uuidv4()}`
    }).catch((error) => {
      console.log(error)
    });
    tempProfessor.path = await uploadProfessorImage(tempProfessor.format, tempProfessor.reference);
    delete tempProfessor.format;
  }
  if ("formatSign" in tempProfessor) {
    await deleteObject(desertRefSign).then(async () => {
      tempProfessor.referenceSign = `${tempProfessor.name}-${uuidv4()}`
    }).catch((error) => {
      console.log(error)
    });
    tempProfessor.sign = await uploadSignImage(tempProfessor.formatSign, tempProfessor.referenceSign);
    delete tempProfessor.formatSign;
  }
  const docRef = doc(db, 'professor', id);
  delete tempProfessor.id;
  await updateDoc(docRef, {
    ...tempProfessor
  })

  return 'exito'
}
export const deleteQuiz = async (courseId: any, seasonId: any, lessonId: any) => {
  await deleteDoc(doc(db, "courses", courseId, "seasons", seasonId, "lessons", lessonId)).then(() => {
    return "200"
  })
}

export const getTeacherCourse = async (name: string) => {
  let data: any = []
  const docRef = query(collection(db, "professor"), where("name", "==", name));
  const querySnapshot = await getDocs(docRef);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id })
  });
  return data
}