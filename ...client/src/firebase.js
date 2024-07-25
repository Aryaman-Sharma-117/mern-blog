// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ca1a7.firebaseapp.com",
  projectId: "mern-blog-ca1a7",
  storageBucket: "mern-blog-ca1a7.appspot.com",
  messagingSenderId: "409710478059",
  appId: "1:409710478059:web:abf1d881bd084bb63a34ae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)