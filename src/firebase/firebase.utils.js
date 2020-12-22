import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const {REACT_APP_API_KEY,REACT_APP_AUTH_DOMAIN,REACT_APP_PROJECTID,REACT_APP_STORAGE_BUCKET,REACT_APP_MESSAGING_SENDER_ID,REACT_APP_APP_ID,REACT_APP_MEASUREMENT_ID} = process.env;
// const test = `${REACT_APP_TEST_VAR}`
const config =  {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECTID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
  };
// console.log(config)
// console.log(test);
// console.log(process.env.BROWSER)
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;