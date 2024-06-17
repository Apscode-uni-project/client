import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import MainLayout from "./layouts/MainLayout";
import CheckAuth from "./utility/CheckAuth";
import CheckNotAuth from "./utility/CheckNotAuth";
import Users from "./pages/users/Users";
import Cattle from "./pages/cattle/Cattle";
import CattleDetails from "./pages/cattle-details/CattleDetails";
import Vaccine from "./pages/vaccine/Vaccine";
import DailyReport from "./pages/report/DailyReport";


const router = createBrowserRouter([
  {
    path: "/",
    element: <CheckAuth><MainLayout /></CheckAuth>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/report',
        element: <DailyReport />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/cattle',
        element: <Cattle />
      },
      {
        path: '/cattle/:id',
        element: <CattleDetails />
      },
      {
        path: '/vaccine',
        element: <Vaccine />
      }
    ],
    errorElement: <div>Not Found</div>
  },
  {
    path: "/login",
    element: <CheckNotAuth><Login /></CheckNotAuth>,
  },
  // {
  //   path: "/register",
  //   element: <CheckNotAuth><Register /></CheckNotAuth>,
  // },
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
