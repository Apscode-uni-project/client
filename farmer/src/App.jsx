import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/login/Login";
import MainLayout from "./layouts/MainLayout";
import CheckAuth from "./utility/CheckAuth";
import CheckNotAuth from "./utility/CheckNotAuth";
import Cattle from "./pages/cattle/Cattle";
import CattleDetails from "./pages/cattle-details/CattleDetails";
import Register from "./pages/register/Register";
import MyProfile from "./pages/profile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CheckAuth>
        <MainLayout />
      </CheckAuth>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/cattle" />,
      },
      {
        path: "/cattle",
        element: <Cattle />,
      },
      {
        path: "/cattle/:id",
        element: <CattleDetails />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },
    ],
    errorElement: <div>Not Found</div>,
  },
  {
    path: "/login",
    element: (
      <CheckNotAuth>
        <Login />
      </CheckNotAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <CheckNotAuth>
        <Register />
      </CheckNotAuth>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
