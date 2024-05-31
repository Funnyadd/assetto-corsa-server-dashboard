import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../authentication/AuthContext';
import { getRoleNeeded } from '../utils/RoleUtils';

const PageProtected = ({ children, admin = false, manager = false }) => {
    const { user } = useContext(Context)
    if (!user) return <Navigate to="/login" replace />
    else if (user.roleId > getRoleNeeded(manager, admin)) return <Navigate to="/" replace />
    else return children
}

export default PageProtected