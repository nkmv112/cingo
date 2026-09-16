/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For this MVP, we leave these blank and expect the user to fill them in an .env file
// Or provide a mock implementation if keys are missing to prevent crashing.
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {} as any;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "mock_key",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "mock_domain",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "mock_project_id",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "mock_bucket",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock_sender",
  appId: env.VITE_FIREBASE_APP_ID || "mock_app_id"
};

// Initialize Firebase only if we have a real key, otherwise mock to prevent crash during development
const isMock = firebaseConfig.apiKey === "mock_key";

let app: any, auth: any, db: any;

if (!isMock) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn("Firebase config is missing in .env! Running in Mock DB mode.");
  auth = {
     currentUser: null,
     onAuthStateChanged: (cb: any) => cb(null),
     signOut: async () => {}
  } as any;
  db = {} as any;
}

export { auth, db, isMock };
