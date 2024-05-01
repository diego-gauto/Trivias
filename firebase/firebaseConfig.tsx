import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';
import { getFunctions } from 'firebase/functions';

export const config = {
  apiKey: 'AIzaSyCkIfdk26SoSEhvtqafsImCaY0ELQK3W3M',
  authDomain: 'marketing-gonvar.firebaseapp.com',
  databaseURL: 'https://marketing-gonvar-default-rtdb.firebaseio.com',
  projectId: 'marketing-gonvar',
  storageBucket: 'marketing-gonvar.appspot.com',
  messagingSenderId: '723229844184',
  appId: '1:723229844184:web:275786d384bf51dd286dad',
  measurementId: 'G-XZLHY5X0WJ',
};

const app = firebase.initializeApp(config);

export function getTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export const auth = app.auth();
export const db = app.firestore();
export const functions = getFunctions(app);
export const storage = app.storage();
