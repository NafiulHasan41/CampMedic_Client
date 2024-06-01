import { Helmet } from "react-helmet-async";
import Carousel from "../Components/Carousel";


const Home = () => {
    return (

        <div>
              <Helmet>
            <title>CampMedic : Home</title>
            </Helmet>
            <div className="w-full  md:-mt-24">
                <Carousel/>
            </div>
        </div>
    );
};

export default Home;