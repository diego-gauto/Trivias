import {
  getAuth, createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, addDoc } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import firebase from "firebase/compat/app";
import { useAuth } from "../../hooks/useAuth";

export const signUpWithCreds = (signUpData: { credentials: any; }) => {
  const {
    credentials,
  } = signUpData;

  console.log(signUpData)
  //Una vez inicializado es contextual a las llamadas de firebase
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, credentials.email,
    credentials.password)
    .then(async (userCredential) => {

      const user = userCredential.user;
      localStorage.setItem("username", credentials.name);
      localStorage.setItem("email", credentials.email);

      console.log("a")

      await addDoc(collection(db, "users"), {
        uid: user?.uid,
        name: credentials.name,
        email: credentials.email,
        phoneNumber: credentials.phoneInput,
        role: "user", //user, userAdmin, professor
        plan: "free", //gonvarPlus
        score: 0,
        urlImage: "none yet",


      }).then(() => {

        console.log("c")

      }).catch((error: any) => {
        let docCreationError = new Error(`Error creating user document: ${error}`);
        console.error(docCreationError);
        throw (docCreationError);
      })
    }).catch((error: any) => {
      firebase.auth().signOut();
      console.error(error);
      throw error;
    })

}
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


export const accessWithAuthProvider = (provider: any, signUpData: { credentials: any; }) => {
  const {
    credentials,
  } = signUpData;


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
  type ProviderUserData = {
    uid?: number;
    displayName?: string;
    email?: string;
    photoURL?: string;
  };

  var providerUsrData: ProviderUserData = {};

  return signInWithPopup(auth, provider)
    .then(async (response) => {
      console.log("signInWithPopup")
      console.log(response)

      return db
        .collection("users")
        .doc(response.uid)
        .get();
    }).then(async (doc) => {
      //If user does not exist register a new one
      if (!doc.exists) {


        //Create the document in Firestore
        await addDoc(collection(db, "users"), {

          uid: providerUsrData.uid,
          name: providerUsrData.displayName,
          email: providerUsrData.email,
          photoURL: providerUsrData.photoURL,

          role: "user", //user, userAdmin, professor
          plan: "free", //gonvarPlus
          score: 0,
          urlImage: "none yet",


        }).then(() => {

          console.log("c")

        }).catch((error: any) => {
          let docCreationError = new Error(`Error creating user document: ${error}`);
          console.error(docCreationError);
          throw (docCreationError);
        })

      } else {

      }
    }).catch((error) => {
      firebase.auth().signOut();
      console.error(error);

    });
}