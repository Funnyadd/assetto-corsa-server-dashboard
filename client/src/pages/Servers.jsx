import Container from 'react-bootstrap/Container';
import ServerTile from '../components/ServerTile';
import NavBar from '../components/navigation/Nav';
import { Button, RadialProgress } from 'react-daisyui';
import { useState, useEffect } from "react";
import { ArrowClockwise } from 'react-bootstrap-icons';
import Axios from 'axios';
import { getAuth } from 'firebase/auth';

function Servers() {
	const defaultCountDownTimerValue = 60

	const header = { headers: { refreshtoken: getAuth().currentUser.refreshToken }}
	Axios.defaults.withCredentials = true
	
	const [serversList, setServersList] = useState([])
	const [countDown, setCountDown] = useState(0)

	const updateServersInfo = async () => {
		setCountDown(defaultCountDownTimerValue)

		await Axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/server`, header)
		.then(response => {
			sortAndSetServerList(response.data)
			localStorage.setItem('allServers', JSON.stringify(serversList))
		})
		.catch(error => {
			console.error("An error occured while getting the servers informations", error)
		})
	}

	const stopAllServers = async () => {
        await Axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/server/stopAll`, {}, header)
        .then(updateServersInfo)
        .catch(error => {
            console.error(`An error occured while stopping the servers.`, error)
        })
    }

	const sortAndSetServerList = (list = serversList) => {
		setServersList(list
			.sort((a, b) => a.lastPort - b.lastPort)
			.sort((a, b) => ((a.isStarted === b.isStarted) ? 0 : a.isStarted ? -1 : 1)))
	}

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('allServers'))
		if (storedData) {
			setServersList(storedData)
		}
	}, [])

  	useEffect(() => {
		if (countDown < 0) {
			updateServersInfo()
		}
		else {
			const interval = setInterval(() => {
				setCountDown(countDown - 1)
			}, 1000)
	
			return () => clearInterval(interval)
		}   
  	}, [countDown])

	return (
		<>
		<NavBar/>
		<div className='flex flex-col items-center mt-6 mb-16'>
			<Container>
				<div className='ps-3 pe-2 grid grid-cols-serversGridHeader items-center gap-x-3'>
					{/* Revisit the fields here to match with what the API returns */}
					<span>Port</span>
					<span>Name</span>
					<span>Slots</span>
					<Button className="hover:bg-transparent" shape="square" color="ghost" size="sm" onClick={updateServersInfo}>
						<ArrowClockwise className="hover:rotate-45 transition transition-500" size={32}/>
					</Button>
					<RadialProgress className='bg-base-300 -z-10' value={(60 - countDown) / 60 * 100} thickness="2px" size="32px">
						{countDown}
					</RadialProgress>
					<Button onClick={stopAllServers} className="justify-self-end" size="sm" color="error">
						Stop All
					</Button>
				</div>
				{serversList.map((server, index) => 
					<ServerTile key={index} server={server} sync={sortAndSetServerList}/>
				)}
			</Container>
		</div>
		</>
	)
}

export default Servers