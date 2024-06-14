import { Helmet } from "react-helmet-async";
import Carousel from "../Components/Carousel";
import PopularMedicalCamp from "../Components/MedicalCamps/PopularMedicalCamp";
import RattingBar from "../Components/Shared/RattingBar";



const Home = () => {
    return (

        <div>
              <Helmet>
            <title>CampMedic : Home</title>
            </Helmet>
            <div className="w-full  md:-mt-24">
                <Carousel/>
            </div>
            <div>
                <PopularMedicalCamp/>
            </div>
            <div className=" w-full mx-auto my-5 md:my-20">
                <h1 className="text-center text-3xl font-bold text-Black">User Ratting</h1>
                <RattingBar/>
            </div>
        </div>
    );
};

export default Home;