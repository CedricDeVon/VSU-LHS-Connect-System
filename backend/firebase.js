/*import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NUXT_PUBLIC_API_KEY,
    authDomain: process.env.NUXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NUXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NUXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NUXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NUXT_PUBLIC_APP_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };*/