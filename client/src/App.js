import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.scss';
import Footer from './components/Footer';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';
import Protected from './components/Protected';
import Servers from './pages/Servers';
import NotFound from './pages/NotFound';

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
      path: "*",
      element: <NotFound />
  }
]);

  return (
    <AuthContext>
      <div className="App">
        <RouterProvider router={router} />
        <Footer />
      </div>
    </AuthContext>
  );
}

export default App;
