import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import Stripe from "stripe";

import { PREVIEW_PATH, SIGNUP_PAST_USER_PATH } from "../../constants/paths";
import { db, functions } from "../../firebase/firebaseConfig";
import { IMembership } from "../types/AuthActionTypes";

export const signUpWithCreds = (
  signUpData: { credentials: any; membership?: IMembership },
  paymentMethods: Stripe.PaymentMethod[] | undefined = undefined
) => {
  const {
    credentials,
  } = signUpData;

  //Una vez inicializado es contextual a las llamadas de firebase
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, credentials.email,
    credentials.password)
    .then(async (userCredential) => {

      const user = userCredential.user;
      localStorage.setItem("username", credentials.name);
      localStorage.setItem("email", credentials.email);

      const data = {
        name: credentials.name,
        email: credentials.email,
      }
      let dateTime = new Date()
      const membership: IMembership = {
        finalDate: 0,
        level: 0,
        method: '',
        planId: '',
        planName: '',
        paymentMethod: [],
        startDate: 0,
        ...signUpData.membership
      }
      if (credentials.month) {
        membership.finalDate = (new Date().getTime() / 1000) + 2592000;
      }
      const stripeUser = httpsCallable(functions, 'createStripeUser');
      await stripeUser(data).then(async (res: any) => {
        return await addDoc(collection(db, "users"), {
          uid: user?.uid,
          name: credentials.name,
          lastName: credentials.lastName,
          email: credentials.email,
          photoURL: "",
          provider: "Webpage",
          phoneNumber: credentials.phoneInput,
          role: "user", //user, userAdmin, professor
          stripeId: res.data.id,
          created_at: dateTime,
          membership,
          score: 0,
        }).then((newUser) => {
          console.log("Provider Auth : 2")
          if (!!paymentMethods && paymentMethods.length !== 0) {
            const newUserPaymentMethodsCollection = db.collection("users").doc(newUser.id).collection("paymentMethods");
            Promise.all(paymentMethods.map((pm) => {
              const pm_data = {
                brand: pm.card?.brand,
                cardId: pm.id,
                exp_month: pm.card?.exp_month,
                exp_year: pm.card?.exp_year,
                last4: pm.card?.last4,
                holder: credentials.name,
              }
              newUserPaymentMethodsCollection.add(pm_data);
            }));
          }
        }).catch((error: any) => {
          let docCreationError = new Error(`Error creating user document: ${error}`);
          console.error(docCreationError);
          throw (docCreationError);
        })
      })
      return PREVIEW_PATH;
    }).catch((error: any) => {
      firebase.auth().signOut();
      console.error(error);
      throw error;
    })
}

const hasCurrentUser = async (email: string) => {
  const user = await db.collection('users').where("email", "==", email).limit(1).get();
  return !!user.docs[0];
}

const hasPastUser = async (email: string) => {
  const pastUser = await db.collection('pastUsers').where("email", "==", email).limit(1).get();
  return !!pastUser.docs[0];
}

export const signInWithCreds = async (signUpData: { credentials: any; }) => {
  const {
    credentials,
  } = signUpData;

  const hasCurrentUserVar = await hasCurrentUser(credentials.email);
  const hasPastUserVar = await hasPastUser(credentials.email);

  if (!hasCurrentUserVar && hasPastUserVar) {
    localStorage.setItem("pastUserEmail", credentials.email);
    return SIGNUP_PAST_USER_PATH;
  }

  //Una vez inicializado es contextual a las llamadas de firebase
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    localStorage.setItem("email", credentials.email);
    return PREVIEW_PATH;
  } catch (err: any) {
    firebase.auth().signOut();
    return err.code;
  }
};
export const signUpCreds = async (signUpData: { credentials: any; }) => {
  const {
    credentials,
  } = signUpData;
  console.log(credentials.email)
  const hasCurrentUserVar = await hasCurrentUser(credentials.email);
  if (hasCurrentUserVar) {
    localStorage.setItem("pastUserEmail", credentials.email);
    return SIGNUP_PAST_USER_PATH;
  }
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    localStorage.setItem("email", credentials.email);
    return PREVIEW_PATH;
  } catch (err: any) {
    return err.code;
  }
};


export const accessWithAuthProvider = (provider: any, trial?: any) => {
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
    // throw error;
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

      const hasCurrentUserVar = await hasCurrentUser(email);
      const hasPastUserVar = await hasPastUser(email);

      if (!hasCurrentUserVar && hasPastUserVar) {
        localStorage.setItem("pastUserEmail", email);
        return SIGNUP_PAST_USER_PATH;
      }

      const query_1 = query(collection(db, "users"), where("uid", "==", response.user.uid));

      const querySnapshot = await getDocs(query_1);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        doc1 = doc.data().uid;
      });
      return;
    }).then(async (redirectURL) => {
      //If user does not exist register a new one
      if (redirectURL) {
        return redirectURL;
      }

      if (!doc1) {
        if (photoURL == undefined || photoURL == null) {
          photoURL = ""
        }
        const data = {
          name: displayName,
          email: email,
        }
        let dateTime = new Date()
        let membership: any = {
          finalDate: '',
          level: 0,
          method: '',
          planId: '',
          planName: '',
          paymentMethod: '',
          startDate: 0
        }
        if (trial) {
          membership.finalDate = (new Date().getTime() / 1000) + 2592000;
        }
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
            membership,
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
      return PREVIEW_PATH;
    }).catch((error) => {
      firebase.auth().signOut();
      console.error(error);
      throw error;
    });
}
