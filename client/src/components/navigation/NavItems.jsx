import { logout } from '../../authentication/Auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-daisyui';
import themes from './themes.json';
import { sendSuccessNotification } from '../../utils/NotificationUtils';

const NavItems = () => {
	const loggedOutConfirmationMessage = "You have successfully logged out!"
	
	const navigate = useNavigate()
	
	const [theme, setTheme] = useState()
	
	const handleLoggingOut = async () => {
		await logout()
		.then(() => {
			sendSuccessNotification(loggedOutConfirmationMessage)
			navigate("/login")
		})
		.catch((error) => {
			console.error(error)
		})
	}
	
	const toggleTheme = (t) => {
		document.getElementsByTagName('html')[0].setAttribute('data-theme', t)
		window.localStorage.setItem('sb-react-daisyui-preview-theme', t)
		setTheme(t)
	}
	useEffect(() => {
		const t = window.localStorage.getItem('sb-react-daisyui-preview-theme')
		document.getElementsByTagName('html')[0].setAttribute('data-theme', t)
		setTheme(t)
	}, [])
  
    return (
		<>
			<Button tag="a" href="/" color="ghost" className='text-lg'>Servers</Button>
			<Button tag="a" href="/users" color="ghost" className='text-lg'>Users</Button>
			<Dropdown end>
				<Dropdown.Toggle className="btn btn-ghost rounded-btn text-lg w-full" button={false}>
					Theme
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-content bg-base-200 rounded-box top-px h-[28.6rem] max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16">
					<div className='class="grid grid-cols-1 gap-3 p-3"'>
					<p className='text-center text-lg font-bold my-2'>Actif: {theme}</p>
					{themes.map((t, i) => 
						<button
							key={i}
							className="outline-base-content text-start outline-offset-4 my-1 w-full" 
							data-set-theme={t}
							data-act-class="[&amp;_svg]:visible"
							onClick={() => toggleTheme(t)}>
							<span
								data-theme={t}
								className="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans">
								<span className="grid grid-cols-5 grid-rows-3">
								<span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="invisible h-3 w-3 shrink-0">
									<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
									</svg>
									<span className="flex-grow text-sm">{t}</span> 
									<span className="flex h-full shrink-0 flex-wrap gap-1">
									<span className="bg-primary rounded-badge w-2"></span>
									<span className="bg-secondary rounded-badge w-2"></span>
									<span className="bg-accent rounded-badge w-2"></span>
									<span className="bg-neutral rounded-badge w-2"></span>
									</span>
								</span>
								</span>
							</span>
						</button>
					)}
					</div>
				</Dropdown.Menu>
			</Dropdown>
			<Button color="ghost" className='text-lg text-error' onClick={handleLoggingOut}>Logout</Button>
			{/* <Dropdown end>
			<Button shape="square" color="ghost">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
				</svg>
			</Button>
			<Dropdown.Menu className="bg-neutral text-neutral-content w-52 menu-sm mt-3 z-[1] p-2">
				<Dropdown.Item>Profile</Dropdown.Item>
				<Dropdown.Item>Settings</Dropdown.Item>
				<Dropdown.Item className='' onClick={handleLoggingOut}>Logout</Dropdown.Item>
			</Dropdown.Menu>
			</Dropdown> */}
		</>
	)
}

export default NavItems;