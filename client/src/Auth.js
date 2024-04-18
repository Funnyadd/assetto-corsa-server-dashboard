import { initializeApp } from 'firebase/app'
import Axios from 'axios'
import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

initializeApp(firebaseConfig)

const auth = getAuth()

Axios.defaults.withCredentials = true

export const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
        console.error(error)
    })
}

export const logout = async () => {
    return await signOut(auth)
    .catch((error) => {
        throw error
    })
}

export const signup = async (email, password, steamUsername) => {
    // return await createUserWithEmailAndPassword(auth, email, password)
    // .then(currentUser => {
        // Add user to own databse after signup with steamUsername and roleCode :D
        // console.log(currentUser.user)
        const data = {
            email: email,
            password: password,
            steamUsername: steamUsername
        }

        Axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/add`, data)
        .catch(error => {
            throw error
        })
    // })
    // .catch((error) => {
    //     throw error
    // })
}

export const forgotPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email)
    .catch((error) => {
        throw error
    })
}

// Is this useful? Could maybe be deleted...
export const deleteAccount = async () => {
    const user = auth.currentUser

    await deleteUser(user)
    // .then can be deleted or modified in the future for better feedback
    .then(deletedUser => {
        console.log("deleted user successfully : " + deletedUser)
    })
    .catch(error => {
        console.error(error)
    })
}
