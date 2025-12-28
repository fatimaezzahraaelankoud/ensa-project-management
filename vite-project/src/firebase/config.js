import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCyUhdIudkulseqbDm8Y8ewrtJLSmh0jfY",
  authDomain: "kanbanapp-f2d01.firebaseapp.com",
  projectId: "kanbanapp-f2d01",
  storageBucket: "kanbanapp-f2d01.firebasestorage.app",
  messagingSenderId: "548015508470",
  appId: "1:548015508470:web:460307e21a1238152115d7"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Auth et Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(); 


