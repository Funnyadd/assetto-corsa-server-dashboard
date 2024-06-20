import { sendSuccessNotification } from '../../utils/NotificationUtils';
import { Modal, Button } from 'react-daisyui';
import UpdateUserForm from '../UpdateUserForm';

const UpdateUserModal = ({ open, setOpen, user, setUser, userList, setUserList }) => {
    const toggleOpen = () => {
        setOpen(!open)
        if (!open) setUser({})
    }

    const handleUpdateUser = (updatedUser) => {
        const tempUsers = userList.map(user => {
            if (user.id === updatedUser.id) return updatedUser
            return user
        })
        setUserList(tempUsers)
        setUser({})
        sendSuccessNotification(`User ${user.steamUsername} modified!`)
        toggleOpen()
    }

    return (
        <Modal open={open}>
            <Modal.Header className="font-bold text-2xl flex justify-between">
                Modify {user.steamUsername}
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
                <UpdateUserForm
                    updateHandler={handleUpdateUser}
                    originalUser={user}
                    IsModalOpened={open}
                    toggleOpenModal={toggleOpen} />
            </Modal.Body>
        </Modal>
    )
}

export default UpdateUserModal