import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from "react";
import { getAxios, validateUnauthorization } from '../utils/AxiosConfig';
import { useOverlay } from '../components/loading/OverlayContext';

export const Context = createContext()

export const AuthContext = ({ children }) => {
    const { setOverlayVisible } = useOverlay()

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async currentUser => {
            if (currentUser) {
                setUser(currentUser)
                if (!currentUser.roleId) {
                    setOverlayVisible(true)
                    await getAxios().get(`/user/${currentUser.uid}?uid=true`)
                    .then(user => {
                        currentUser.roleId = user.data.role.id
                        setUser(currentUser)
                    })
                    .catch((error) => {
                        validateUnauthorization(error)
                        setUser(null)
                    })
                    .finally(() => setOverlayVisible(false))
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
    }, [setOverlayVisible])

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