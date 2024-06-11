import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Manage_camps = () => {
    const axiosSecure = useAxiosSecure();
   
    const {data: Camps = [], isPending , } = useQuery({
        queryKey: ['CampsPopular'], 
        queryFn: async() =>{
            const res = await axiosSecure.get('/all-camps');
            return res.data;
        }
    })

    if(isPending) return <div className="text-center">
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

const handleDelete = async campId => {

    Swal.fire({
        title: 'Are you sure want to delete it?',
        text: "You won't be able to undo this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
        if (result.isConfirmed) {
         
            try {
                 await axiosSecure.delete(`/delete-camp/${campId}`)
                Swal.fire('Delete Successful')
                
              } catch (err) {
                Swal.fire(err.message)
              }
            }
         
        }
    )





    

}





    return (


        <div>
      <div className="overflow-x-auto  max-h-screen overflow-y-auto ">
          <table className="table">
              {/* head */}
              <thead>
                  <tr>
                      <th className=" text-[16px] text-blue-600 font-extrabold">CampName</th>
                      <th className=" text-[16px] text-blue-600 font-extrabold">HealthcareProfessional</th>
                      <th className=" text-[16px] text-blue-600 font-extrabold">Date & Time</th>
                      <th className=" text-[16px] text-blue-600 font-extrabold">Fees</th>
                      <th className=" text-[16px] text-blue-600 font-extrabold">ParticipantCount</th>
                      <th className=" text-[16px] text-blue-600 font-extrabold">Location</th>
                      <th className=" text-[16px] text-blue-600 font-extrabold">Details</th>

                  </tr>
              </thead>
              <tbody >
                  {/* row 1 */}

                  {
                  Camps?.map(camp =>

                  <tr key={camp?._id} className=" bg-blue-100 text-black">
                      <td>
                          <div className="flex items-center gap-3">
                              <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                      <img src={camp?.Image} alt="Avatar Tailwind CSS Component" />
                                  </div>
                              </div>
                              <div>
                                  <div className="font-bold">{camp?.CampName}</div>
                                  <div className="text-sm opacity-50">{camp?.Description}</div>
                              </div>
                          </div>
                      </td>
                      <td className=" font-extrabold">
                          {camp?.HealthcareProfessional}
                      </td>
                      <td>
                          Date: {new Date(camp?.Date).toLocaleDateString()}
                          & Time:{camp?.Time}
                      </td>
                      <td>
                          {camp?.CampFees}
                      </td>
                      <td>
                          {camp?.ParticipantCount}
                      </td>
                      <td>
                          {camp?.Location}
                      </td>

                      <td>

                          <button onClick={()=> handleDelete(camp._id)} className="btn bg-red-500
                              text-white">Delete</button>

                          <Link to={`update-camp/${camp?._id}`}> <button className="btn bg-green-500 text-white">
                          Update</button>
                          </Link>
                      </td>
                  </tr>
                  )
                  }

              </tbody>

          </table>
      </div>
  </div>
    );
};

export default Manage_camps;