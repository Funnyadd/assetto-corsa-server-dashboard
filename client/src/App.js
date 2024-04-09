import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './components/Footer';
import Login from './pages/Login';
import { AuthContext } from './authentication/AuthContext';
import Protected from './components/Protected';
import Servers from './pages/Servers';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import { useEffect } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected><Servers /></Protected>
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
    const t = window.localStorage.getItem('sb-react-daisyui-preview-theme')
    document.getElementsByTagName('html')[0].setAttribute('data-theme', t)
  }, [])

  return (
    <AuthContext>
      <div className="App">
        <RouterProvider router={router} />
        <Footer />
      </div>
    </AuthContext>
  )
}

export default App;
