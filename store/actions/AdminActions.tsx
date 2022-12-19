import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import firebase from "firebase/compat/app";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { db } from "../../firebase/firebaseConfig";

export const createCourse = async (signUpData: { data: any; }) => {
  const {
    data,
  } = signUpData;
  data.createdAt = new Date();
  data.reference = `${data.courseTittle}-${uuidv4()}`
  data.coursePath = await uploadImage(data.coursePath, data.reference);
  return db.collection('courses').add(data).then((res) => {
    db.collection('courses').doc(res.id).update({
      documentID: res.id
    });
  })

    .catch((error: any) => {
      let docCreationError = new Error(`Error creating user document: ${error}`);
      console.error(docCreationError);
      throw (docCreationError);
    })

}
const uploadImage = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `courses/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    });
  });
}
export const updateCourse = async (signUpData: { data: any; }, images: any) => {
  const {
    data,
  } = signUpData;

  let tempCourse: any = JSON.parse(JSON.stringify(data))

  const storage = getStorage();
  const desertRef = ref(storage, `courses/${tempCourse.reference}`);
  if (images !== "") {
    await deleteObject(desertRef).then(async () => {
      tempCourse.reference = `${tempCourse.courseTittle}-${uuidv4()}`
    }).catch((error) => {
      console.log(error)
    });
    tempCourse.coursePath = await uploadImage(images, tempCourse.reference);
  }
  return db.collection('courses').doc(data.documentID).update(tempCourse)
    .catch((error: any) => {
      let docCreationError = new Error(`Error updating user document: ${error}`);
      console.error(docCreationError);
      throw (docCreationError);
    })

}

export const updateRole = async (adminData: { data: object; }, adminID: string) => {
  const {
    data,
  } = adminData;
  try {
    return await db.collection('users').doc(adminID).update(adminData);
  } catch (error) {
    let docCreationError = new Error(`Error updating user document: ${error}`);
    console.error(docCreationError);
    throw (docCreationError);
  }

}

/*
  const handleChangeResolved = async (id, value) => {
    const doc = db.collection("newsletter").doc(id);
    // Set the "capital" field of the city 'DC'
    try {
      await doc.update({
        status: value,
      });
      updateState(id, "status", value);
      console.log("Document successfully updated!");
    } catch (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    }
  };
*/

/*
 db.collection('dynamic_copies')
      .doc('AseQzYW4e5SuvVSU4E3r')
      .collection('modulo3')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setModuleInfo3({
            ...doc.data(),
            id: doc.id,
          });
        });
      });
*/

/*CREAR COLECCIONES
export const createCourse = (signUpData: { data: any; }) => {
  const {
    data,
  } = signUpData;

  console.log(signUpData)
  //Una vez inicializado es contextual a las llamadas de firebase
  
  return db.collection('users').doc(data.uid)
    .collection('courses').add(signUpData)
    .catch((error: any) => {
      let docCreationError = new Error(`Error creating user document: ${error}`);
      console.error(docCreationError);
      throw (docCreationError);
    })
}
*/

export const signInWithCreds = (signUpData: { credentials: any; }) => {
  const {
    credentials,
  } = signUpData;

  //Una vez inicializado es contextual a las llamadas de firebase
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, credentials.email,
    credentials.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("email", credentials.email);
    })
    .catch((error: any) => {

      firebase.auth().signOut();
      console.error(error);
      throw error;
    });

};


export const accessWithAuthProvider = (provider: any) => {



  switch (provider) {
    case "Google":
      provider = new firebase.auth.GoogleAuthProvider();
      break;
    case "Facebook":
      provider = new firebase.auth.FacebookAuthProvider();
      break;
    default:
      const error = new Error("Invalid or no auth provider introduced")
      console.error(error);
      throw error;
  }
  const auth = getAuth();


  var uid: any;
  var displayName: any;
  var email: any;
  var photoURL: any;
  var phoneNumber: any;
  var doc1: any;

  return signInWithPopup(auth, provider)
    .then(async (response) => {
      uid = response.user.uid;
      displayName = response.user.displayName;
      email = response.user.email;
      photoURL = response.user.photoURL;
      phoneNumber = response.user.phoneNumber;

      const query_1 = query(collection(db, "users"), where("uid", "==", response.user.uid));

      const querySnapshot = await getDocs(query_1);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        doc1 = doc.data().uid;
      });

    }).then(async () => {
      //If user does not exist register a new one
      if (!doc1) {


        if (photoURL == undefined || photoURL == null) {
          photoURL = ""
        }
        //Create the document in Firestore
        await addDoc(collection(db, "users"), {

          uid: uid,
          name: displayName,
          email: email,
          photoURL: photoURL,
          provider: provider.providerId,
          phoneNumber: phoneNumber,
          role: "user", //user, userAdmin, professor
          plan: "free", //gonvarPlus
          score: 0,


        }).then(() => {
          return true;

        }).catch((error: any) => {
          let docCreationError = new Error(`Error creating user document: ${error}`);
          console.error(docCreationError);
          throw (docCreationError);
        })

      }
    }).catch((error) => {
      firebase.auth().signOut();
      console.error(error);

    });
}

// Esto sera para admin courses

const uploadImageLesson = (image: any, name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `courses/lesson/${name}`);
  return new Promise((resolve, reject) => {
    uploadString(storageRef, image, 'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      });
    });
  });
}

export const addLesson = async (lesson: any, courseID: any, seasonID: any) => {
  lesson.users = []
  lesson.imageReference = `${lesson.title}-${uuidv4()}`
  lesson.image = await uploadImageLesson(lesson.image, lesson.imageReference);
  if (lesson.extra.length > 0) {
    lesson.extra.forEach(async (element: any, index: any) => {
      element.reference = `${uuidv4()}`
      element.path = await uploadImageLesson(element.path, element.reference);

      if (index == lesson.extra.length - 1) {
        const docRef = await addDoc(
          collection(db, "courses", courseID, "seasons", seasonID, "lessons"),
          {
            ...lesson
          }
        );
      }
    });

  } else {
    const docRef = await addDoc(
      collection(db, "courses", courseID, "seasons", seasonID, "lessons"),
      {
        ...lesson
      }
    );
  }
}
export const addQuiz = async (quiz: any, courseID: any, seasonID: any) => {
  quiz.users = []
  const docRef = await addDoc(
    collection(db, "courses", courseID, "seasons", seasonID, "lessons"),
    {
      ...quiz
    }
  );

}
export const editSeasonName = async (courseID: string, seasonID: string, seasonName: string) => {
  return await db.collection('courses').doc(courseID).collection("seasons").doc(seasonID).update({ name: seasonName });
}

export const editSeasonIndex = async (courseID: string, seasonID: any, index: number) => {
  return await db.collection('courses').doc(courseID).collection("seasons").doc(seasonID).update({ season: index });
}
