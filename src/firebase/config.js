
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"         //funcionalidades de autenticacion
import { getFirestore } from "firebase/firestore/lite" //config de la base de datos 
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments()

//Testing
const firebaseConfig = {
  apiKey:VITE_APIKEY, 
  authDomain:VITE_AUTHDOMAIN, 
  projectId:VITE_PROJECTID, 
  storageBucket:VITE_STORAGEBUCKET, 
  messagingSenderId:VITE_MESSAGINGSENDERID, 
  appId:VITE_APPID, 
};


// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp ); //funcionalidades de autenticacion 
export const FirebaseDB = getFirestore( FirebaseApp ) //config de la base de datos 
