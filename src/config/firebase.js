
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "realtime-chat-app-12b71.firebaseapp.com",
  projectId: "realtime-chat-app-12b71",
  storageBucket: "realtime-chat-app-12b71.firebasestorage.app",
  messagingSenderId: "319251877943",
  appId: "1:319251877943:web:30b45a269005877ca3efb2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getFirestore();
export const storage=getStorage();