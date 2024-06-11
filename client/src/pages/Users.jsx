import NavBar from '../components/navigation/Nav';
import { Table, Button, Toggle } from 'react-daisyui';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from 'react';
import { getAxios, validateUnauthorization } from '../utils/AxiosConfig';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { sendErrorNotification, sendSuccessNotification } from '../utils/NotificationUtils';
import FunctionProtected from '../components/FunctionProtected';
import { useOverlay } from '../components/loading/OverlayContext';
import UpdateUserModal from '../components/modals/UpdateUserModal';

const Users = () => {
    const { setOverlayVisible } = useOverlay()

    const [users, setUsers] = useState([])
    
    const [confirmationModalActivated, setConfirmationModalActivated] = useState(false)
    const [updateUserModalActivated, setUpdateUserModalActivated] = useState(false)
    
    const [userToBeDeleted, setUserToBeDeleted] = useState({})
    const [userToBeModified, setUserToBeModified] = useState({})
    
    const handleUserRetrieval = async () => {
        setOverlayVisible(true)
        await getAxios().get(`/user`)
        .then(response => {
            setUsers(response.data) 
            localStorage.setItem('allUsers', JSON.stringify(response.data))
        })
        .catch(error => {
            if (!validateUnauthorization(error)) {
                const errorMessage = "Couldn't retrieve users"
                console.error(errorMessage, error)
                sendErrorNotification(errorMessage)
            }
        })
        .finally(() => setOverlayVisible(false))
    }
    
    const handleDeleteButtonClicked = (user) => {
        setUserToBeDeleted(user)
        setConfirmationModalActivated(true)
    }

    const handleDeleteUser = async () => {
        if (userToBeDeleted.id) {
            setOverlayVisible(true)
            await getAxios().delete(`/user/${userToBeDeleted.id}`)
            .then(() => {
                handleUserRetrieval()
                sendSuccessNotification(`User with id ${userToBeDeleted.id} deleted successfully!`)
            })
            .catch(error => {
                if (!validateUnauthorization(error)) {
                    const errorMessage = `Couldn't delete user with id ${userToBeDeleted.id}`
                    console.error(errorMessage, error)
                    sendErrorNotification(errorMessage)
                }
            })
            .finally(() => setOverlayVisible(false))
        }
    }

    const handleUpdateUserButtonClicked = (user) => {
        setUserToBeModified(user)
        setUpdateUserModalActivated(true)
    }

    const pageStateRef = useRef(null)
    useEffect(() => {
        if (pageStateRef.isFirstPageLoad === undefined) {
            let storedData = JSON.parse(localStorage.getItem('allUsers'))
            if (storedData) setUsers(storedData)
            handleUserRetrieval()
            
            pageStateRef.isFirstPageLoad = false
        }
        // eslint-disable-next-line
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
                                        <span>{user.role.name}</span>
                                        <span>
                                            <Toggle
                                                className={"cursor-default " + (user.isWhitelisted ? "" : "toggleOffError")}
                                                checked={user.isWhitelisted}
                                                color="success"
                                                onChange={() => {}} />
                                        </span>
                                            <div className="text-end min-w-20">
                                                <Button
                                                    shape="square"
                                                    color="ghost"
                                                    size="sm"
                                                    className="me-2 hover:text-warning icon-btn"
                                                    onClick={() => handleUpdateUserButtonClicked(user)}
                                                >
                                                    <Pencil size={20} />
                                                </Button>
                                                <FunctionProtected admin>
                                                    <Button
                                                        shape="square"
                                                        color="ghost"
                                                        size="sm"
                                                        className="hover:text-error icon-btn"
                                                        onClick={() => handleDeleteButtonClicked(user)}
                                                    >
                                                        <Trash size={20} />
                                                    </Button>
                                                </FunctionProtected>
                                            </div>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <UpdateUserModal 
                open={updateUserModalActivated}
                setOpen={setUpdateUserModalActivated} 
                user={userToBeModified}
                setUser={setUserToBeModified}
                userList={users}
                setUserList={setUsers} />
            <ConfirmationModal
                open={confirmationModalActivated}
                setOpen={setConfirmationModalActivated}
                title="Delete User"
                message={`Are you sure you want to delete user ${userToBeDeleted.steamUsername}?`}
                confirmBtnColor="error"
                action={handleDeleteUser}
                confirmationMessage={`User ${userToBeDeleted.steamUsername} deleted successfully!`} />
        </>
    )
}

export default Users