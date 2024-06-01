import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CampCard from "./CampCard";
import { Link } from "react-router-dom";


const PopularMedicalCamp = () => {

    const axiosPublic = useAxiosPublic();
   
    const {data: Camps = [], isPending: loading} = useQuery({
        queryKey: ['CampsPopular'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/popular_camps');
            return res.data;
        }
    })

    if(loading) return <div className="text-center">
          <section className="bg-white  min-h-screen">
            <div className="container px-6 py-10 mx-auto animate-pulse">
                <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
        
                <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>
        
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                        
                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>
        
                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                        
                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>
        
                    <div className="w-full ">
                        <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>
                        
                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>
                </div>
            </div>
        </section>
    </div>
 

    return (
        <div>

            <div>
            <h1 className="  text-xl md:text-4xl font-semibold  md:font-bold text-center text-[#40E0D0] capitalize lg:text-3xl my-8 md:my-16">---  Popular Medical Camps --- </h1>

            <div className=" border-b-2 border-[#40E0D0] w-[50%] mx-auto mb-10"></div>
            </div>

            <div className=" p-5 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 ">
                {
                    Camps.map((camp) => (
                        <CampCard key={camp._id} camp={camp}/>
                    ))
                }
            </div>

            <div className=" flex justify-center">
                <Link to="/availableCamps">
              <h1 className=" mb-5 md:mb-10 btn w-80 text-xl md:text-4xl font-semibold bg-cyan-800 shadow-2xl shadow-cyan-700 hover:bg-cyan-100 border-none hover:scale-110  md:font-bold text-center text-[#40E0D0] capitalize lg:text-3xl my-8 md:my-16"> Show All Camps</h1>
              </Link>
            </div>
            
        </div>
    );
};

export default PopularMedicalCamp;