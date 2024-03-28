import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../Auth';
import { useSearchParams } from 'react-router-dom';

const ForgotPassword = () => {
    const enterKeyCode = 13
    const defaultErrorMessage = "An error occurred while trying to send the email. Please try again later."
    const tooManyRequestsErrorCode = "auth/too-many-requests"
    const tooManyRequestsErrorMessage = "You have done too many requests for this user. Please try again later."

    const navigate = useNavigate()
    const [queryParameters, setQueryParameters] = useSearchParams()

    const [email, setEmail] = useState("")
    const [validated, setValidated] = useState(false)
    const [validationError, setValidationError] = useState(false)

    const [error, setError] = useState("")

    const handleSubmitOnEnterKeyPressed = (event) => {
        if (event.keyCode === enterKeyCode || event.which === enterKeyCode) {
            handleSubmit(event)
        }
    }

    const handleCancelButton = () => {
        navigate("/login")
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

            await forgotPassword(email)
            .then(() => {
                navigate("/login?forgotPasswordConfirmation=" + email)
            })
            .catch((error) => {
                if (error.code === tooManyRequestsErrorCode) {
                    setError(tooManyRequestsErrorMessage)
                }
                else {
                    setError(defaultErrorMessage)
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
        <div className="d-flex flex-column align-items-center justify-content-center my-5 px-3" >
            <Card text="white" className="m-5 shadow forgotPasswordForm w-100">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Card.Header className="forgotPasswordFormHeader py-3">
                        <h4>Forgot your Password?</h4>
                    </Card.Header>
                    <Card.Body>
                        {
                            error.length > 0
                            ?
                            <Alert variant="danger">
                                {error}
                            </Alert> 
                            :
                            <></>
                        }
                        <p className="mb-4">Please enter your email to received a password reset link.</p>
                        <Form.Group className="mb-3" controlId="loginFormEmail">
                            <Form.Control 
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleSubmitOnEnterKeyPressed}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid email address
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="py-3 forgotPasswordFormFooter d-flex justify-content-end">
                        <Button 
                            className="fw-bold me-2"
                            variant="secondary"
                            onClick={handleCancelButton}>
                                Cancel
                        </Button>
                        <Button
                            className="fw-bold"
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