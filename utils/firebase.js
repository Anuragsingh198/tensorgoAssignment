// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAeaA7RQcmWLABw0cmXQwh2pvq9AUC5bSI",
  authDomain: "serviceapp-7bee4.firebaseapp.com",
  projectId: "serviceapp-7bee4",
  storageBucket: "serviceapp-7bee4.firebasestorage.app",
  messagingSenderId: "1080725892775",
  appId: "1:1080725892775:web:4974a7186dde45e379f582",
  measurementId: "G-9D1HXKJKJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
