// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4uDBQVbiJa8ByBfndsIfPWsF0rLgXSZ0",
  authDomain: "cinecraftgpt.firebaseapp.com",
  projectId: "cinecraftgpt",
  storageBucket: "cinecraftgpt.appspot.com",
  messagingSenderId: "156875162897",
  appId: "1:156875162897:web:d9f46bc7470aa0083cf8b0",
  measurementId: "G-DXNX86PYWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();