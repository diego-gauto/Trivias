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

