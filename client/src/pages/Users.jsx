import NavBar from '../components/navigation/Nav';
import { Table, Button, Toggle } from 'react-daisyui';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { getAuth } from 'firebase/auth';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { sendErrorNotification } from '../utils/NotificationUtils';

const Users = () => {
    const header = { headers: { refreshtoken: getAuth().currentUser.refreshToken }}
    Axios.defaults.withCredentials = true
    
    const [users, setUsers] = useState([])
    
    const [confirmationModalActivated, setConfirmationModalActivated] = useState(false)
    const [userToBeDeleted, setUserToBeDeleted] = useState({})
    
    const handleUserRetrieval = async () => {
        await Axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/user`, header)
        .then(response => {
            setUsers(response.data) 
            localStorage.setItem('allUsers', JSON.stringify(response.data))
        })
        .catch(error => {
            const errorMessage = "Couldn't retrieve users"
            console.error(errorMessage, error)
            sendErrorNotification(errorMessage)
        })
    }
    
    const handleDeleteButtonClicked = (user) => {
        setUserToBeDeleted(user)
        setConfirmationModalActivated(true)
    }

    const handleDeleteUser = async () => {
        if (userToBeDeleted.id) {
            await Axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/user/${userToBeDeleted.id}`, header)
            .then(() => {
                handleUserRetrieval()
            })
            .catch(error => {
                const errorMessage = `Couldn't delete user with id ${userToBeDeleted.id}`
                console.error(errorMessage, error)
                sendErrorNotification(errorMessage)
            })
        }
    }
    
    const pageStateRef = useRef(null)
    useEffect(() => {
        if (pageStateRef.isFirstPageLoad === undefined) {
            let storedData = JSON.parse(localStorage.getItem('allUsers'))
            if (storedData) {
                setUsers(storedData)
            }
            handleUserRetrieval()
            
            pageStateRef.isFirstPageLoad = false
        }
    }, [])
    
    return (
        <>
            <NavBar/>
            <h1 className='text-4xl text-center my-8 font-bold'>Users</h1>
            <div className='mb-16 flex flex-wrap justify-center'>
                <div className="overflow-x-auto">
                    <Table zebra size="lg" className='static'>
                        <Table.Head>
                            <span>Id</span>
                            <span>Steam Username</span>
                            <span>Email</span>
                            <span>Role</span>
                            <span>Whitelisted</span>
                            <span/>
                        </Table.Head>
                        <Table.Body>
                            {users.map((user, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <span>{user.id}</span>
                                        <span>{user.steamUsername}</span>
                                        <span>{user.email}</span>
                                        <span>{user.role}</span>
                                        <span><Toggle checked={user.isWhitelisted} color="success" /></span>
                                        <div className="text-end min-w-20">
                                            <Button
                                                shape="square"
                                                color="ghost"
                                                size="sm"
                                                className="me-2 hover:text-warning"
                                                disabled>
                                                    <Pencil size={20}/>
                                            </Button>
                                            <Button
                                                shape="square"
                                                color="ghost"
                                                size="sm"
                                                className="hover:text-error"
                                                onClick={() => handleDeleteButtonClicked(user)}>
                                                    <Trash size={20} className=""/>
                                            </Button>
                                        </div>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <ConfirmationModal
                open={confirmationModalActivated}
                setOpen={setConfirmationModalActivated}
                message={`Are you sure you want to delete user ${userToBeDeleted.steamUsername}?`}
                action={handleDeleteUser}
                confirmationMessage={`User ${userToBeDeleted.steamUsername} deleted successfully!`} />
        </>
    )
}

export default Users