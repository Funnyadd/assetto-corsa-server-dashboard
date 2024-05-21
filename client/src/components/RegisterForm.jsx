import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback'
import { useState } from 'react';
import { Button, Input, Collapse } from 'react-daisyui';
import { signup } from '../authentication/Auth';
import { sendErrorNotification } from '../utils/NotificationUtils';

const RegisterForm = ({ registrationHandler }) => {
    const enterKeyCode = 13

    const emailAlreadyInUseErrorCode = "auth/email-already-in-use"
    const internalErrorCode = "auth/invalid-credential"
    const tooManyRequestsErrorCode = "auth/too-many-requests"

    const emailAlreadyInUseErrorMessage = "An account already exists with this email, please login"
    const internalErrorMessage = "Error while trying to call the server. Please try again later"
    const tooManyRequestsErrorMessage = "Access to your account temporarily deactivated due to the amount of failed connection tries. Please try again later."
    const unexpectedErrorMessage = "Unexpected server error..."

    const [email, setEmail] = useState("")
    const [steamId, setSteamId] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [emailInvalid, setEmailInvalid] = useState(false)
    const [steamIdInvalid, setSteamIdInvalid] = useState(false)
    const [passwordInvalid, setPasswordInvalid] = useState(false)
    const [confirmationPasswordInvalid, setConfirmationPasswordInvalid] = useState(false)

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
        setSteamIdInvalid(false)
        setPasswordInvalid(false)
        setConfirmationPasswordInvalid(false)

        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
            setEmailInvalid(true)
            isValid = false;
        }
        if (steamId === "") {
            setSteamIdInvalid(true)
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
        setSteamId("")
        setPassword("")
        setPasswordConfirmation("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (checkFormValidity() === false) {
            event.stopPropagation()
        }
        else {
            await signup(email, password, steamId)
            .then(() => {
                registrationHandler()
                clearRegisterForm()
            })
            .catch((error) => {
                event.stopPropagation()
                
                if (error.response.data.error.status === 404) {
                    sendErrorNotification(error.response.data.error.message)
                }
                else {
                    switch(error.code) {
                        case emailAlreadyInUseErrorCode:
                            sendErrorNotification(emailAlreadyInUseErrorMessage)
                            break
                        case internalErrorCode:
                            sendErrorNotification(internalErrorMessage)
                            break
                        case tooManyRequestsErrorCode:
                            sendErrorNotification(tooManyRequestsErrorMessage)
                            break
                        default:
                            sendErrorNotification(unexpectedErrorMessage)
                    }
                }
            })
        }
    }

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label bsPrefix="mb-2" htmlFor="registerEmailInput">Email</Form.Label>
                <Form.Control
                    id="registerEmailInput"
                    bsPrefix='w-full text-lg'
                    as={Input}
                    borderOffset={false}
                    bordered
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={emailInvalid && validated}
                    required />
                <Feedback type="invalid" className='text-error'>
                    Please enter a valid email address
                </Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="registerSteamIdInput">Steam ID</Form.Label>
                <Form.Control
                    id="registerSteamIdInput"
                    bsPrefix='w-full text-lg'
                    as={Input}
                    borderOffset={false}
                    bordered
                    type="text"
                    value={steamId}
                    onChange={(e) => setSteamId(e.target.value)}
                    isInvalid={steamIdInvalid && validated}
                    required />
                <Feedback type="invalid" className='text-error'>
                    Please enter a valid steam ID
                </Feedback>
                <Collapse className=' mt-2 text-xs bg-base-200'>
                    <Collapse.Title className="p-2 min-h-1 text-sm font-medium w-auto">
                        Having trouble finding your Steam ID?
                    </Collapse.Title>
                    <Collapse.Content>
                        To <strong>view</strong> your Steam ID:<br/>
                            <br/>
                            &emsp;• In Steam, select your Steam username in the top right corner.<br/>
                            &emsp;• Select "Account details".<br/>
                            &emsp;• Your Steam ID can be found below your Steam username.
                    </Collapse.Content>
                </Collapse>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="registerPasswordInput">Password</Form.Label>
                <Form.Control
                    id="registerPasswordInput"
                    bsPrefix='w-full text-lg'
                    as={Input}
                    borderOffset={false}
                    bordered
                    type="password"
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

            <Form.Group className="mb-3">
            <Form.Label htmlFor="registerPasswordConfirmationInput">Password Confirmation</Form.Label>
                <Form.Control
                    id="registerPasswordConfirmationInput"
                    bsPrefix='w-full text-lg'
                    as={Input}
                    borderOffset={false}
                    bordered
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    onKeyDown={handleSubmitOnEnterKeyPressed}
                    isInvalid={confirmationPasswordInvalid && validated}
                    required />
                <Feedback type="invalid" className='text-error'>
                    Passwords do not match
                </Feedback>
            </Form.Group>

            <div className='text-center'>
                <Button
                    id="RegisterFormSubmitBtn"
                    className="my-3 font-bold text-lg"
                    color="success"
                    wide
                    type="submit">
                        Sign Up
                </Button>
            </div>
            
        </Form>
    )
}

export default RegisterForm