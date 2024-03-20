import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv7CC43OWW3j7_PyBsrTdvX7BsSpFgzqg",
  authDomain: "chatterbox-6f827.firebaseapp.com",
  projectId: "chatterbox-6f827",
  storageBucket: "chatterbox-6f827.appspot.com",
  messagingSenderId: "639647612374",
  appId: "1:639647612374:web:0ba928499abd00bbc9b877",
  measurementId: "G-DJ7M271HKC"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
