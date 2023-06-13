import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe0oPlqBkR_wH1FNikp9zsFJzNQWZJPR4",
  authDomain: "p-2-p-chat-app.firebaseapp.com",
  projectId: "p-2-p-chat-app",
  storageBucket: "p-2-p-chat-app.appspot.com",
  messagingSenderId: "1030108132461",
  appId: "1:1030108132461:web:fb393dc00a7d6b20b37b64",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
