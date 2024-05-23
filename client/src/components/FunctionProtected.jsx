import { useContext } from 'react';
import { Context } from '../authentication/AuthContext';

const FunctionProtected = ({ children, admin = false, manager = false }) => {
    const { user } = useContext(Context)

    let roleNeeded = 3
    if (manager) roleNeeded = 2
    else if (admin) roleNeeded = 1
    
    if (!user.roleId || user.roleId > roleNeeded) return <></>
    else return children
}

export default FunctionProtected