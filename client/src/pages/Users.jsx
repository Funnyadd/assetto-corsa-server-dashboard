import NavBar from '../components/navigation/Nav';
import { Table, Button } from 'react-daisyui';
import { Pencil, Trash } from 'react-bootstrap-icons';

const Users = () => {
    return (
        <>
            <NavBar/>
            <h1 className='text-4xl text-center my-8 font-bold'>Users</h1>
            <div className=' mb-16 flex flex-wrap justify-center'>
                <div className="overflow-x-auto">
                    <Table zebra>
                        <Table.Head>
                            <span />
                            <span>Steam Username</span>
                            <span>Role</span>
                            <span>Whitelisted</span>
                            <span/>
                        </Table.Head>
                        <Table.Body>
                            <Table.Row>
                                <span>1</span>
                                <span>funnyadd</span>
                                <span>Admin</span>
                                <span>Yes</span>
                                <div className="text-end min-w-20">
                                    <Button shape="square" color="ghost" size="sm" className="me-2">
                                        <Pencil size={20} className="text-warning"/>
                                    </Button>
                                    <Button shape="square" color="ghost" size="sm">
                                        <Trash size={20} className="text-error"/>
                                    </Button>
                                </div>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Users