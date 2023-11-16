import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { FIREBASE_API_KEY } from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "calculadora-imc-68d89.firebaseapp.com",
  projectId: "calculadora-imc-68d89",
  storageBucket: "calculadora-imc-68d89.appspot.com",
  messagingSenderId: "147211395392",
  appId: "1:147211395392:web:4045eaf128fac416de1aa5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
