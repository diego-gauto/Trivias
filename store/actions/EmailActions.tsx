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
import error from "next/error";
import Stripe from "stripe";

import { PREVIEW_PATH, SIGNUP_PAST_USER_PATH } from "../../constants/paths";
import { db, functions } from "../../firebase/firebaseConfig";
import { IMembership } from "../types/AuthActionTypes";

// https://www.npmjs.com/package/activecampaign

export const SendSingleEmail = async (
  emailData: { text?: any; text2?: number }
) => {
  const {
    text,
  } = emailData;

  //Una vez inicializado es contextual a las llamadas de firebase

  console.log("hola EmailActions")


  const data = {
    text: emailData.text,
    text2: emailData.text2,
  }


  const firebaseFunction = httpsCallable(functions, 'ActiveCampaign_Send');
  const a = await firebaseFunction(data).then(async (res: any) => {
    console.log(res)
    return res
  }).catch((error: any) => {
    console.log(error)
  })
  return a;


}