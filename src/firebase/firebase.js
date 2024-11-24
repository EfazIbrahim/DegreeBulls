// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA1Jp_maV31E7uoWNZHx4-d2TwxIAmwqA",
  authDomain: "degreebulls.firebaseapp.com",
  projectId: "degreebulls",
  storageBucket: "degreebulls.appspot.com",
  messagingSenderId: "796585356044",
  appId: "1:796585356044:web:04e7d114eebf68a155f729",
  measurementId: "G-NH8HGPCPSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };  