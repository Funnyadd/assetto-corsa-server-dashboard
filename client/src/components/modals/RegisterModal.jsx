import {
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from 'mdb-react-ui-kit';
import RegisterForm from '../RegisterForm';

const RegisterModal = ({ open, setOpen }) => {
    const toggleOpen = () => setOpen(!open);

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex="-1">
            <MDBModalDialog centered>
                <MDBModalContent className="registerModal">
                    <MDBModalHeader>
                        <MDBModalTitle className="text-white fs-2">Register</MDBModalTitle>
                        <button 
                            type="button" 
                            class="btn-close btn-close-white" 
                            aria-label="Close"
                            onClick={toggleOpen} />
                    </MDBModalHeader>

                    <MDBModalBody className="text-center">
                        <RegisterForm toggleOpenModal={toggleOpen} />
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default RegisterModal;