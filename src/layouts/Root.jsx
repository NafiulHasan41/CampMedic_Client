import { Outlet } from "react-router-dom";




const Root = () => {

    return (
        <div>
           
            <div className='min-h-[calc(100vh-250px)]'>
                <Outlet/>
            </div>
            <div className=" mt-5">
                
            </div>
        </div>
    );
};

export default Root;