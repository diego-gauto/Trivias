
//import fb from "../../config/fbConfig"; 
//import { completeRegistrationEvent } from "./FbPixelsActions";


export const signUpWithCreds = (signUpData) => {
  const {
    credentials,
  } = signUpData;

  return (dispatch, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((response) => {
        localStorage.setItem("username", credentials.name);
        localStorage.setItem("email", credentials.email);

        let usrData = {
          uid: response.user.uid,
          name: credentials.name,
          email: credentials.email,
        }

        //Create the document in Firestore
        createNewUserDoc(getFirebase, getFirestore, usrData).then(() => {

          /*firebase.auth().currentUser.sendEmailVerification()
          .then(()=>{
            console.log("Email verification sent");
          });*/ //verificación de correo temporalmente desactivada 11-04-2022

          /*
          //Register user CompleteRegistration event in Facebook Pixel
          dispatch(completeRegistrationEvent());
  
          //Register successful registration in customer.io
          const cioRegisterSuccessfulRegistration = firebase.functions().httpsCallable('cioRegisterSuccessfulRegistration');
          return cioRegisterSuccessfulRegistration({name: usrData.name, from_view: fromView}).then(()=>{
            dispatch({ type: "SIGNUP_SUCCESS" });
          }).catch((error) => {
            console.error(new Error(`Error registering event in cio: ${error}`));
          });
  
  
          */
        }).catch((error) => {
          let docCreationError = new Error(`Error creating user document: ${error}`);
          console.error(docCreationError);
          throw (docCreationError);
        })
      }).catch((error) => {
        firebase.auth().signOut();
        console.error(error);
        dispatch({ type: "SIGNUP_ERROR", error });
        throw error;
      })
  }
}