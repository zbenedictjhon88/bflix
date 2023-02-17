// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4q47RZZob4I0NlG_rl5SZuPmqYZiVK2U",
    authDomain: "bflix-stream.firebaseapp.com",
    projectId: "bflix-stream",
    storageBucket: "bflix-stream.appspot.com",
    messagingSenderId: "915012850836",
    appId: "1:915012850836:web:3b562d925499ddf2ae1081",
    measurementId: "G-6ED40J7H2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });