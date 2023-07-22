
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIcgG7DF8TdmWcbJ_gmNFpVER-K7t53S8",
    authDomain: "kljojerngoetgj.firebaseapp.com",
    projectId: "kljojerngoetgj",
    storageBucket: "kljojerngoetgj.appspot.com",
    messagingSenderId: "735040986086",
    appId: "1:735040986086:web:cd5cf0fb23f5b413e11427"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()