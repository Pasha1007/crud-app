import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDlI0o5-RhVI5LyNv7YI7H-OauF5S6h8pU",
    authDomain: "react-crud2-610c3.firebaseapp.com",
    projectId: "react-crud2-610c3",
    storageBucket: "react-crud2-610c3.appspot.com",
    messagingSenderId: "496915072578",
    appId: "1:496915072578:web:2e0a1ec1540d93503dcfdb",
    measurementId: "G-FLBWLG51RK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);