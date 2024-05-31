import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Button, Collapse } from 'react-daisyui';
import { signup } from '../authentication/Auth';
import { sendErrorNotification } from '../utils/NotificationUtils';
import FormInput from './FormInput';

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

        if (!checkFormValidity()) {
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
                <FormInput
                    id="registerEmailInput"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    isInvalid={emailInvalid && validated}
                    feedbackMessage="Please enter a valid email address" 
                    required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="registerSteamIdInput">Steam ID</Form.Label>
                <FormInput
                    id="registerSteamIdInput"
                    type="text"
                    value={steamId}
                    setValue={setSteamId}
                    isInvalid={steamIdInvalid && validated}
                    feedbackMessage="Please enter a valid steam ID" 
                    required />
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
                <FormInput
                    id="registerPasswordInput"
                    type="password"
                    value={password}
                    setValue={setPassword}
                    isInvalid={passwordInvalid && validated}
                    feedbackMessage="Please enter a valid password containing at least&nbsp;:
                                    <br/>8&nbsp;characters, 
                                    1&nbsp;numeric&nbsp;value, 
                                    1&nbsp;lower&nbsp;case&nbsp;letter 
                                    and&nbsp;1&nbsp;upper&nbsp;case&nbsp;letter" 
                    required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="registerPasswordConfirmationInput">Password Confirmation</Form.Label>
                <FormInput
                    id="registerPasswordConfirmationInput"
                    type="password"
                    value={passwordConfirmation}
                    setValue={setPasswordConfirmation}
                    onKeyDownFunction={handleSubmitOnEnterKeyPressed}
                    isInvalid={confirmationPasswordInvalid && validated}
                    feedbackMessage="Passwords do not match" 
                    required />
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