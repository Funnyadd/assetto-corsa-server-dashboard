import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './components/Footer';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';
import Protected from './components/Protected';
import Servers from './pages/Servers';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import { useTheme, Button } from 'react-daisyui';

function App() {
  const {
    theme,
    setTheme
  } = useTheme();

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

  // Temporary anyways
  const toggleTheme = () => {
    // console.log(theme)
    // const t = theme.trim() === "dark" ? "cyberpunk" : "dark"
    const t = document.getElementsByTagName('html')[0].getAttribute('data-theme') === "dark" ? "cyberpunk" : "dark"
    document.getElementsByTagName('html')[0].setAttribute('data-theme', t);
    window.localStorage.setItem('sb-react-daisyui-preview-theme', t);
    setTheme(t)
  }

  return (
    <AuthContext>
      <div className="App">
        <div className="flex flex-wrap gap-4">
          <Button onClick={toggleTheme} />
      </div>
        <RouterProvider router={router} />
        <Footer />
      </div>
    </AuthContext>
  );
}

export default App;
