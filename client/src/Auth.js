import { initializeApp } from 'firebase/app';
import { deleteUser, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

initializeApp(firebaseConfig);

const auth = getAuth();

export const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
        console.log(error);
    });
}

export const logout = async () => {
    await signOut(auth)
    .catch((error) => {
        console.error(error);
    });
}

export const deleteAccount = async () => {
    const user = auth.currentUser;

    await deleteUser(user)
    .catch((error) => {
        console.error(error);
    });
}
