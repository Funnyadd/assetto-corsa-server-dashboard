import { useState, useEffect } from 'react';
import { Button } from 'react-daisyui';
import { BoxArrowInRight, Play, Stop, Pencil, Trash } from "react-bootstrap-icons";

const ServerTile = ({ name, port }) => {
    // const url = `https://home.adammihajlovic.ca/assetto/server/${port}`; // New url
    const url = `https://home.adammihajlovic.ca/assetto?port=${port}`
    const serverUrl = `https://acstuff.ru/s/q:race/online/join?ip=74.56.22.147&httpPort=${port}`

    const [totalSlots, setTotalSlots] = useState(0)
    const [occupiedSlots, setOccupiedSlots] = useState(0)
    const [refreshData, setRefreshData] = useState(true)

    const [isStarted, setIsStarted] = useState(false)

    const handleFetching = async () => {
        return await fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error(err))
    }

    const handleAssignData = async () => {
        const response = await handleFetching()

        let cars
        if (response === undefined) cars = []
        else cars = response.Cars

        let occupied = 0
        let total = 0

        cars.forEach(car => {
            if (car.IsConnected) occupied++
            if (!car.Model.startsWith("traffic")) total++
        })

        setOccupiedSlots(occupied)
        setTotalSlots(total)
    }

    // Temporary method to test the UI
    const toggleStartStop = () => {
        setIsStarted(!isStarted)
    }

    useEffect(() => {
        if (refreshData) {
            handleAssignData()
            setRefreshData(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div className={'p-2 my-2 grid grid-cols-serversGridContent gap-x-3 bg-base-300 rounded-box border-s-4 ' + (isStarted ? 'border-success' : 'border-error')}>
            <span className="self-center">{port}</span>
            <span className="self-center">{name}</span>
            <span className="self-center">{occupiedSlots}/{totalSlots}</span>
            <Button shape="square" color="ghost" size="sm" tag="a" href={serverUrl} target="_blank" rel="noreferrer">
                <BoxArrowInRight size={20}/>
            </Button>
            <Button shape="square" color="ghost" size="sm" onClick={toggleStartStop}>
                { isStarted
                ? <Stop size={32} className="text-error"/>
                : <Play size={32} className="text-success"/> }
            </Button>
            <Button shape="square" color="ghost" size="sm">
                <Pencil size={20} className="text-warning"/>
            </Button>
            <Button shape="square" color="ghost" size="sm">
                <Trash size={20} className="text-error"/>
            </Button>
        </div>
    )
}

export default ServerTile