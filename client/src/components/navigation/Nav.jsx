import { useState } from 'react';
import { Button, Navbar, Menu, Drawer } from 'react-daisyui';
import NavItems from './NavItems';

const Nav = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
		setVisible(!visible)
    }

    return (
		<Drawer open={visible} onClickOverlay={toggleVisible} side={
			<Menu className="p-4 w-60 h-full bg-base-100 z-40 bg-opacity-90 px-2 py-3 backdrop-blur">
				<NavItems/>
			</Menu>
		}>
			<Navbar className="w-full bg-base-100 text-base-content z-30 h-16 justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm">
				<div className="flex-none lg:hidden">
					<Button shape="square" color="ghost" onClick={toggleVisible}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</Button>
				</div>
				<div className="flex-1 px-2 mx-2">
					<Button tag="a" color="ghost" href="/" className="normal-case text-xl">
						Assetto Corsa Server Dashboard
					</Button>
				</div>
				<div className="flex-none hidden lg:block">
					<Menu horizontal={true} className='p-0'>
						<NavItems/>
					</Menu>
				</div>
			</Navbar>
		</Drawer>
	)
}

export default Nav