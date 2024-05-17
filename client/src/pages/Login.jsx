import { useEffect, useState } from 'react';
import { Eye, EyeSlashFill } from "react-bootstrap-icons";
import Feedback from 'react-bootstrap/Feedback';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { login } from '../authentication/Auth';
import RegisterModal from '../components/modals/RegisterModal';
import { useSearchParams } from 'react-router-dom';
import { Button, Input, Alert, Link, Divider } from 'react-daisyui';

const LoginForm = () => {
    const eyeIconSize = 22
    const enterKeyCode = 13

    const navigate = useNavigate()
    const [queryParameters, setQueryParameters] = useSearchParams()

    const invalidCredentialsErrorCode = "auth/invalid-credential"
    const internalErrorCode = "auth/internal-error"
    const tooManyRequestsErrorCode = "auth/too-many-requests"

    const invalidCredentialsErrorMessage = "Invalid email or password"
    const internalErrorMessage = "Error while trying to call the server. Please try again later"
    const tooManyRequestsErrorMessage = "Access to your account temporarily deactivated due to the amount of failed connection tries. Please try again later."
    const unexpectedErrorMessage = "Unexpected server error..."

    const forgotPasswordConfirmationMessage = "An email was sent to you to reset your password."
    const loggedOutConfirmationMessage = "You have successfully logged out!"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)

    const [validated, setValidated] = useState(false)
    const [error, setError] = useState("")
    const [validationError, setValidationError] = useState(false)
    const [confirmationAlert, setConfirmationAlert] = useState("")
    const [informationAlert, setInformationAlert] = useState("");

    const [createModalActivated, setCreateModalActivated] = useState(false)

    const showHide = (event) => {
        event.preventDefault()
        event.stopPropagation()

        setShowPass(!showPass)
    }

    const handleSubmitOnEnterKeyPressed = (event) => {
        if (event.keyCode === enterKeyCode || event.which === enterKeyCode) {
            handleSubmit(event)
        }
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            setValidated(true)
        }
        else {
            setError("")
            event.preventDefault()

            await login(email, password)
            .then(() => {
                navigate("/")
            })
            .catch((error) => {
                switch(error.code) {
                    case invalidCredentialsErrorCode:
                        setError(invalidCredentialsErrorMessage)
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
            })
        }
    }

    useEffect(() => {
        if (queryParameters.has("forgotPasswordConfirmation")) {
            setInformationAlert(forgotPasswordConfirmationMessage)
            setError("")
            setConfirmationAlert("")
            setEmail(queryParameters.get("forgotPasswordConfirmation"))
            setQueryParameters("")
        }

        if (queryParameters.has("loggedOut")) {
            setConfirmationAlert(loggedOutConfirmationMessage)
            setError("")
            setInformationAlert("")
            setQueryParameters("")
        }
    }, [queryParameters, setQueryParameters])

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
        <>
            <div className="flex flex-col items-center my-[3rem]" >
                <h1 className='mt-[3rem] text-4xl text-center'>Assetto Corsa Server Dashboard</h1>
                <Card className="p-4 my-[3rem] shadow w-full bg-base-300 max-w-[27rem]">
                    <Form className='text-center' noValidate validated={validated} onSubmit={handleSubmit}>
                        {
                            error.length > 0
                            ?
                            <Alert status="error" className="mb-4">
                                {/* Error icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error}</span>
                            </Alert> 
                            :
                            <></>
                        }
                        {
                            confirmationAlert.length > 0
                            ?
                            <Alert status="success" className="mb-3">
                                {/* Confirmmation icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{confirmationAlert}</span>
                            </Alert>
                            :
                            <></>
                        }
                        {
                            informationAlert.length > 0
                            ?
                            <Alert status="info" className="mb-3">
                                {/* Information icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{informationAlert}</span>
                            </Alert>
                            :
                            <></>
                        }
                        <Form.Group className="mb-4" controlId="loginFormEmail">
                            <Form.Control 
                                bsPrefix='w-full text-lg'
                                as={Input}
                                borderOffset={false}
                                bordered
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <Feedback type='invalid' className='text-error'>
                                Please enter a valid email address
                            </Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4 inputWithShowHide" controlId="loginFormPassword">
                            <Form.Control
                                bsPrefix='w-full text-lg pe-[2.75rem]'
                                as={Input}
                                borderOffset={false}
                                bordered
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
                            <Feedback type='invalid' className='text-error'>
                                Please enter a valid password
                            </Feedback>
                        </Form.Group>

                        <Button
                            className="mt-3 text-lg font-bold"
                            color="primary"
                            fullWidth
                            type="submit">
                                Sign In
                        </Button>

                        <div className='mt-5'>
                            <Link href={"/forgotPassword" + (email.length > 0 ? "?email=" + email : "")}>
                                Forgot password?
                            </Link>
                        </div>

                        <Divider/>

                        <Button
                            className="mb-4 text-lg font-bold align-center"
                            color="secondary"
                            type="button"
                            onClick={() => { setCreateModalActivated(true) }} >
                                Create new account
                        </Button>
                    </Form>
                </Card>
            </div>
            <RegisterModal 
                open={createModalActivated}
                setOpen={setCreateModalActivated}
                setConfirmationAlert={setConfirmationAlert} />
        </>
    )
}

export default LoginForm