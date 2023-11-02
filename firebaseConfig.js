import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyKhfItxVPumwnsWqJVJCl5l_u1_uLt68",
  authDomain: "messangerapp-e9a3d.firebaseapp.com",
  projectId: "messangerapp-e9a3d",
  storageBucket: "messangerapp-e9a3d.appspot.com",
  messagingSenderId: "709528092520",
  appId: "1:709528092520:web:e8b29bf4e32c47f1b6a0dd",
  measurementId: "G-XLLBH12CR3",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const DB = getFirestore(app);

export { auth, DB };
