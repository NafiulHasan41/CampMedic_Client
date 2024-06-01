import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";




const Root = () => {

    return (
        <div>
             <Navbar/>
            <div className='min-h-[calc(100vh-250px)]'>
                <Outlet/>
            </div>
            <div className=" mt-5">
                <Footer/>
            </div>
        </div>
    );
};

export default Root;