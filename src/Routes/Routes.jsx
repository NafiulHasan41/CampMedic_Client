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
    

]);