import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ServerTile = ({ name, port }) => {
    // const url = `https://home.adammihajlovic.ca/assetto/server/${port}`; // New url
    const url = `https://home.adammihajlovic.ca/assetto?port=${port}`
    const serverUrl = `https://acstuff.ru/s/q:race/online/join?ip=74.56.22.147&httpPort=${port}`

    const [totalSlots, setTotalSlots] = useState(0)
    const [occupiedSlots, setOccupiedSlots] = useState(0)
    const [refreshData, setRefreshData] = useState(true)

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

    useEffect(() => {
        if (refreshData) {
            handleAssignData()
            setRefreshData(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <a href={serverUrl} target="_blank" rel="noreferrer" className='server'>
            <Row className='mb-1 serverRow rounded text-neutral bg-base-300 align-text-bottom'>
                <Col sm="2">
                    <p className='field'>{port}</p>
                </Col>
                <Col sm="7">
                    <h6 className='field'>{name}</h6>
                </Col>
                <Col sm="3">
                    <p className='field text-end'>{occupiedSlots} / {totalSlots}</p>
                </Col>
            </Row>
        </a>
    )
}

export default ServerTile