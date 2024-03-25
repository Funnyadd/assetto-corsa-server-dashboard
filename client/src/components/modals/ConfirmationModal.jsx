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

const ConfirmationModal = 
    ({ open, setOpen, prompt1, prompt2, title, onAccept, confirmation }) => {

    const toggleOpen = () => setOpen(!open);

    return (
        <MDBModal open={open} setOpen={setOpen} tabIndex="-1">
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{title}</MDBModalTitle>
                        <Button 
                            variant="secondary"
                            className="btn-close"
                            color="none"
                            onClick={toggleOpen} />
                    </MDBModalHeader>

                    <MDBModalBody className="text-center">
                        <span>{prompt1}</span>
                        {
                            prompt2 !== null || prompt2 !== undefined
                            ? 
                            <>
                                <br />
                                <span>{prompt2}</span>
                            </>
                            : 
                            <></>
                        }
                    </MDBModalBody>

                    <MDBModalFooter>
                        <Button variant="secondary" onClick={toggleOpen}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={onAccept}>
                            {confirmation}
                        </Button>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default ConfirmationModal;