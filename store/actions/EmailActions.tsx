import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import error from 'next/error';
import Stripe from 'stripe';

import { PREVIEW_PATH, SIGNUP_PAST_USER_PATH } from '../../constants/paths';
import { db, functions } from '../../firebase/firebaseConfig';
import { IMembership } from '../types/AuthActionTypes';

// https://www.npmjs.com/package/activecampaign

export const SendSingleEmail = async (emailData: {
  text?: any;
  text2?: number;
}) => {
  const { text } = emailData;

  //Una vez inicializado es contextual a las llamadas de firebase

  console.log('hola EmailActions');

  const data = {
    text: emailData.text,
    text2: emailData.text2,
    accessToken: '',
  };

  const firebaseFunction = httpsCallable(functions, 'ActiveCampaign_Send');
  const getAccessOAuth2Token = httpsCallable(functions, 'GetAccessToken');

  return await getAccessOAuth2Token()
    .then(async (e: any) => {
      data.accessToken = e.data.token;
      console.log(e.data.token);
      return await firebaseFunction(data).then(async (e: any) => {
        console.log(e);
        return e;
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
};
