import { Button } from 'react-daisyui';
import { BoxArrowInRight, Play, Stop, Pencil, Trash } from "react-bootstrap-icons";
import Axios from 'axios';
import { getAuth } from 'firebase/auth';
import { sendErrorNotification } from '../utils/NotificationUtils';

const ServerTile = ({ server, sync }) => {
    const header = { headers: { refreshtoken: getAuth().currentUser.refreshToken }}
	Axios.defaults.withCredentials = true

    const serverUrl = `https://acstuff.ru/s/q:race/online/join?ip=${process.env.REACT_APP_ASSETTO_SERVER_IP}&httpPort=${server.port}`

    // Temporary method to test the UI
    const toggleStartStop = () => {
        if (server.isStarted) {
            stopServer()
        }
        else {
            startServer()
        }
    }

    const startServer = async () => {
        await Axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/server/start/${server.id}`, {}, header)
		.then(response => {
            server.isStarted = response.data.isStarted
            sync()
		})
		.catch(error => {
            const errorMessage = `An error occured while starting the server ${server.name}`
            console.error(errorMessage, error)
			sendErrorNotification(errorMessage)
		})
    }

    const stopServer = async () => {
        await Axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/server/stop/${server.id}`, {}, header)
        .then(response => {
            server.isStarted = response.data.isStarted
            sync()
        })
        .catch(error => {
            const errorMessage = `An error occured while stopping the server ${server.name}`
            console.error(errorMessage, error)
			sendErrorNotification(errorMessage)
        })
    }

    return (
        <div className={'p-2 my-2 grid grid-cols-serversGridContent gap-x-3 items-center bg-base-300 rounded-box border-s-4 ' + (server.isStarted ? 'border-success' : 'border-error')}>
            <span>{server.isStarted ? server.lastPort : "N/A"}</span>
            <span>{server.name}</span>
            <span>{server.occupiedSlots}/{server.totalSlots}</span>
            <Button shape="square" color="ghost" size="sm" tag="a" href={serverUrl} target="_blank" rel="noreferrer" disabled={!server.isStarted}>
                <BoxArrowInRight size={20}/>
            </Button>
            <Button shape="square" color="ghost" size="sm" onClick={toggleStartStop} className={server.isStarted ? "hover:text-error" : "hover:text-success"}>
                {server.isStarted ? <Stop size={32}/> : <Play size={32}/>}
            </Button>
            <Button shape="square" color="ghost" size="sm" className="hover:text-warning" disabled>
                <Pencil size={20}/>
            </Button>
            <Button shape="square" color="ghost" size="sm" className="hover:text-error" disabled>
                <Trash size={20}/>
            </Button>
        </div>
    )
}

export default ServerTile