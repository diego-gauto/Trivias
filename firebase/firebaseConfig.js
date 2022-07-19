// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkIfdk26SoSEhvtqafsImCaY0ELQK3W3M",
  authDomain: "marketing-gonvar.firebaseapp.com",
  databaseURL: "https://marketing-gonvar-default-rtdb.firebaseio.com",
  projectId: "marketing-gonvar",
  storageBucket: "marketing-gonvar.appspot.com",
  messagingSenderId: "723229844184",
  appId: "1:723229844184:web:275786d384bf51dd286dad",
  measurementId: "G-XZLHY5X0WJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
