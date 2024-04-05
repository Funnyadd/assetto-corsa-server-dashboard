import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { logout } from '../Auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
    const navigate = useNavigate()

    // Change username by steamusername (get it from the db)
    const [username, setUsername] = useState("username")

    const handleLoggingOut = async () => {
        console.log("yo what")
        await logout()
        .then(() => {
            navigate("/login?loggedOut")
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return (
        <Navbar className='navBar'>
            <Container>
                <Navbar.Brand 
                    className="text-danger" 
                    href="#">
                        Assetto Corsa Sserver Dashboard
                </Navbar.Brand>
                <Dropdown as={NavItem} className='flex'>
                    <span className='text-secondary'>Logged in as:</span>
                    <DropdownToggle 
                        as={NavLink} 
                        id='navUsernameToggle'
                        className='text-white ps-1'>
                            {username}
                    </DropdownToggle>
                    <DropdownMenu className='navDropdown'>
                        <DropdownItem 
                            className='text-danger navDropdownItem'
                            onClick={handleLoggingOut}>
                                Sign out
                            </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Container>
        </Navbar>
    )
}

export default NavBar