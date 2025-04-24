import { initializeApp } from "firebase/app";
import { getDatabase, update, ref, set, get, child } from "firebase/database";
import { getAuth } from "firebase/auth"; // ✅ Import auth

const firebaseConfig = {
  apiKey: "AIzaSyD8EiKPm7Wx0j1xNAM2nF03lBQEwngiVNQ",
  authDomain: "reactecommerce-3f7c1.firebaseapp.com",
  databaseURL: "https://reactecommerce-3f7c1-default-rtdb.firebaseio.com",
  projectId: "reactecommerce-3f7c1",
  storageBucket: "reactecommerce-3f7c1.firebasestorage.app",
  messagingSenderId: "591878124490",
  appId: "1:591878124490:web:04d464ba74fe9c4cc55533",
  measurementId: "G-W46SLEPLTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const db = getDatabase(app);

// ✅ Initialize and export Auth
const auth = getAuth(app);

export { db, ref, get,getDatabase, update, child, set, auth };

