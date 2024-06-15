import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { GiCampingTent } from "react-icons/gi";
import { FcCancel, FcPaid } from "react-icons/fc";

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


const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: userData = [], isPending: userDataLoading} = useQuery({
        queryKey: ['userData'], 
        queryFn: async() =>{
            const res = await axiosSecure.get(`/user_Data/${user?.email}`);
            return res.data;
        }
    })


    if(userDataLoading)
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
            <h1 className="text-2xl text-[#40E0D0] font-bold text-center my-4">{`Welcome "${user?.displayName}" to your panel`}</h1>
         </div>

         <div>
         <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-gray-200">

             <div className="stat">
                 <div className="stat-title font-bold text-[#40E0D0]">Total Paid</div>
                 <div className="stat-value">${userData?.totalPaid}</div>
               
             </div>
             <div className="stat">
                 <div className="stat-title font-bold text-[#40E0D0]">Total PayCount</div>
                 <div className="stat-value flex gap-3"><FcPaid /> {userData?.paymentCount}</div>
               
             </div>
             <div className="stat">
                 <div className="stat-title font-bold text-[#40E0D0]">Total UnpaidCount</div>
                 <div className="stat-value flex gap-3 text-red-500"><FcCancel /> {userData?.unpaidCount}</div>
               
             </div>
             <div className="stat">
                 <div className="stat-title font-bold text-[#40E0D0]">Total ParticipatedCamp</div>
                 <div className="stat-value flex gap-3"><GiCampingTent />{userData?.participantCount}</div>
               
             </div>

        

         </div>
     </div>
       
     <div id="paidPerDay">
         <h1 className="text-2xl font-bold text-center my-4 md:my-10">Participated Camps</h1>
         <div className=" overflow-x-auto bg-gray-200 p-3 rounded-lg">

             <ResponsiveContainer width="100%" height={300}>
                 <LineChart data={userData?.participantDataCampParticipation}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="CampName" padding={{ left: 30, right: 30 }} />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Line type="monotone" dataKey="CampFees" stroke="#40E0D0" activeDot={{ r: 8 }} />
                 </LineChart>
             </ResponsiveContainer>
         </div>

     </div>
     <div className=" my-4 md:my-10">
         <h1 className="text-2xl font-bold text-center my-4 md:my-10">Paid Per Day on Camps</h1>
         <div className=" overflow-x-auto bg-gray-200 p-3 rounded-lg">

             <ResponsiveContainer width="100%" height={300}>
                 <LineChart data={userData?.paymentPerDate}>
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

export default UserHome;