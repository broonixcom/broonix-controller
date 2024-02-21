import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_BROONIX_API_KEY,
  authDomain: import.meta.env.VITE_BROONIX_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_BROONIX_PROJECT_ID,
  storageBucket: import.meta.env.VITE_BROONIX_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_BROONIX_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_BROONIX_APP_ID,
  measurementId: import.meta.env.VITE_BROONIX_MEASUREMENT_ID,
}

const firebaseApp = initializeApp(firebaseConfig)
const firebaseDB = getFirestore(firebaseApp)
const firebaseAnalytics = getAnalytics(firebaseApp)

export { firebaseApp, firebaseDB, firebaseAnalytics }
