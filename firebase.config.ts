// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn58I2ICHGKWE-cjBCQZdXgKi0wtm8Ef8",
  authDomain: "smart-paper-exchange.firebaseapp.com",
  projectId: "smart-paper-exchange",
  storageBucket: "smart-paper-exchange.appspot.com",
  messagingSenderId: "107249870601",
  appId: "1:107249870601:web:a9a812887d863a63c755d8",
  measurementId: "G-RX869ZRVSX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);