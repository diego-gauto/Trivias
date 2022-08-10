import {
  getAuth, createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  collection, doc, getDocs, getFirestore, query, setDoc, addDoc, where, onSnapshot
} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { functions } from "../../firebase/firebaseConfig";
import firebase from "firebase/compat/app";
import { httpsCallable } from 'firebase/functions';
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

      const data = {
        name: credentials.name,
        email: credentials.email,
      }
      let dateTime = new Date()
      const stripeUser = httpsCallable(functions, 'createStripeUser');
      await stripeUser(data).then(async (res: any) => {
        await addDoc(collection(db, "users"), {
          uid: user?.uid,
          name: credentials.name,
          email: credentials.email,
          photoURL: "",
          provider: "Webpage",
          phoneNumber: credentials.phoneInput,
          role: "user", //user, userAdmin, professor
          stripeId: res.data.id,
          created_at: dateTime,
          membership: {
            finalDate: '',
            level: 0,
            method: '',
            planId: '',
            planName: '',
            paymentMethod: {
              card: '',
              last4: '',
              month: '',
              year: '',
              brand: '',
            }
          },
          score: 0,
        }).then(() => {
          console.log("Provider Auth : 2")
        }).catch((error: any) => {
          let docCreationError = new Error(`Error creating user document: ${error}`);
          console.error(docCreationError);
          throw (docCreationError);
        })
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
        const data = {
          name: displayName,
          email: email,
        }
        let dateTime = new Date()
        const stripeUser = httpsCallable(functions, 'createStripeUser');
        await stripeUser(data).then(async (res: any) => {

          //Create the document in Firestore
          await addDoc(collection(db, "users"), {
            uid: uid,
            name: displayName,
            email: email,
            photoURL: photoURL,
            provider: provider.providerId,
            phoneNumber: phoneNumber,
            created_at: dateTime,
            role: "user", //user, userAdmin, professor
            stripeId: res.data.id,
            membership: {
              finalDate: '',
              level: 0,
              method: '',
              planId: '',
              planName: '',
              paymentMethod: {
                card: '',
                last4: '',
                month: '',
                year: '',
                brand: '',
              }
            },
            score: 0,


          }).then(() => {

            console.log("Provider Auth : 3 | Wasn´t already registered")
            return true;

          }).catch((error: any) => {
            let docCreationError = new Error(`Error creating user document: ${error}`);
            console.error(docCreationError);
            throw (docCreationError);
          })
        })

      } else {

        console.log("Provider Auth : 3 | Was already registered")
      }
    }).catch((error) => {
      firebase.auth().signOut();
      console.error(error);

    });
}