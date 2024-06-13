import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "../Modal/Payment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_API_KEY);


const Pay = () => {

    const axiosSecure = useAxiosSecure();
    const id = useParams().campId;
    

    const {data: camp = [], isPending: loading} = useQuery({
        queryKey: ['SingleCamp'], 
        queryFn: async() =>{
            const res = await axiosSecure.get(`/participant-details/${id}`);
            // console.log("camp", res.data);
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
      
    //   console.log(camp);

     
    return (
        <div>
            <div className="flex flex-col md:flex-row  md:justify-between p-5 ">
            <h3 className="text-lg my-3 font-medium leading-6 text-gray-800 capitalize dark:text-white"
                         >
                          Pay Now 
              </h3>
              <h3 className="text-lg my-3 font-medium leading-6 text-gray-800 capitalize dark:text-white"
                         >
                         Your total amount is <span className="text-red-500">${camp?.CampFees}</span>
              </h3>
            </div>
            
            <Elements stripe={stripePromise}>
             <Payment camp={camp} />
          </Elements>
        </div>
    );
};

export default Pay;