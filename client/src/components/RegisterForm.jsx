import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback'
import { useEffect, useState } from 'react';
import { Button, Alert, Input } from 'react-daisyui';
import { signup } from '../authentication/Auth';

const RegisterForm = ({ registrationHandler }) => {
    const enterKeyCode = 13;

    const emailAlreadyInUseErrorCode = "auth/email-already-in-use"
    const internalErrorCode = "auth/invalid-credential"
    const tooManyRequestsErrorCode = "auth/too-many-requests"

    const emailAlreadyInUseErrorMessage = "An account already exists with this email, please login"
    const internalErrorMessage = "Error while trying to call the server. Please try again later"
    const tooManyRequestsErrorMessage = "Access to your account temporarily deactivated due to the amount of failed connection tries. Please try again later."
    const unexpectedErrorMessage = "Unexpected server error..."

    const [email, setEmail] = useState("")
    const [steamUsername, setSteamUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [emailInvalid, setEmailInvalid] = useState(false)
    const [steamUsernameInvalid, setSteamUsernameInvalid] = useState(false)
    const [passwordInvalid, setPasswordInvalid] = useState(false)
    const [confirmationPasswordInvalid, setConfirmationPasswordInvalid] = useState(false)

    const [error, setError] = useState("")
    const [validationError, setValidationError] = useState(false)
    const [validated, setValidated] = useState(false)

    const handleSubmitOnEnterKeyPressed = (event) => {
        if (event.keyCode === enterKeyCode || event.which === enterKeyCode) {
            handleSubmit(event)
        }
    }

    const checkFormValidity = () => {
        setValidated(true)
        let isValid = true

        setEmailInvalid(false)
        setSteamUsernameInvalid(false)
        setPasswordInvalid(false)
        setConfirmationPasswordInvalid(false)

        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
            setEmailInvalid(true)
            isValid = false;
        }
        if (steamUsername === "") {
            setSteamUsernameInvalid(true)
            isValid = false
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            setPasswordInvalid(true)
            isValid = false
        }
        if (password !== passwordConfirmation) {
            setConfirmationPasswordInvalid(true)
            isValid = false
        }

        return isValid
    }

    const clearRegisterForm = () => {
        setEmail("")
        setSteamUsername("")
        setPassword("")
        setPasswordConfirmation("")
    }

    const handleSubmit = async (event) => {
        if (checkFormValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            setError("")
            event.preventDefault()
            clearRegisterForm()

            await signup(email, password, steamUsername)
            .then(() => {
                registrationHandler()
            })
            .catch((error) => {
                // Add more errors from firebase :D ???
                // Maybe just add a verification to see if the steam username is valid ???
                switch(error.code) {
                    case emailAlreadyInUseErrorCode:
                        setError(emailAlreadyInUseErrorMessage)
                        break
                    case internalErrorCode:
                        setError(internalErrorMessage)
                        break
                    case tooManyRequestsErrorCode:
                        setError(tooManyRequestsErrorMessage)
                        break
                    default:
                        setError(unexpectedErrorMessage)
                }
            });
        }
    }

    useEffect(() => {
        if (error !== "" && !validationError) {
            setValidationError(true)
        }
        else if (validationError) {
            setValidationError(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return (
        <Form noValidate onSubmit={handleSubmit} className='text-center'>
            {
                error.length > 0
                ?
                <Alert status="error" className="mb-3">
                    {error}
                </Alert> 
                :
                <></>
            }

            <Form.Group className="mb-3" controlId="registerFormEmail">
                <Form.Control
                    bsPrefix='w-full text-lg'
                    as={Input}
                    borderOffset={false}
                    bordered
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={emailInvalid && validated}
                    required />
                <Feedback type="invalid" className='text-error'>
                    Please enter a valid email address
                </Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerFormSteamUsername">
                <Form.Control
                    bsPrefix='w-full text-lg'
                    as={Input}
                    borderOffset={false}
                    bordered
                    type="text"
                    placeholder="Steam username"
                    value={steamUsername}
                    onChange={(e) => setSteamUsername(e.target.value)}
                    isInvalid={steamUsernameInvalid && validated}
                    required />
                <Feedback type="invalid" className='text-error'>
                    Please enter a valid steam username
                </Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerFormPassword">
                <Form.Control
                    bsPrefix='w-full text-lg'
                    as={Input}
                    borderOffset={false}
                    bordered
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={passwordInvalid && validated}
                    required />
                <Feedback type="invalid" className='text-error'>
                    Please enter a valid password containing at least :
                    <br/>8 characters, 1 numeric value, 
                    <br/>1 lower case letter and 1 upper case letter
                </Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerFormPasswordConfirmation">
                <Form.Control
                    bsPrefix='w-full text-lg'
                    as={Input}
                    borderOffset={false}
                    bordered
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    onKeyDown={handleSubmitOnEnterKeyPressed}
                    isInvalid={confirmationPasswordInvalid && validated}
                    required />
                <Feedback type="invalid" className='text-error'>
                    Passwords do not match
                </Feedback>
            </Form.Group>

            <Button
                id="RegisterFormSubmitBtn"
                className="my-3 font-bold text-lg"
                color="success"
                wide
                type="submit">
                    Sign Up
            </Button>
        </Form>
    )
}

export default RegisterForm