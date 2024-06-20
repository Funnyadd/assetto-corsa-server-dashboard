import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from 'react';
import { Button, Collapse, Select, Toggle } from 'react-daisyui';
import { sendErrorNotification, sendWarningNotification } from '../utils/NotificationUtils';
import FormInput from './FormInput';
import { getAxios } from '../utils/AxiosConfig';
import FunctionProtected from './FunctionProtected';
import { Context } from '../authentication/AuthContext';
import { getRoleNeeded } from '../utils/RoleUtils';

const UpdateUserForm = ({ updateHandler, originalUser, IsModalOpened, toggleOpenModal }) => {
    const errorMessage = "Couldn't modify the user"

    const { user } = useContext(Context)

    const [email, setEmail] = useState("")
    const [steamId, setSteamId] = useState("")
    const [role, setRole] = useState({ id: 3, name: "viewer" })
    const [isWhitelisted, setIsWhiteLsited] = useState(false)

    const [emailInvalid, setEmailInvalid] = useState(false)
    const [steamIdInvalid, setSteamIdInvalid] = useState(false)

    const [validated, setValidated] = useState(false)

    const checkFormValidity = () => {
        setValidated(true)
        let isValid = true

        setEmailInvalid(false)
        setSteamIdInvalid(false)

        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
            setEmailInvalid(true)
            isValid = false;
        }
        if (steamId === "") {
            setSteamIdInvalid(true)
            isValid = false
        }

        return isValid
    }

    const clearModificationForm = () => {
        setEmail("")
        setSteamId("")
        setRole({ id: 3, name: "viewer" })
        setSteamId(false)
        setValidated(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!checkFormValidity()) {
            event.stopPropagation()
        }
        else {
            if (originalUser.email !== email
                || originalUser.steamId !== steamId
                || originalUser.role.id !== role.id
                || originalUser.isWhitelisted !== isWhitelisted
            ) {
                const user = {
                    id: originalUser.id,
                    firebaseUID: originalUser.firebaseUID,
                    email: email,
                    steamId: steamId,
                    roleId: role.id,
                    isWhitelisted: isWhitelisted
                }

                delete user.steamUsername

                getAxios().put("/user", user)
                .then(response => {
                    if (response.data) {
                        updateHandler(response.data)
                        clearModificationForm()
                    }
                    else {
                        sendErrorNotification(errorMessage)
                    }
                })
                .catch(error => {
                    toggleOpenModal()
                    event.stopPropagation()

                    if (error.response?.data?.error?.status === 404) {
                        sendErrorNotification(error.response.data.error.message)
                    }
                    else {
                        console.error(errorMessage, error)
                        sendErrorNotification(errorMessage)
                    }
                })
            }
            else {
                toggleOpenModal()
                sendWarningNotification("User was not modified because nothing was changed.")
            }
        }
    }

    const isAdminUser = () => {
        return user.roleId <= getRoleNeeded(false, true)
    }

    useEffect(() => {
        clearModificationForm()
        if (IsModalOpened) {
            setEmail(originalUser.email)
            setSteamId(originalUser.steamId)
            setRole(originalUser.role)
            setIsWhiteLsited(originalUser.isWhitelisted)
        }
        // eslint-disable-next-line
    }, [IsModalOpened])

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label bsPrefix="mb-2" htmlFor="updateUserEmailInput">Email</Form.Label>
                <FormInput
                    id="updateUserEmailInput"
                    type="email"
                    value={email}
                    setValue={setEmail}
                    isInvalid={emailInvalid && validated}
                    feedbackMessage="Please enter a valid email address" 
                    disabled={!isAdminUser()}
                    required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="updateUserSteamIdInput">Steam ID</Form.Label>
                <FormInput
                    id="updateUserSteamIdInput"
                    type="text"
                    value={steamId}
                    setValue={setSteamId}
                    isInvalid={steamIdInvalid && validated}
                    feedbackMessage="Please enter a valid steam ID"
                    disabled={!isAdminUser()}
                    required />
                <Collapse className=' mt-2 text-xs bg-base-200'>
                    <Collapse.Title className="p-2 min-h-1 text-sm font-medium w-auto">
                        Having trouble finding your Steam ID?
                    </Collapse.Title>
                    <Collapse.Content>
                        To <strong>view</strong> your Steam ID:<br/>
                            <br/>
                            &emsp;• In Steam, select your Steam username in the top right corner.<br/>
                            &emsp;• Select "Account details".<br/>
                            &emsp;• Your Steam ID can be found below your Steam username.
                    </Collapse.Content>
                </Collapse>
            </Form.Group>

            <Form.Group className="mb-3 flex">
                <div className="inline-grid me-10">
                    <Form.Label htmlFor="updateUserRoleInput">Role</Form.Label>
                    <Select
                        id="updateUserRoleInput"
                        bordered
                        value={role.name}
                        onChange={e => setRole({ id: e.target.key, name: e.target.value })}
                    >
                        <FunctionProtected admin>
                            <option key={1} value="admin">Admin</option>
                        </FunctionProtected>
                        <option key={2} value="manager">Manager</option>
                        <option key={3} value="viewer">Viewer</option>
                    </Select>
                </div>
                <div className="inline-grid">
                    <Form.Label htmlFor="updateUserIsWhitelistedInput">Whitelisted</Form.Label>
                    <Toggle
                        id="updateUserIsWhitelistedInput"
                        className={(isWhitelisted ? "" : "toggleOffError")}
                        checked={isWhitelisted}
                        color="success"
                        onChange={e => setIsWhiteLsited(e.target.checked)} />
                </div>
            </Form.Group>

            <div className='text-center'>
                <Button
                    id="RegisterFormSubmitBtn"
                    className="my-3 font-bold text-lg"
                    color="success"
                    wide
                    type="submit"
                >
                    Save modifications
                </Button>
            </div>

        </Form>
    )
}

export default UpdateUserForm