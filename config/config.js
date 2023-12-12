// Import the functions you need from the SDKs you need
import { initializeApp } from '@firebase/app'
import { getDatabase } from '@firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOZB7T4OSmwVzdzwRTxP8p3D3dP1WPvPs",
  authDomain: "noticia-bc423.firebaseapp.com",
  projectId: "noticia-bc423",
  storageBucket: "noticia-bc423.appspot.com",
  messagingSenderId: "492960720847",
  appId: "1:492960720847:web:f40a4e6868f9e81d3614ba"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);