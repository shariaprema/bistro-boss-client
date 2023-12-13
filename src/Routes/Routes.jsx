import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import SignUp from "../Pages/SignUp/SignUp";
import Secret from "../Pages/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import Login from "../Pages/Login/Login";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element:<Home></Home>,
        },

        {
          path: "/menu",
          element:<Menu></Menu>
        },

        {
          path: "order/:category",
          element:<Order></Order>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/signUp",
          element:<SignUp></SignUp>
        },
        {
          path: "/secret",
          element:<PrivateRoute><Secret></Secret></PrivateRoute>
        },
      ],

      
    },


    {
      path: "dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        //Normal User Routes
        {
          path: "userHome",
          element:<PrivateRoute> <UserHome></UserHome> </PrivateRoute>,
        },
        {
          path: "cart",
          element:<PrivateRoute><Cart></Cart></PrivateRoute>,
        },

        {
          path: "payment",
          element:<PrivateRoute><Payment></Payment></PrivateRoute>,
        },
        {
          path: "paymentHistory",
          element:<PrivateRoute> <PaymentHistory></PaymentHistory> </PrivateRoute>,
        },

        // Admin Routes:
        {
          path: "addItems",
          element:<AdminRoute><AddItems></AddItems></AdminRoute>,
        },
        {
          path: "users",
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>,
        },
        {
          path: "manageItems",
          element:<AdminRoute> <ManageItems></ManageItems> </AdminRoute>,
        },

        {
          path: "adminHome",
          element:<AdminRoute> <AdminHome> </AdminHome> </AdminRoute>,
        },

        {
          path: "updateItem/:id",
          element:<AdminRoute> <UpdateItem></UpdateItem> </AdminRoute>,
          loader: ({params})=> fetch(`http://localhost:5000/menu/${params.id}`)
        },
      ]
    },

  ]);

  export default router