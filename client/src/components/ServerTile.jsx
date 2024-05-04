import { useState } from 'react';
import { Button } from 'react-daisyui';
import { BoxArrowInRight, Play, Stop, Pencil, Trash } from "react-bootstrap-icons";

const ServerTile = ({ server }) => {
    const serverUrl = `https://acstuff.ru/s/q:race/online/join?ip=${process.env.REACT_APP_ASSETTO_SERVER_IP}&httpPort=${server.port}`

    const [isStarted, setIsStarted] = useState(server.isStarted)

    // Temporary method to test the UI
    const toggleStartStop = () => {
        setIsStarted(!isStarted)
    }

    return (
        <div className={'p-2 my-2 grid grid-cols-serversGridContent gap-x-3 items-center bg-base-300 rounded-box border-s-4 ' + (isStarted ? 'border-success' : 'border-error')}>
            <span>{isStarted ? server.currentPort : "N/A"}</span>
            <span>{server.name}</span>
            <span>{server.occupiedSlots}/{server.totalSlots}</span>
            <Button shape="square" color="ghost" size="sm" tag="a" href={serverUrl} target="_blank" rel="noreferrer">
                <BoxArrowInRight size={20}/>
            </Button>
            <Button shape="square" color="ghost" size="sm" onClick={toggleStartStop} className={isStarted ? "hover:text-error" : "hover:text-success"}>
                { isStarted ? <Stop size={32}/> : <Play size={32}/> }
            </Button>
            <Button shape="square" color="ghost" size="sm" className="hover:text-warning">
                <Pencil size={20}/>
            </Button>
            <Button shape="square" color="ghost" size="sm" className="hover:text-error">
                <Trash size={20}/>
            </Button>
        </div>
    )
}

export default ServerTile