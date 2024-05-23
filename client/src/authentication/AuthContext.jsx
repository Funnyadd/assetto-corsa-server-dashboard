import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from "react";
import { getAxios } from '../utils/AxiosConfig';

export const Context = createContext()

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async currentUser => {
            if (currentUser) {
                setUser(currentUser)
                if (!currentUser.roleId) {
                    await getAxios().get(`/user/${currentUser.uid}?uid=true`)
                    .then(user => {
                        currentUser.roleId = user.data.role.id
                        setUser(currentUser)
                    })
                    .catch(() => {
                        setUser(null)
                    })
                }
            }
            else {
                setUser(null)
            }
            setLoading(false)
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