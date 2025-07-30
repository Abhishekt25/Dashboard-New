import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCYgPlyn6rXUXzIxRQfibW5T6FQfb0O-iI",
  authDomain: "reactdashboard-c967c.firebaseapp.com",
  projectId: "reactdashboard-c967c",
  storageBucket: "reactdashboard-c967c.firebasestorage.app",
  messagingSenderId: "515519303038",
  appId: "1:515519303038:web:14e9aa4a71db555fc8b72f",
  measurementId: "G-NQVL19Y3Q8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const analytics = getAnalytics(app); // Initialize Analytics (optional)

export { db }; // Export Firestore instance