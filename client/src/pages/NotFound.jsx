import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="text-center py-5">
            <h1>Oups! It seems that you got lost.</h1>
            <p>Here are links to existing pages</p>
            <Link to="/Login">Login</Link>
            <br />
            <Link to="/forgotPassword">Forgot Password</Link>
            <br />
            <Link to="/">Home</Link>
            <br />
            <Link to="/users">Users</Link>
        </div>
    )
}

export default NotFound