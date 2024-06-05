import { Button } from 'react-daisyui';
import { BoxArrowInRight, Play, Stop, Pencil, Trash } from "react-bootstrap-icons";
import { getAxios, validateUnauthorization } from '../utils/AxiosConfig';
import { sendErrorNotification, sendSuccessNotification } from '../utils/NotificationUtils';
import FunctionProtected from './FunctionProtected';
import { useContext } from 'react';
import { Context } from '../authentication/AuthContext';
import { getRoleNeeded } from '../utils/RoleUtils';
import { closeLoadingNotification, sendLoadingNotification } from '../utils/LoadingUtils';

const ServerTile = ({ server, sync }) => {
    const { user } = useContext(Context)

    const serverUrl = `https://acstuff.ru/s/q:race/online/join?ip=${process.env.REACT_APP_ASSETTO_SERVER_IP}&httpPort=${server.port}`
    
    const toggleStartStop = () => {
        if (server.isStarted) stopServer()
        else startServer()
    }
    
    const startServer = async () => {
        const notificationId = sendLoadingNotification("Starting server...")
        await getAxios().post(`/server/start/${server.id}`)
        .then(response => {
            server.isStarted = response.data.isStarted
            sync()
            closeLoadingNotification(notificationId)
            sendSuccessNotification("Server started!")
        })
        .catch(error => {
            closeLoadingNotification(notificationId)
            if (!validateUnauthorization(error)) {
                const errorMessage = `An error occured while starting the server ${server.name}`
                console.error(errorMessage, error)
                sendErrorNotification(errorMessage)
            }
        })
    }
    
    const stopServer = async () => {
        const notificationId = sendLoadingNotification("Stopping server...")
        await getAxios().post(`/server/stop/${server.id}`)
        .then(response => {
            server.isStarted = response.data.isStarted
            sync()
            closeLoadingNotification(notificationId)
            sendSuccessNotification("Server stopped!")
        })
        .catch(error => {
            closeLoadingNotification(notificationId)
            if (!validateUnauthorization(error)) {
                const errorMessage = `An error occured while stopping the server ${server.name}`
                console.error(errorMessage, error)
                sendErrorNotification(errorMessage)
            }
        })
    }

    const isManagerUser = () => {
        return user.roleId <= getRoleNeeded(true)
    }
    
    return (
        <div className={'p-2 my-2 grid gap-x-3 items-center bg-base-300 rounded-box border-s-4 ' 
            + (server.isStarted ? 'border-success ' : 'border-error ')
            + (isManagerUser() ? 'grid-cols-serversGridContentAdmin' : 'grid-cols-serversGridContent')}>
            <span>{server.isStarted ? server.lastPort : "N/A"}</span>
            <span>{server.name}</span>
            <span>{server.occupiedSlots}/{server.totalSlots}</span>
            <Button className="hover:text-primary icon-btn" shape="square" color="ghost" size="sm" tag="a" href={serverUrl} target="_blank" rel="noreferrer" disabled={!server.isStarted}>
                <BoxArrowInRight size={24}/>
            </Button>
            <FunctionProtected manager>
                <Button shape="square" color="ghost" size="sm" onClick={toggleStartStop} className={"icon-btn " + (server.isStarted ? "hover:text-error" : "hover:text-success")}>
                    {server.isStarted ? <Stop size={32} className='pb-[2px]'/> : <Play size={32} className='pb-[2px]'/>}
                </Button>
                <Button shape="square" color="ghost" size="sm" className="hover:text-warning icon-btn" disabled>
                    <Pencil size={20}/>
                </Button>
                <Button shape="square" color="ghost" size="sm" className="hover:text-error icon-btn" disabled>
                    <Trash size={20}/>
                </Button>
            </FunctionProtected>
        </div>
    )
}

export default ServerTile