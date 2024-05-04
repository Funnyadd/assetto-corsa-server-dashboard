import NavBar from '../components/navigation/Nav';
import { Table, Button } from 'react-daisyui';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import Axios from 'axios'

const Users = () => {
    Axios.defaults.withCredentials = false
    
    const [users, setUsers] = useState([]);

    const handleUserRetrieval = async () => {
        await Axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/user`)
        .then(response => {
            setUsers(response.data) 
        })
        .catch(error => {
            // Maybe add notification or other type of feedback
            // for the user to know what error happenned.
            console.error("Couldn't retrieve users", error)
        })
    }

    const handleDeleteUser = async (userId) => {
        await Axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/user/${userId}`)
        .then(() => {
            handleUserRetrieval()
        })
        .catch(error => {
            // Maybe add notification or other type of feedback
            // for the user to know what error happenned.
            console.error(`Couldn't delete user with id ${userId}`, error)
        })
    }

    useEffect(() => {
        handleUserRetrieval()
    }, [])

    return (
        <>
            <NavBar/>
            <h1 className='text-4xl text-center my-8 font-bold'>Users</h1>
            <div className=' mb-16 flex flex-wrap justify-center'>
                <div className="overflow-x-auto">
                    <Table zebra size="lg">
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
                                        {/* Change the whitelist thing for a toggle */}
                                        <span>{user.isWhitelisted ? "Yes" : "No"}</span>
                                        <div className="text-end min-w-20">
                                            <Button
                                                shape="square"
                                                color="ghost"
                                                size="sm"
                                                className="me-2 hover:text-warning">
                                                    <Pencil size={20}/>
                                            </Button>
                                            <Button
                                                shape="square"
                                                color="ghost"
                                                size="sm"
                                                className="hover:text-error"
                                                onClick={() => handleDeleteUser(user.id)}>
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
        </>
    )
}

export default Users