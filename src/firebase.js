
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKwcp8In7j0VCLH4e907NsUINU1eiES20",
  authDomain: "locationsearchinterview.firebaseapp.com",
  projectId: "locationsearchinterview",
  storageBucket: "locationsearchinterview.appspot.com",
  messagingSenderId: "454594796806",
  appId: "1:454594796806:web:784ba93c2162482b2f5287",
  measurementId: "G-K7NWEPH0MB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };