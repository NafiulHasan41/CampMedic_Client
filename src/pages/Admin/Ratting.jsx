import useRatting from "../../hooks/useRatting";

// for ratting
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const Ratting = () => {


    const [ratting, rattingLoading] = useRatting();





    if(rattingLoading)
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
             <div className="overflow-x-auto max-h-screen overflow-y-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-[16px] text-blue-600 font-extrabold">ReviewerName</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">ReviewerEmail</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">Ratting</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">CampName</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">Review</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {ratting?.map(camp =>
                            <tr key={camp?._id} className="bg-blue-100 text-black">
                                <td className="w-3/10">
                                    <div className="flex items-center gap-">
                                    <div className="avatar">
                                     <div className="mask mask-squircle w-12 h-12">
                                      <img src={camp?.ReviewerImage} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                         </div>
                                        <div>
                                            <div className="font-bold">{camp?.ReviewerName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="w-1/10">{camp?.ReviewerEmail}</td>
                                <td className="font-extrabold w-1/10">
                                <Rating style={{ maxWidth: 250 }} value={ camp?.Ratting} readOnly />
                                </td>
                                <td className="w-1/10">
                                   {camp?.CampName}
                                </td>
                                <td className="w-1/10">
                                   {camp?.Review}
                                </td>
                           
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ratting;