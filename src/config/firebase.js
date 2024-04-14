import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAsCNgxM0DSjVTea34Gw_vFgqaog16MPiQ",
    authDomain: "fir-test-d0ec6.firebaseapp.com",
    projectId: "fir-test-d0ec6",
    storageBucket: "fir-test-d0ec6.appspot.com",
    messagingSenderId: "783944192708",
    appId: "1:783944192708:web:f4d6a04776771c76202f91",
    measurementId: "G-Q6HMRBQHMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);