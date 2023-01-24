import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCY_Tf65tuvzVySdecuWcE4nIpUPjRyE6E",
  authDomain: "e-ticaret-d3676.firebaseapp.com",
  projectId: "e-ticaret-d3676",
  storageBucket: "e-ticaret-d3676.appspot.com",
  messagingSenderId: "136546871422",
  appId: "1:136546871422:web:f709a6a894f425f56f102f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
