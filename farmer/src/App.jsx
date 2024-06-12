import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import CheckAuth from "./utility/CheckAuth";
import CheckNotAuth from "./utility/CheckNotAuth";


const router = createBrowserRouter([
  {
    path: "/",
    element: <CheckAuth><MainLayout /></CheckAuth>,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ],
    errorElement: <div>Not Found</div>
  },
  {
    path: "/login",
    element: <CheckNotAuth><Login /></CheckNotAuth>,
  },
  {
    path: "/register",
    element: <CheckNotAuth><Register /></CheckNotAuth>,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
