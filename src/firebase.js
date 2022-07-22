import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const apiKey = import.meta.env.VITE_APP_API_KEY
const authDomain = import.meta.env.VITE_APP_AUTH_DOMAIN
const projectId = import.meta.env.VITE_APP_PROJECT_ID
const storageBucket = import.meta.env.VITE_APP_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_APP_MESSAGING_SENDER_ID
const appId = import.meta.env.VITE_APP_APP_ID
const measurementId = import.meta.env.VITE_APP_MEASUREMENT_ID

const config = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
}

export const app = initializeApp(config)
export const db = getFirestore()

export const auth = getAuth()
export const googleProvider = new GoogleAuthProvider()

export const googleSignIn = {
    auth,
    googleProvider,
}
