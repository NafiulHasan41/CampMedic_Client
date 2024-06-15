import { Helmet } from "react-helmet-async";
import Carousel from "../Components/Carousel";
import PopularMedicalCamp from "../Components/MedicalCamps/PopularMedicalCamp";
import RattingBar from "../Components/Shared/RattingBar";
import Question from "../Components/Question";



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
            <div className="my-5 md:my-20">
                <Question/>
            </div>
            <div className=" w-full mx-auto my-5 md:my-20">
                 <div className="divider divider-neutral w-[50%] mx-auto"></div>
                <h1 className="text-center text-2xl md:text-3xl font-extrabold text-[#40E0D0]  my-5 md:my-10">USER RATTING</h1>
                <div className="divider divider-neutral w-[50%] mx-auto"></div>
                <RattingBar/>
                <div className="divider divider-neutral w-[50%] mx-auto  my-5 md:my-10"></div>
            </div>
            

        </div>
    );
};

export default Home;