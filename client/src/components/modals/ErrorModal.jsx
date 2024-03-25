import {
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';

const ErrorModal = ({ open, setOpen, errorMessage }) => {
    const toggleOpen = () => setOpen(!open);

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex="-1">
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>
                            Error
                        </MDBModalTitle>
                        <Button 
                            variant="secondary"
                            className="btn-close"
                            color="none"
                            onClick={toggleOpen} />
                    </MDBModalHeader>

                    <MDBModalBody className="text-center">
                        <span>{errorMessage}</span>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <Button onClick={toggleOpen}>
                            Close
                        </Button>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default ErrorModal;