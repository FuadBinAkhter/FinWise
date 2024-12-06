// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfUnJXSdz1EA1JQPvBdM52H224oKSe-Q8",
    authDomain: "fin-wise-52bef.firebaseapp.com",
    projectId: "fin-wise-52bef",
    storageBucket: "fin-wise-52bef.firebasestorage.app",
    messagingSenderId: "888328723214",
    appId: "1:888328723214:web:26e5a48365c2b9194dd55f",
    measurementId: "G-EGHW6NZ1LQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app); // Export the auth object for authentication

// Initialize Firestore
export const db = getFirestore(app); // Export the Firestore database

export default app;
