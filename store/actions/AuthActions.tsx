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


      console.log("Provider Auth : 1")

      await addDoc(collection(db, "users"), {
        uid: user?.uid,
        name: credentials.name,
        email: credentials.email,
        photoURL: "",
        provider: "Webpage",
        phoneNumber: credentials.phoneInput,
        role: "user", //user, userAdmin, professor
        plan: "free", //gonvarPlus
        score: 0,


      }).then(() => {


        console.log("Provider Auth : 2")

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
      return onSnapshot(query_1, (response) => {

        var doc: any;
        response.forEach((e) => {
          doc = e.data()
        });
      })


    }).then(async (doc) => {
      //If user does not exist register a new one

      console.log("Provider Auth : 2")
      console.log(doc)
      if (!doc) {


        if (photoURL == undefined || photoURL == null) {
          photoURL = ""
        }
        //Create the document in Firestore
        await addDoc(collection(db, "users"), {

          uid: uid,
          name: displayName,
          email: email,
          photoURL: photoURL,
          provider: provider,
          phoneNumber: phoneNumber,
          role: "user", //user, userAdmin, professor
          plan: "free", //gonvarPlus
          score: 0,


        }).then(() => {

          console.log("Provider Auth : 3")

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