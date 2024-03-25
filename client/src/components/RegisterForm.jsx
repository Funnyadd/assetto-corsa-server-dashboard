import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { login } from '../Auth';
import { useForm } from "react-hook-form";

const RegisterForm = () => {
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
    const [steamUsername, setSteamUsername] = useState("");
    const [roleCode, setRoleCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [error, setError] = useState("");
    const [validationError, setValidationError] = useState(false);
    const [validated, setValidated] = useState(false);

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
                if (error.code === invalidCredentialsErrorCode) {
                    setError(invalidCredentialsErrorMessage);
                }
                else if (error.code === internalErrorCode) {
                    setError(internalErrorMessage);
                }
                else if (error.code === tooManyRequestsErrorCode) {
                    setError(tooManyRequestsErrorMessage);
                }
                else {
                    setError(unexpectedErrorMessage);
                }
            });
        }
    }

    useEffect(() => {
        if (error !== "" && !validationError) {
            setValidationError(true);
            setValidated(true);
        }
        else if (validationError) {
            setValidationError(false);
            setValidated(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
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

            <Form.Group className="mb-3" controlId="registerFormEmail">
                <Form.Control 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && validated}
                    required />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid email address
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 inputWithShowHide" controlId="registerFormSteamUsername">
                <Form.Control
                    type="text"
                    placeholder="Steam username"
                    value={steamUsername}
                    onChange={(e) => setSteamUsername(e.target.value)}
                    isInvalid={steamUsername === "" && validated}
                    required />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid steam username
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 inputWithShowHide" controlId="registerFormRoleCode">
                <Form.Control
                    type="text"
                    placeholder="Code for role (Optional)"
                    value={roleCode}
                    onChange={(e) => setRoleCode(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3 inputWithShowHide" controlId="registerFormPassword">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={(password.length < 8 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(password)) && validated}
                    required />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid password containing at least :
                    <br/>8 characters, 1 numeric value, 
                    <br/>1 lower case letter and 1 upper case letter
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 inputWithShowHide" controlId="registerFormPasswordConfirmation">
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    onKeyDown={handleSubmitOnEnterKeyPressed}
                    isInvalid={password !== passwordConfirmation && validated}
                    required />
                <Form.Control.Feedback type="invalid">
                    Passwords do not match
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                id="RegisterFormSubmitBtn"
                className="my-2 px-4 fs-5 fw-bold"
                variant="success"
                type="submit">
                    Sign Up
            </Button>
        </Form>
    )
}

export default RegisterForm