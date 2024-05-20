import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './components/Footer';
import Login from './pages/Login';
import { AuthContext } from './authentication/AuthContext';
import Protected from './components/Protected';
import Servers from './pages/Servers';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import Users from './pages/Users';
import { useEffect } from "react";
import { Slide, ToastContainer } from "react-toastify";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Protected><Servers /></Protected>
		},
		{
			path: "/users",
			element: <Protected><Users /></Protected>
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

	useEffect(() => {
		const theme = window.localStorage.getItem('sb-react-daisyui-preview-theme')
		document.getElementsByTagName('html')[0].setAttribute('data-theme', theme)
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
