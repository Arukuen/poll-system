import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuQLfKhInwv3E9u5qZM0afIMPb4RBbzRU",
  authDomain: "poll-system-cad0e.firebaseapp.com",
  projectId: "poll-system-cad0e",
  storageBucket: "poll-system-cad0e.appspot.com",
  messagingSenderId: "405401405583",
  appId: "1:405401405583:web:b15fb4621fc51fb16508fa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);