import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from "react";
import { getAxios } from '../utils/AxiosConfig';

export const Context = createContext()

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), currentUser => {
            if (currentUser) {
                if (!currentUser.roleId) {
                    getAxios().get(`/user/${currentUser.uid}?uid=true`)
                    .then(user => {
                        currentUser.roleId = user.data.role.id
                        setUser(currentUser)
                        setLoading(false)
                    })
                    .catch(() => {
                        setUser(null)
                    })
                }
                else {
                    setUser(currentUser)
                    setLoading(false)
                }
            }
            else setUser(null)
        })

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