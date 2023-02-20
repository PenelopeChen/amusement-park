// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK-rm3O0azfKWb8JU-YMQtmbqacY7H2Zs",
  authDomain: "amusement-park-126ad.firebaseapp.com",
  projectId: "amusement-park-126ad",
  storageBucket: "amusement-park-126ad.appspot.com",
  messagingSenderId: "725464209488",
  appId: "1:725464209488:web:75015ee03390c527fbd955",
  measurementId: "G-NRGWRQCFHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);


// Initialize Firebase Authentication and get a reference to the service
export { auth, db, database };