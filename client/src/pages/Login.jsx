import { useEffect, useState } from 'react';
import { Eye, EyeSlashFill } from "react-bootstrap-icons";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { login } from '../authentication/Auth';
import RegisterModal from '../components/modals/RegisterModal';
import { useSearchParams } from 'react-router-dom';
import { Button, Link, Divider } from 'react-daisyui';
import { sendErrorNotification } from '../utils/NotificationUtils';
import FormInput from '../components/FormInput';

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

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)

    const [validated, setValidated] = useState(false)

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

        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            setValidated(true)
        }
        else {
            event.preventDefault()

            await login(email, password)
            .then(() => {
                navigate("/")
            })
            .catch((error) => {
                switch(error.code) {
                    case invalidCredentialsErrorCode:
                        sendErrorNotification(invalidCredentialsErrorMessage)
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
            })
        }
    }

    useEffect(() => {
        if (queryParameters.has("forgotPasswordConfirmation")) {
            setEmail(queryParameters.get("forgotPasswordConfirmation"))
            setQueryParameters("")
        }
    }, [queryParameters, setQueryParameters])

    return (
        <>
            <div className="flex flex-col items-center my-[3rem]" >
                <h1 className='mt-[3rem] text-4xl text-center'>Assetto Corsa Server Dashboard</h1>
                <Card className="p-4 my-[3rem] shadow w-full bg-base-300 max-w-[27rem]">
                    <Form className='text-center' noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <FormInput
                                id="loginFormEmailInput"
                                type="email"
                                placeholder="Email"
                                value={email}
                                setValue={setEmail}
                                feedbackMessage="Please enter a valid email address" 
                                required />
                        </Form.Group>

                        <Form.Group className="mb-4 inputWithShowHide">
                            <FormInput
                                id="loginFormPasswordInput"
                                bsPrefix='pe-[2.75rem]'
                                type={showPass ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                setValue={setPassword}
                                onKeyDown={handleSubmitOnEnterKeyPressed}
                                feedbackMessage="Please enter a valid password" 
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
                setOpen={setCreateModalActivated} />
        </>
    )
}

export default LoginForm