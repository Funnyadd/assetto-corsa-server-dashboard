import Axios from 'axios'
import { getAuth } from 'firebase/auth'
import { logout } from '../authentication/Auth'

export const getAxios = () => {
    const axiosInstance = getAxiosNoAuth()
    
    if (getAuth()?.currentUser?.refreshToken) {
        axiosInstance.defaults.headers.common['refreshtoken'] = getAuth().currentUser.refreshToken
    }

    return axiosInstance
}

export const getAxiosNoAuth = () => {
    const axiosInstance = Axios.create()
    axiosInstance.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL
    axiosInstance.defaults.withCredentials = true

    return axiosInstance
}

export const validateUnauthorization = (error) => {
    if (error.response.status === 401) {
        logout()
        window.location.replace('/login?session=expired')
        return true
    }
    return false
}