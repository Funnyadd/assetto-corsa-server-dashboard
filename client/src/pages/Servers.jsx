import Container from 'react-bootstrap/Container';
import ServerTile from '../components/ServerTile';
import NavBar from '../components/navigation/Nav';
import { Button, RadialProgress } from 'react-daisyui';
import { useState, useEffect, useRef, useContext } from "react";
import { ArrowClockwise } from 'react-bootstrap-icons';
import { getAxios, validateUnauthorization } from '../utils/AxiosConfig';
import { sendErrorNotification } from '../utils/NotificationUtils';
import FunctionProtected from '../components/FunctionProtected';
import { Context } from '../authentication/AuthContext';

function Servers() {
	const defaultCountDownTimerValue = 60
	
	const { user } = useContext(Context)

	const [serversList, setServersList] = useState([])
	const [countDown, setCountDown] = useState(0)
	
	const updateServersInfo = async () => {
		setCountDown(defaultCountDownTimerValue)

		await getAxios().get(`/server`)
		.then(response => {
			sortAndSetServerList(response.data)
			localStorage.setItem('allServers', JSON.stringify(serversList))
		})
		.catch(error => {
			if (!validateUnauthorization(error)) {
				const errorMessage = "An error occured while getting the servers informations"
				console.error(errorMessage, error)
				sendErrorNotification(errorMessage)
			}
		})
	}
	
	const stopAllServers = async () => {
		await getAxios().post(`/server/stopAll`)
		.then(updateServersInfo)
		.catch(error => {
			if (!validateUnauthorization(error)) {
				const errorMessage = `An error occured while stopping the servers.`
				console.error(errorMessage, error)
				sendErrorNotification(errorMessage)
			}
		})
	}

	const sortAndSetServerList = (list = serversList) => {
		setServersList(list
			.sort((a, b) => a.lastPort - b.lastPort)
			.sort((a, b) => ((a.isStarted === b.isStarted) ? 0 : a.isStarted ? -1 : 1)))
	}

	const isManagerUser = () => {
		return user.roleId <= 2
	}
	
	const pageStateRef = useRef(null)
	useEffect(() => {
		if (pageStateRef.isFirstPageLoad === undefined) {
			let storedData = JSON.parse(localStorage.getItem('allServers'))
			if (storedData) setServersList(storedData)
			pageStateRef.isFirstPageLoad = false
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
		// eslint-disable-next-line 
  	}, [countDown])
	
	return (
		<>
			<NavBar/>
			<div className='flex flex-col items-center mt-6 mb-12'>
				<Container>
					<div className={'ps-3 pe-2 grid items-center gap-x-3 ' + (isManagerUser() ? 'grid-cols-serversGridHeaderAdmin' : 'grid-cols-serversGridHeader')}>
						<span>Port</span>
						<span>Name</span>
						<span>Slots</span>
						<Button className="hover:bg-transparent group" shape="square" color="ghost" size="sm" onClick={updateServersInfo}>
							<ArrowClockwise className="group-hover:rotate-45 transition transition-500" size={32}/>
						</Button>
						<RadialProgress className='bg-base-300 -z-10' value={(60 - countDown) / 60 * 100} thickness="2px" size="32px">
							{countDown}
						</RadialProgress>
						<FunctionProtected manager>
							<Button onClick={stopAllServers} className="justify-self-end" size="sm" color="error">
								Stop All
							</Button>
						</FunctionProtected>
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