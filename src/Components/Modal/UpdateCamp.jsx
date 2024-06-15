import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import PropTypes from 'prop-types';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import Swal from "sweetalert2";
import { imageUpload } from "../../api/Utility/imageUpload";



const UpdateCamp = ({camp , refetch  } ) => {
    
    
    //modal open and close 
    const [isOpen, setIsOpen] = useState(false);

    const[newImageUrl  , setNewImageUrl] = useState('');

    // update form 
    const axiosSecure = useAxiosSecure();

    const [campDate, setCampDate] = useState(new Date());
    const [campTime, setCampTime] = useState({});

    useEffect(()=>{
        setCampDate(new Date(camp?.Date));
        setCampTime(moment(camp?.Time, 'HH:mm:ss'));
        setNewImageUrl(camp?.Image);
      
        

    },[camp])
    
    // camp time picker 
    function onChange(value) {
        setCampTime(value);
      }
      
      const {  register, handleSubmit,  formState: { errors } } = useForm({
        defaultValues: {
            CampName: camp?.CampName,
            HealthcareProfessional: camp?.HealthcareProfessional,
            Location: camp?.Location,
            CampFees: parseInt(camp?.CampFees),
            Description: camp?.Description,
            ParticipantCount: parseInt(camp?.ParticipantCount) ,  
        },
    });
     

    //handle update

    const onSubmit = async (data) => {

        setIsOpen(false);

        const imageFile = data?.image[0];
       
        try{

            let imageURL;
           
            if(imageFile)
                {
                    
                    imageURL = await imageUpload(imageFile);
                   
                   
                }
            
                const image_url = imageURL ? imageURL : newImageUrl;
                
            const time = campTime.format('HH:mm:ss');
            const newCamp = { CampName: data.CampName, Image: image_url , HealthcareProfessional: data.HealthcareProfessional, Location: data.Location, CampFees: data.CampFees.toString()  , ParticipantCount: data.ParticipantCount, Date: campDate, Time: time , Description: data.Description}
            
            // console.log(newCamp);


          
            const res = await axiosSecure.put(`/update-camp/${camp?._id}`, newCamp);
            if (res.data.modifiedCount) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Camp updated successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }

 
        
      
         
        
 
        }
        catch(err)
        {
            
         Swal.fire(err.message)
        }
        
     };



    return (
        <div>
            
      <div className="relative flex justify-center">
          
              <button onClick={()=> setIsOpen(true)} className="btn bg-green-500 text-white hover:scale-110 ">
              <FaEdit /></button>

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
                          Update Camp
                      </h3>
                        {/* Form area */}

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
         <div className="form-control">
             <label className="label">
                 <span className="label-text">CampName</span>
             </label>
             <input type="text" {...register("CampName", { required: true })} name="CampName" placeholder="CampName"
                 className="input input-bordered" />
             {errors.CampName && <span className="text-red-600">CampName is required</span>}
         </div>
         <div className="form-control">
             <label className="label">
                 <span className="label-text">New  Image</span>
             </label>
             <input {...register('image', {  })} type="file" className="" />
             <img className=" w-20 h-20 my-2" src={newImageUrl} alt="" />
            <p>{newImageUrl}</p>
         </div>
         <div className="form-control">
             <label className="label">
                 <span className="label-text">Health Care Professional Name</span>
             </label>
             <input type="text" {...register("HealthcareProfessional", { required: true })} name="HealthcareProfessional" placeholder="Health care professional name"
                 className="input input-bordered" />
             {errors.HealthcareProfessional && <span className="text-red-600">Health care professional name is required</span>}
         </div>
         <div className="form-control">
             <label className="label">
                 <span className="label-text">Camp Location</span>
             </label>
             <input type="text" {...register("Location", { required: true })} name="Location" placeholder="Location"
                 className="input input-bordered " />
             {errors.Location && <span className="text-red-600">Location is required</span>}
         </div>
         <div className=" ">
         <div className="form-control flex-1">
             <label className="label">
                 <span className="label-text">Camp Fees</span>
             </label>
             <input type="number"  {...register("CampFees", { required: true })} name="CampFees" placeholder="$200"
                 className="input input-bordered " />
             {errors.CampFees && <span className="text-red-600">CampFees is required</span>}
         </div>
         <div className="form-control flex-1">
             <label className="label">
                 <span className="label-text">Participant count</span>
             </label>
             <input type="number" {...register("ParticipantCount", { required: true , })} name="ParticipantCount" placeholder="ParticipantCount"
                 className="input input-bordered " readOnly />
             {errors.ParticipantCount && <span className="text-red-600">ParticipantCount is required</span>}
         </div>
       
         </div>
         <div className=" ">
            <div className="">
             {/* time picker */}
          
          <div className="">
                     <div className='flex flex-col gap-2 '>
                         <label className="label">
                             <span className="label-text"> Camp Start Time </span>
                         </label>

                         <TimePicker st style={{ width: 100 }} showSecond={true} defaultValue={campTime} className="xxx"
         onChange={onChange} required />
                     </div>
                 </div>
          </div>
         <div className="">
           {/* date picker */}
           <div className="">
                     <div className='flex flex-col gap-2 '>
                         <label className="label">
                             <span className="label-text"> Camp Start Date </span>
                         </label>

                         {/* Date Picker Input Field */}
                         <DatePicker
                          showIcon
                        
                           closeOnScroll={true}
                           toggleCalendarOnIconClick
                          className='border p-2 rounded-md' selected={campDate} onChange={date=>
                             setCampDate(date)}
                             required
                             />
                     </div>
                 </div>
         </div>
         </div>
         <div className="form-control">
             <label className="label">
                 <span className="label-text">Camp Description</span>
             </label>
             <input type="text" {...register("Description", { required: true })} name="Description" placeholder="Description"
                 className="input input-bordered text-start h-40" />
             {errors.Description && <span className="text-red-600">Description is required</span>}
         </div>
        
         <div className="form-control mt-6 flex flex-row">
         <button type="button" onClick={()=> setIsOpen(false)}
                                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize
                                  transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2
                                  sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800
                                  hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300
                                  focus:ring-opacity-40"
                                  >
                                  Cancel
                              </button>
             <input className="btn bg-cyan-400 hover:scale-110" type="submit" value="Update" />
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

UpdateCamp.propTypes = {
    camp: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
  
};

export default UpdateCamp;