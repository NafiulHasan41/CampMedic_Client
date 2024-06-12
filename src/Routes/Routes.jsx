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
      ]
    }
    

]);