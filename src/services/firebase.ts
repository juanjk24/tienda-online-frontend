import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

let auth: Auth;
let db: Firestore;

try {
  const app = initializeApp(firebaseConfig);

  auth = getAuth(app);
  db = getFirestore(app);

  console.info("Firebase initialized successfully.");
} catch (error) {
  console.error("🔥 Firebase Initialization Error:", error);
  throw new Error("Failed to initialize Firebase services.");
}

export { auth, db };