// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr9fWyaWG5JD9yNQbX_h1etH_3flPkcTk",
  authDomain: "native-app-1500a.firebaseapp.com",
  projectId: "native-app-1500a",
  storageBucket: "native-app-1500a.firebasestorage.app",
  messagingSenderId: "313084511755",
  appId: "1:313084511755:web:afaef56dd2e7613fe4a90e",
  measurementId: "G-ESGY9PXC6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);