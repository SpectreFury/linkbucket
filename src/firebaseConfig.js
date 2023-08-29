// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6QJjJIKxZtaetfQKjbuPwVOPswWUJEd8",
  authDomain: "linkbucket-58186.firebaseapp.com",
  projectId: "linkbucket-58186",
  storageBucket: "linkbucket-58186.appspot.com",
  messagingSenderId: "500455633988",
  appId: "1:500455633988:web:49e5b216c5831eb0637811",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
