import axios from "axios";
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ServerTile = ({ name, port }) => {

    const [totalSlots, setTotalSlots] = useState(0);
    const [occupiedSlots, setOccupiedSlots] = useState(0);

    const url = `http://74.56.22.147:${port}/JSON%7C`;
    // const url = "https://api.github.com/users/github"

    axios({
        url: url,
        method: "GET",
        // headers: { 
        //     // mode: 'no-cors',
            // "Access-Control-Allow-Origin" : "*",
        //     "Access-Control-Allow-Methods": "PUT, POST, OPTIONS, GET",
        //     "Access-Control-Allow-Headers": "Special-Request-Header",
        //     "Access-Control-Allow-Credentials": "true",
        //     "Access-Control-Max-Age": "240",
        //     "Accept": "text/html,application/json"
        // }
    })
    // Handle the response from backend here
    .then((res) => {
        console.log(res)
    })
    // Catch errors if any
    .catch((err) => {
        console.error(err)
    });

    // let status;
    // fetch(url,
    //     {
    //         mode: 'no-cors',
    //         method: 'GET',
    //     })
    //     .then((res) => { 
    //         status = res.status
    //         console.log(status)
    //         console.log(res)
    //         return res.json() 
    //     })
    //     .then((jsonResponse) => {
    //         console.log(jsonResponse)
    //         console.log(status)
    //     })
    //     .catch((err) => {
    //         // handle error
    //         console.error(err)
    //     });

    return (
        <Row className='rounded text-white'>
            <Col>
                <h6>{name}</h6>
            </Col>
            <Col>
                <p>{}</p>
            </Col>
            <Col>
                <p>{}</p>
            </Col>
            
        </Row>
    )
}

export default ServerTile;