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

const App = () => {
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
		<AuthContext>
			<div className="h-screen flex flex-col">
				<ToastContainer
					position="bottom-right"
					transition={Slide}
					autoClose={5000}
					limit={3} />
				<RouterProvider router={router} />
				<Footer />
			</div>
		</AuthContext>
	)
}

export default App;
