import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
            setLoading(false)
            if (currentUser) setUser(currentUser)
            else { setUser(null) }
        });

        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [])

    const values = {
        user: user,
        setUser: setUser
    }

    return (
        <Context.Provider value={values}>
            {!loading && children}
        </Context.Provider>
    )
}