import Axios from 'axios'
import { getAuth } from 'firebase/auth'

const createAxiosInstance = () => {
    const axiosInstance = Axios.create()
    axiosInstance.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL
    axiosInstance.defaults.withCredentials = true
    
    if (getAuth()?.currentUser?.refreshToken) {
        axiosInstance.defaults.headers.common['refreshtoken'] = getAuth().currentUser.refreshToken
    }

    return axiosInstance
}


export default createAxiosInstance