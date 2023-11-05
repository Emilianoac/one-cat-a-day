import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBHvHVvzph96qj2wPRoS1nPNCxnxW5t1RU",
  authDomain: "one-cat-a-day.firebaseapp.com",
  projectId: "one-cat-a-day",
  storageBucket: "one-cat-a-day.appspot.com",
  messagingSenderId: "533503365159",
  appId: "1:533503365159:web:5a28eaa33c6ac643763e02",
  measurementId: "G-WGNR6V24QP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db