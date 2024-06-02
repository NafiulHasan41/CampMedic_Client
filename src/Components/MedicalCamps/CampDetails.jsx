import { CiCalendarDate } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdOutlineAttachMoney } from "react-icons/md";
import {  useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import JoinModal from "../Modal/JoinModal";


const CampDetails = () => {
    const axiosSecure = useAxiosSecure();

    const id = useParams().campId;
   
    const {data: camp = [], isPending: loading , refetch } = useQuery({
        queryKey: ['CampDetails'], 
        queryFn: async() =>{
            const res = await axiosSecure.get(`/camp-details/${id}`);
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
        <section className="bg-white dark:bg-gray-900 group">
    <div className="max-w-6xl px-6 py-10 mx-auto">
        <p className="text-xl font-medium text-[#40E0D0] ">Details</p>

        <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            What is offering in this camp?
        </h1>

        <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12 ">
            <div className="absolute w-full bg-[#40E0D0] -z-10 md:h-96 rounded-2xl"></div>
            
            <div className="w-full p-6 bg-[#40E0D0]  md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                <div className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl" >
                     <img className=" w-full h-full object-cover object-center hover:scale-110" src={camp.Image} alt="client photo" />
                </div>
                
                <div className="mt-2 md:mx-6 ">
                    <div>
                        <p className="text-xl font-medium tracking-tight text-white">{camp.CampName}</p>
                        <p className="text-blue-200 ">{camp.Description}</p>
                    </div>

                    <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{camp.HealthcareProfessional}</h1>

        <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
           
        <FaPeopleGroup />

            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.ParticipantCount}</h1>
        </div>

        <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
            <svg aria-label="location pin icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
            </svg>

            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.Location}</h1>
        </div>

        <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
        <MdOutlineAttachMoney />

            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.CampFees}</h1>
        </div>

        <div className="flex gap-2">
        <div className="flex items-center mt-4  text-black dark:text-gray-200 text-2xl ">
              
           <CiCalendarDate />

            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.Date}</h1>
        </div>
        <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
            
        <IoIosTime/>
            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.Time}</h1>
        </div>
        </div>
        <div className=" my-2 text-center"> 
         <JoinModal camp={camp} refetch={refetch}  />
        </div>

        
    </div>
                    
                </div>
            </div>
        </main>
    </div>
</section>
    );
};

export default CampDetails;