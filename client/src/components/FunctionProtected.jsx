import { useContext } from 'react';
import { Context } from '../authentication/AuthContext';
import { getRoleNeeded } from '../utils/roleUtils';

const FunctionProtected = ({ children, admin = false, manager = false }) => {
    const { user } = useContext(Context)
    
    if (!user.roleId || user.roleId > getRoleNeeded(manager, admin)) return <></>
    else return children
}

export default FunctionProtected