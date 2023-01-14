// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjxY11MnpZdubFCnDT7u3N3hfbQPXgQ6A",
    authDomain: "invedus-divesh.firebaseapp.com",
    projectId: "invedus-divesh",
    storageBucket: "invedus-divesh.appspot.com",
    messagingSenderId: "109206325852",
    appId: "1:109206325852:web:3433a41501ee01d0b93499"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const db =  getFirestore(app);
// export default db;
export const storage = getStorage(app);