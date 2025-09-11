import { initializeApp } from 'firebase/app';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDuZU3T1HW5MEXXIxf3dOCb2ncUmn-rYaA",
  authDomain: "lostandfound-3cd67.firebaseapp.com",
  databaseURL: "https://lostandfound-3cd67-default-rtdb.firebaseio.com",
  projectId: "lostandfound-3cd67",
  storageBucket: "lostandfound-3cd67.firebasestorage.app",
  messagingSenderId: "477363458500",
  appId: "1:477363458500:web:2803f4979143cf968ed491",
  measurementId: "G-TG74FCG3MD"
};

const app= initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const googleProvider= new GoogleAuthProvider();










