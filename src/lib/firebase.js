import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBSAaMmNbEutjwNYBgFrfVAvyyhIJvCMAE",
  authDomain: "museum-4007c.firebaseapp.com",
  projectId: "museum-4007c",
  storageBucket: "museum-4007c.appspot.com",
  messagingSenderId: "443847601599",
  appId: "1:443847601599:web:8d907089bf34bd3698050a",
  databaseURL: 'https://museum-4007c-default-rtdb.firebaseio.com/',
  // apiKey: import.meta.env.apiKey,
  // authDomain: process.env.authDomain,
  // projectId: process.env.projectId,
  // storageBucket: process.env.storageBucket,
  // messagingSenderId: process.env.messagingSenderId,
  // appId: process.env.appId,
  // databaseURL: process.env.databaseURL
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);