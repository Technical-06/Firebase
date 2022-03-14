
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

import { getAuth,GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz7FynwwfjnHsejKNVQG5dPAEjPYrwCH0",
  authDomain: "blogproject-bac94.firebaseapp.com",
  projectId: "blogproject-bac94",
  storageBucket: "blogproject-bac94.appspot.com",
  messagingSenderId: "272615874232",
  appId: "1:272615874232:web:ac06753fd51e7c0c749e4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const auth = getAuth(app);
export const provider=new GoogleAuthProvider();