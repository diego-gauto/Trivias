import {
  getAuth, createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot
} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import firebase from "firebase/compat/app";
import { useAuth } from "../../hooks/useAuth";

export const createCourse = (signUpData: { data: any; }) => {
  const {
    data,
  } = signUpData;

  console.log(signUpData)

  return db.collection('courses').add(data)
    .catch((error: any) => {
      let docCreationError = new Error(`Error creating user document: ${error}`);
      console.error(docCreationError);
      throw (docCreationError);
    })

}
export const updateCourse = (signUpData: { data: any; }) => {
  const {
    data,
  } = signUpData;

  console.log(signUpData)

  return db.collection('courses').doc(data.documentID).update(data)
    .catch((error: any) => {
      let docCreationError = new Error(`Error updating user document: ${error}`);
      console.error(docCreationError);
      throw (docCreationError);
    })

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

  console.log(signUpData)
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

      console.log("Provider Auth : 1")
      console.log(response)

      uid = response.user.uid;
      displayName = response.user.displayName;
      email = response.user.email;
      photoURL = response.user.photoURL;
      phoneNumber = response.user.phoneNumber;

      const query_1 = query(collection(db, "users"), where("uid", "==", response.user.uid));

      const querySnapshot = await getDocs(query_1);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        doc1 = doc.data().uid;
      });



    }).then(async () => {
      //If user does not exist register a new one

      console.log("Provider Auth : 2")
      console.log(doc1)

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

          console.log("Provider Auth : 3 | Wasn´t already registered")
          return true;

        }).catch((error: any) => {
          let docCreationError = new Error(`Error creating user document: ${error}`);
          console.error(docCreationError);
          throw (docCreationError);
        })

      } else {

        console.log("Provider Auth : 3 | Was already registered")
      }
    }).catch((error) => {
      firebase.auth().signOut();
      console.error(error);

    });
}

// Esto sera para admin courses

export const addLesson = async (lesson: any, courseId: any, seasonId: any) => {
  const docRef = await addDoc(
    collection(db, "courses", courseId, "seasons", seasonId, "lessons"),
    {
      ...lesson
    }
  );
  return 'exito'
}