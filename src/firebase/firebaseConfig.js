import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDBkmx6zsuGmN6aR_bf0JC91gwQvVDYFcE",
  authDomain: "plan-b-d83b2.firebaseapp.com",
  projectId: "plan-b-d83b2",
  storageBucket: "plan-b-d83b2.appspot.com",
  messagingSenderId: "435441365762",
  appId: "1:435441365762:web:e167886875515af3bc481b"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ✅ Inicializa auth con persistencia
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

