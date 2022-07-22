import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

  return createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(async (userCredential) => {

      const user = userCredential.user;
      localStorage.setItem("username", credentials.name);
      localStorage.setItem("email", credentials.email);

      console.log("a")

      //createNewUserDoc(usrData).then(() => {
      await addDoc(collection(db, "users"), {
        uid: user?.uid,
        name: credentials.name,
        email: credentials.email,

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


export const createNewUserDoc = (
  usrData: { uid: any; name: any; email: any; photoURL?: any; initScore?: any; }) => {
  const {
    uid,
    name,
    email,
    photoURL = null,
    initScore = 0
  } = usrData;


  console.log("b")

  localStorage.setItem("email", email);
  localStorage.setItem("username", name);


  return setDoc(doc(db, "users", uid), {
    name: name,
    email: email,
    profileImage: photoURL,
    score: initScore

  }).then((res) => {
    console.log("setdoc")
    console.log(res)
  }).catch((error: any) => {
    let newError = new Error(`Error in creating user document: ${error}`);
    console.error(newError);
    throw (newError);
  })
}