// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAjZnyQ7lHnCQp9z116GNOW2ZBWM8OkbBA",
    authDomain: "cryptoviewer-ef0a4.firebaseapp.com",
    projectId: "cryptoviewer-ef0a4",
    storageBucket: "cryptoviewer-ef0a4.firebasestorage.app",
    messagingSenderId: "951772682419",
    appId: "1:951772682419:web:3794c0a5a71f8dcf8a38c6",
    measurementId: "G-2CT301WY6K"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
