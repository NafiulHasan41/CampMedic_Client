import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// for chart 
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
  import { ResponsiveContainer } from 'recharts';
import useAuth from "../../hooks/useAuth";
import { FaUsers } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { MdOutlineEmojiPeople } from "react-icons/md";


const AdminHome = () => {

     const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const {data: campData = [], isPending: campPriceLoading} = useQuery({
        queryKey: ['campData'], 
        queryFn: async() =>{
            const res = await axiosSecure.get('/camps_data');
            return res.data;
        }
    })

    // console.log(campData)

    if(campPriceLoading)
        {
            return <div className="text-center">
        <section className="bg-white min-h-screen">
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
        }
    return (
        <div>
     <div>
         <h1 className="text-2xl text-[#40E0D0] font-bold text-center my-4">{`Welcome "${user?.displayName}" to Admin
             Panel`}</h1>
     </div>

     <div>
         <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-gray-200">

             <div className="stat">
                 <div className="stat-title font-bold text-[#40E0D0]">Total Revenue</div>
                 <div className="stat-value">${campData?.revenue}</div>
               
             </div>
             <div className="stat">
                 <div className="stat-title font-bold text-[#40E0D0]">Total User</div>
                 <div className="stat-value flex gap-3"><FaUsers /> {campData?.userCount}</div>
               
             </div>
             <div className="stat">
                 <div className="stat-title font-bold text-[#40E0D0]">Total Camps</div>
                 <div className="stat-value flex gap-3"><GiCampingTent /> {campData?.campCount}</div>
               
             </div>
             <div className="stat">
                 <div className="stat-title font-bold text-[#40E0D0]">Total Participant</div>
                 <div className="stat-value flex gap-3"><MdOutlineEmojiPeople />{campData?.participantCount}</div>
               
             </div>

        

         </div>
     </div>

     <div id="saleDataPerDay">
         <h1 className="text-2xl font-bold text-center my-4">Sale Data Per Day</h1>
         <div className=" overflow-x-auto bg-gray-200 p-3 rounded-lg">

             <ResponsiveContainer width="100%" height={300}>
                 <LineChart data={campData?.PaymentData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="_id" padding={{ left: 30, right: 30 }} />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Line type="monotone" dataKey="totalPrice" stroke="#40E0D0" activeDot={{ r: 8 }} />
                 </LineChart>
             </ResponsiveContainer>
         </div>

     </div>
 </div>
    );
};

export default AdminHome;