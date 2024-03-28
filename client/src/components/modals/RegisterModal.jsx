import {
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from 'mdb-react-ui-kit';
import RegisterForm from '../RegisterForm';

const RegisterModal = ({ open, setOpen, setConfirmationAlert }) => {
    const confirmationMessage = "New account successfully created!"

    const toggleOpen = () => setOpen(!open)

    const handleRegistration = () => {
        toggleOpen()
        setConfirmationAlert(confirmationMessage)
    }

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex="-1">
            <MDBModalDialog centered>
                <MDBModalContent className="registerModal">
                    <MDBModalHeader>
                        <MDBModalTitle className="text-white fs-2">Register</MDBModalTitle>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            aria-label="Close"
                            onClick={toggleOpen} />
                    </MDBModalHeader>
                    <MDBModalBody className="text-center">
                        <RegisterForm registrationHandler={handleRegistration} />
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}

export default RegisterModal