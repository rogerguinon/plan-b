// src/firebase/firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDBkmx6zsuGmN6aR_bf0JC91gwQvVDYFcE",
  authDomain: "plan-b-d83b2.firebaseapp.com",
  projectId: "plan-b-d83b2",
  storageBucket: "plan-b-d83b2.appspot.com",
  messagingSenderId: "435441365762",
  appId: "1:435441365762:web:e167886875515af3bc481b"
};

// Esto previene múltiples inicializaciones
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
