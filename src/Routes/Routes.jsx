import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AvailableCamps from "../pages/AvailableCamps";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import CampDetails from "../Components/MedicalCamps/CampDetails";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../layouts/Dashboard";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Admin/AdminHome";
import Add_Camp from "../pages/Admin/Add_Camp";
import Manage_camps from "../pages/Admin/Manage_camps";
import RegisteredCamp from "../pages/Admin/RegisteredCamp";
import UpdateUser from "../Components/Shared/UpdateUser";
import UserHome from "../pages/User/UserHome";
import RegisteredCamps from "../pages/User/RegisteredCamps";
import Pay from "../Components/Payment/Pay";
import PaymentHistory from "../Components/Payment/PaymentHistory";
import Ratting from "../pages/Admin/Ratting";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement:<ErrorPage/>  ,
      children: [
        {
            index: true,
            element: <Home/>
        }, 
        {
            path: "/availableCamps",
            element:<AvailableCamps/>
        }, 
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        },
        {
          path:"/camp-details/:campId",
          element:<PrivateRoute><CampDetails/></PrivateRoute> ,
        }
    ]
    },
    {
      path:"dashboard",
      element:<PrivateRoute><Dashboard/></PrivateRoute>,
      children:[
        // admin route
        {
          path:"admin_home",
          element:<AdminRoute><AdminHome/></AdminRoute>
        },
        {
          path:"add_camp",
          element:<AdminRoute><Add_Camp/></AdminRoute>
        }
        ,
        {
          path:"manage_camp",
          element:<AdminRoute><Manage_camps/></AdminRoute>
        }
        ,
        {
          path:"registered_camp",
          element:<AdminRoute><RegisteredCamp/></AdminRoute>
        }
        ,
        {
          path:"update_user",
          element:<PrivateRoute><UpdateUser/></PrivateRoute>
        },
        {
          path:"user_ratting",
          element:<AdminRoute><Ratting/></AdminRoute>
        },


        // user route
        
        {
          path:"user_home",
          element:<PrivateRoute><UserHome/></PrivateRoute>
        },
        {
          path:"registered_camps",
          element:<PrivateRoute><RegisteredCamps/></PrivateRoute>
        },
        {
          path:"pay/:campId",
          element:<PrivateRoute><Pay/></PrivateRoute>
        },
        {
          path:"paymentHistory",
          element:<PrivateRoute><PaymentHistory/></PrivateRoute>
        },


      ]
    }
    

]);