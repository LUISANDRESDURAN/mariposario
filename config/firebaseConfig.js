// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBfNIZAuPE_uRXFR_tfpt3u7i-su7njJ4",
  authDomain: "mariposario-app.firebaseapp.com",
  projectId: "mariposario-app",
  storageBucket: "mariposario-app.firebasestorage.app",
  messagingSenderId: "773358822731",
  appId: "1:773358822731:web:4576904f8a6d62476c34ce",
  measurementId: "G-15J7EC678B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, storage, auth };
