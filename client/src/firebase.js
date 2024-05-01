// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-app-3f0e7.firebaseapp.com",
  projectId: "mern-auth-app-3f0e7",
  storageBucket: "mern-auth-app-3f0e7.appspot.com",
  messagingSenderId: "866466575814",
  appId: "1:866466575814:web:0fc513a043433c540caec7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);