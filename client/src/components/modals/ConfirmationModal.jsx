import { Modal, Button } from 'react-daisyui';
import { sendSuccessNotification } from '../../utils/NotificationUtils';

const ConfirmationModal = ({ open, setOpen, message, action, confirmationMessage, confirmBtnColor = "success" }) => {

    const toggleOpen = () => setOpen(!open)

    const handleConfirmation = () => {
        action()
        sendSuccessNotification(confirmationMessage)
        toggleOpen()
    }

    return (
        <Modal open={open}>
            <Modal.Header className="font-bold text-2xl flex justify-between">
                Register
                <Button
                    size="sm"
                    color="ghost"
                    shape="circle"
                    onClick={toggleOpen}
                >
                    ✕
                </Button>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Actions>
                <Button color={confirmBtnColor} onClick={handleConfirmation}>Yes</Button>
                <Button onClick={toggleOpen}>Cancel</Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ConfirmationModal