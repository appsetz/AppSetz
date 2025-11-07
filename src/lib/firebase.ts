import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBq25czLlzsr81V-4yClqbZN3337UT9zbw",
  authDomain: "appkraft-portfolio.firebaseapp.com",
  projectId: "appkraft-portfolio",
  storageBucket: "appkraft-portfolio.firebasestorage.app",
  messagingSenderId: "371192983439",
  appId: "1:371192983439:web:6ed013aa2c691ac59a65fa",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
