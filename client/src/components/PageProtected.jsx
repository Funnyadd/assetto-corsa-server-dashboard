import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../authentication/AuthContext';

const PageProtected = ({ children, admin = false, manager = false }) => {
    const { user } = useContext(Context)

    let roleNeeded = 3
    if (manager) roleNeeded = 2
    else if (admin) roleNeeded = 1

    if (!user) return <Navigate to="/login" replace />
    else if (user.roleId > roleNeeded) return <Navigate to="/" replace />
    else return children
}

export default PageProtected