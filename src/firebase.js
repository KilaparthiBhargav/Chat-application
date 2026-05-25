import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3wZwYvG1zsTjszsoNDciGNTZpbTet3nk",
  authDomain: "chat-application-dc786.firebaseapp.com",
  projectId: "chat-application-dc786",
  storageBucket: "chat-application-dc786.firebasestorage.app",
  messagingSenderId: "949363526392",
  appId: "1:949363526392:web:e14ffb18a8a1b40a03890d",
  measurementId: "G-QG44X672WP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();