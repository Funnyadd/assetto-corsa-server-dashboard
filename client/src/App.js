import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './components/Footer';
import Login from './pages/Login';
import { AuthContext } from './authentication/AuthContext';
import PageProtected from './components/PageProtected';
import Servers from './pages/Servers';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import Users from './pages/Users';
import { useEffect, useRef } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { OverlayProvider, useOverlay } from './components/loading/OverlayContext';
import Overlay from "./components/loading/Overlay";

const App = () => {
	const { isOverlayVisible } = useOverlay()

	const router = createBrowserRouter([
		{
			path: "/",
			element: <PageProtected><Servers /></PageProtected>
		},
		{
			path: "/users",
			element: <PageProtected manager><Users /></PageProtected>
		},
		{
			path: "/login",
			element: <Login />
		},
		{
			path: "/forgotPassword",
			element: <ForgotPassword />
		},
		{
			path: "*",
			element: <NotFound />
		}
	])

	const pageStateRef = useRef(null)
	useEffect(() => {
		if (pageStateRef.isFirstPageLoad === undefined) {
			let theme = window.localStorage.getItem('sb-react-daisyui-preview-theme')
			if (!theme) {
				theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
				window.localStorage.setItem('sb-react-daisyui-preview-theme', theme)
			}
			document.getElementsByTagName('html')[0].setAttribute('data-theme', theme)
			pageStateRef.isFirstPageLoad = false
        }
	}, [])

	return (
		<OverlayProvider>
			<AuthContext>
				<div className="h-screen flex flex-col">
					<Overlay isVisible={isOverlayVisible} />
					<ToastContainer
						position="bottom-right"
						transition={Slide}
						draggable
						autoClose={5000}
						stacked />
					<RouterProvider router={router} />
					<Footer />
				</div>
			</AuthContext>
		</OverlayProvider>
	)
}

export default App
