import { useEffect, useState } from 'react';
import { Eye, EyeSlashFill } from "react-bootstrap-icons";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { login } from '../Auth';
import RegisterModal from '../components/modals/RegisterModal';

const LoginForm = () => {
    const eyeIconSize = 22;
    const enterKeyCode = 13;

    const navigate = useNavigate();

    const invalidCredentialsErrorCode = "auth/invalid-credential";
    const internalErrorCode = "auth/invalid-credential";
    const tooManyRequestsErrorCode = "auth/too-many-requests";

    const invalidCredentialsErrorMessage = "Invalid email or password";
    const internalErrorMessage = "Error while trying to call the server. Please try again later";
    const tooManyRequestsErrorMessage = "Acces to your account temporarily deactivated due to the amount of failed connection tries. Please try again later.";
    const unexpectedErrorMessage = "Unexpected server error...";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const [validationError, setValidationError] = useState(false);

    const [createModalActivated, setCreateModalActivated] = useState(false);

    const showHide = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setShowPass(!showPass);
    }

    const handleSubmitOnEnterKeyPressed = (event) => {
        if (event.keyCode === enterKeyCode || event.which === enterKeyCode) {
            handleSubmit(event);
        }
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            setError("");
            event.preventDefault();

            await login(email, password)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                switch(error.code) {
                    case invalidCredentialsErrorCode:
                        setError(invalidCredentialsErrorMessage);
                    case internalErrorCode:
                        setError(internalErrorMessage);
                    case tooManyRequestsErrorCode:
                        setError(tooManyRequestsErrorMessage);
                    default:
                        setError(unexpectedErrorMessage);
                }
            });
        }
    }

    useEffect(() => {
        if (error !== "" && !validationError) {
            setValidationError(true);
            setValidated(false);
        }
        else if (validationError) {
            setValidated(true);
            setValidationError(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center my-5" >
                <h1 className='text-center text-danger mt-5'>Assetto Corsa Server Dashboard</h1>
                <Card border="black" className="p-3 my-5 shadow loginFormCard w-100">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {
                            error.length > 0
                            ?
                            <Alert variant="danger">
                                {error}
                            </Alert> 
                            :
                            <></>
                        }

                        <Form.Group className="mb-3" controlId="loginFormEmail">
                            <Form.Control 
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email address
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 inputWithShowHide" controlId="loginFormPassword">
                            <Form.Control
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleSubmitOnEnterKeyPressed}
                                required />
                            <button 
                                aria-label="showHidePasswordButton" 
                                className="showHideButton" 
                                onClick={showHide}>
                                    {
                                        showPass 
                                        ? <EyeSlashFill size={eyeIconSize} /> 
                                        : <Eye size={eyeIconSize} />
                                    }
                            </button>
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid password
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            id="loginFormSubmitBtn"
                            className="w-100 mt-2 fs-5 fw-bold"
                            type="submit">
                                Sign In
                        </Button>

                        <p className='text-center my-4'>
                            <a href="/Register" className='text-decoration-none'>Forgot password?</a>
                        </p>

                        <hr id='loginFormLine'/>

                        <div className='d-flex justify-content-center'>
                            <Button
                                id="createAccountButn"
                                className="my-3 fs-5 fw-bold align-center"
                                variant="success"
                                onClick={() => { setCreateModalActivated(true) }} >
                                    Create new account
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
            <RegisterModal 
                open={createModalActivated}
                setOpen={setCreateModalActivated} />
        </>
    );
}

export default LoginForm;