import { useState } from "react";
import PropTypes from 'prop-types';
import { MdOutlineAttachMoney } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

import Select from 'react-select';
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const options = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' }
];

const JoinModal = ({camp , refetch }) => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    // select option 

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
      
    };

    //handle submission

    const handleJoin = async (e) => {
        e.preventDefault();

        setIsOpen(false);

        const form = e.target;
        const CampId = camp._id;
        const CampName = camp.CampName;
        const CampFees = camp.CampFees;
        const Location = camp.Location;
        const HealthcareProfessional = camp.HealthcareProfessional;
        const ParticipantName = user.displayName;
        const ParticipantEmail = user.email;
        const age = parseInt(form.age.value);
        const PhoneNumber = parseInt(form.phoneNumber.value);
        const EmergencyContact = parseInt(form.emergencyContact.value);
        const Gender = selectedOption.value;

        const participant = {CampId, CampName, CampFees, Location, HealthcareProfessional, ParticipantName, ParticipantEmail, age, PhoneNumber, EmergencyContact, Gender};

      

        try{

            const res = await  axiosSecure.post('/join-camp', participant);

          

    

            if(res.data.insertedId)
                {
                    Swal.fire(`"${ParticipantName} , you have successfully joined the camp"`)
                }

                else{

                    Swal.fire(`"${ParticipantName} , you have already joined the camp", "error"`)
                }
            
                refetch();

           

        }
        catch(err){
            Swal.fire(err?.message)
        }


    }



    return (
        <div>

      <div className="relative flex justify-center">
          <button onClick={()=> setIsOpen(true)} className=" btn bg-[#40E0D0] font-bold text-xl hover:bg-cyan-200
              hover:scale-110 rounded-full border-none ">Join Camp</button>

          {isOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
              aria-modal="true">
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                      &#8203;
                  </span>

                  <div
                      className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-[#40E0D0] rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                      <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                          id="modal-title">
                          Join Our Camp
                      </h3>

                      <form onSubmit={handleJoin} className="mt-4" action="#">
                          <div className="flex items-center px-6 py-3 bg-gray-900 rounded-lg">

                              <h1 className="mx-3 text-lg font-semibold text-white">{camp.CampName}</h1>

                          </div>
                          <div className="my-1">
                              <h1 className="text-xl text-center font-semibold text-gray-800 dark:text-white">
                                  {camp.HealthcareProfessional}</h1>
                          </div>

                          <div className=" my-1 gap-1 flex">
                              <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
                                  <svg aria-label="location pin icon" className="w-6 h-6 fill-current"
                                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd"
                                          d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z" />
                                      <path fillRule="evenodd" clipRule="evenodd"
                                          d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z" />
                                  </svg>

                                  <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.Location}</h1>
                              </div>

                              <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
                                  <MdOutlineAttachMoney />

                                  <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.CampFees}</h1>
                              </div>

                          </div>

                          <div>
                              <div>
                                  <h1 className="text-white"><span className="text-black font-bold">Participant Name
                                          :</span> {user.displayName} </h1>
                                  <h1 className="text-white"><span className="text-black font-bold">Participant Email
                                          :</span> {user.email} </h1>
                              </div>
                          </div>
                          <div>
                              <div className="form-control my-1">
                                  <input type="number" name="age" placeholder="Your Age" className="p-1 rounded-lg "
                                      required />
                              </div>

                          </div>

                          {/* gender select */}

                          <Select options={options} value={selectedOption} onChange={handleChange} />

                          <div className="form-control mt-1">
                              <input type="number" name="phoneNumber" placeholder="Your Phone number"
                                  className="p-1 rounded-lg " required />
                          </div>

                          <div className="form-control mt-1">
                              <input type="number" name="emergencyContact" placeholder="Your Emergency Contact"
                                  className="p-1 rounded-lg " required />
                          </div>

                          <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                              <button type="button" onClick={()=> setIsOpen(false)}
                                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize
                                  transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2
                                  sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800
                                  hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300
                                  focus:ring-opacity-40"
                                  >
                                  Cancel
                              </button>

                              <button type="submit"
                                  
                                  className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                  Join
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          )}
      </div>

  </div>
    );
};
JoinModal.propTypes = {
    camp: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default JoinModal;