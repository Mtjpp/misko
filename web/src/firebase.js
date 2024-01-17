// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics, initializeAnalytics } from "firebase/analytics";
import "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCE6s_CrsUWn_jZwmso24N1PPjn0lin8D4",
  authDomain: "student-project-better-town.firebaseapp.com",
  databaseURL: "https://student-project-better-town-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "student-project-better-town",
  storageBucket: "student-project-better-town.appspot.com",
  messagingSenderId: "836918915085",
  appId: "1:836918915085:web:d2ee96a60327f32187e544",
  measurementId: "G-ZRP1P9FK2H"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const incidentsCollection = collection(db, 'incident')
const storage = getStorage(firebase)
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// Export Firebase and the Google provider
export{ firebaseConfig, firebase, incidentsCollection, storage, db};