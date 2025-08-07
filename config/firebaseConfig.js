// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: '', // PON AQUI TU API KEY
  authDomain: '', // PON AQUI TU AUTH DOMAIN
  projectId: '', // PON AQUI TU PROJECT ID
  storageBucket: '', // PON AQUI TU STORAGE BUCKET
  messagingSenderId: '', // PON AQUI TU MESSAGING SENDER ID
  appId: '', // PON AQUI TU APP ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
