import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-daisyui';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../authentication/Auth';
import { useSearchParams } from 'react-router-dom';
import { sendErrorNotification, sendNotification } from '../utils/NotificationUtils';
import FormInput from '../components/FormInput';

const ForgotPassword = () => {
    const enterKeyCode = 13

    const forgotPasswordConfirmationMessage = "An email was sent to you to reset your password."

    const defaultErrorMessage = "An error occurred while trying to send the email. Please try again later."
    const tooManyRequestsErrorCode = "auth/too-many-requests"
    const tooManyRequestsErrorMessage = "You have done too many requests for this user. Please try again later."

    const navigate = useNavigate()
    const [queryParameters, setQueryParameters] = useSearchParams()

    const [email, setEmail] = useState("")
    const [validated, setValidated] = useState(false)

    const handleSubmitOnEnterKeyPressed = (event) => {
        if (event.keyCode === enterKeyCode || event.which === enterKeyCode) {
            handleSubmit(event)
        }
    }

    const handleCancelButton = () => navigate("/login")

    const handleSubmit = async (event) => {
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            setValidated(true)
        }
        else {
            event.preventDefault()

            await forgotPassword(email)
            .then(() => {
                sendNotification(forgotPasswordConfirmationMessage)
                navigate("/login?forgotPasswordConfirmation=" + email)
            })
            .catch((error) => {
                if (error.code === tooManyRequestsErrorCode) {
                    sendErrorNotification(tooManyRequestsErrorMessage)
                }
                else {
                    sendErrorNotification(defaultErrorMessage)
                }
            })
        }
    }

    useEffect(() => {
        if (queryParameters.has("email")) {
            setEmail(queryParameters.get("email"))
            setQueryParameters("")
        }
    }, [queryParameters, setQueryParameters])

    return (
        <div className="flex flex-col items-center my-8 px-3">
            <Card className="m-8 shadow max-w-[32rem] bg-base-300 w-full">
                <Form noValidate validated={validated} onSubmit={handleSubmit} className='divide-y divide-solid divide-neutral'>
                    <Card.Header className="forgotPasswordFormHeader p-4 ps-8">
                        <h4 className='text-2xl'>Forgot your Password?</h4>
                    </Card.Header>
                    <Card.Body>
                        <p className="mb-4">Please enter your email to received a password reset link.</p>
                        <Form.Group className="mb-3" controlId="forgotPasswordEmail">
                            <FormInput
                                id="forgotPasswordEmailInput"
                                type="email"
                                placeholder="Email"
                                value={email}
                                setValue={setEmail}
                                onKeyDown={handleSubmitOnEnterKeyPressed}
                                feedbackMessage="Please enter a valid email address" 
                                required />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="p-4 pe-8 flex justify-end">
                        <Button 
                            className="font-bold me-2"
                            color="neutral"
                            variant="outline"
                            onClick={handleCancelButton}>
                                Cancel
                        </Button>
                        <Button
                            className="font-bold"
                            color="primary"
                            type="submit">
                                Send reset link
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
    )
}

export default ForgotPassword