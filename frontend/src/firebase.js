// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "disease-prediction-84d6f.firebaseapp.com",
  projectId: "disease-prediction-84d6f",
  storageBucket: "disease-prediction-84d6f.firebasestorage.app",
  messagingSenderId: "540379309227",
  appId: "1:540379309227:web:48e489a9e9412fe26a03ee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);