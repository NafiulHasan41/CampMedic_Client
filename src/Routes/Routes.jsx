import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AvailableCamps from "../pages/AvailableCamps";


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
    ]
    },

]);