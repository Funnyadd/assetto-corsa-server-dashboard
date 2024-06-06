import { sendSuccessNotification } from '../../utils/NotificationUtils';
import RegisterForm from '../RegisterForm';
import { Modal, Button } from 'react-daisyui';

const RegisterModal = ({ open, setOpen }) => {
    const confirmationMessage = "New account successfully created!"

    const toggleOpen = () => setOpen(!open)

    const handleRegistration = () => {
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
                <RegisterForm registrationHandler={handleRegistration} />
            </Modal.Body>
        </Modal>
    )
}

export default RegisterModal