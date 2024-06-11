import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/Utility/imageUpload";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from "react";

// time picker 
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import useAxiosSecure from "../../hooks/useAxiosSecure";



const Add_Camp = () => {

    const axiosSecure = useAxiosSecure();

    const [campDate, setCampDate] = useState(new Date());
    const [campTime, setCampTime] = useState({});

    const[ processing , setProcessing] = useState(false);
 

    function onChange(value) {
        setCampTime(value);
      }


   
    const {  register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            ParticipantCount: 0 ,  
        },
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const imageFile = data.image[0];
       
        try{


            setProcessing(true);

            const imageURL = await imageUpload(imageFile);
            
            const time = campTime.format('HH:mm:ss');
            const newCamp = { CampName: data.CampName, Image: imageURL, HealthcareProfessional: data.HealthcareProfessional, Location: data.Location, CampFees: data.CampFees, ParticipantCount: data.ParticipantCount, Date: campDate, Time: time , Description: data.Description}
            
            console.log(newCamp);


            try{

                const res = await axiosSecure.post('/camps', newCamp)
                if (res.data.insertedId) {
                    setProcessing(false);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Camp created successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    navigate('/dashboard/manage_camp');
                }

            }
            catch(err)
            {
                setProcessing(false);
                Swal.fire(err.message)
            }


 
        
      
         
        
 
        }
        catch(err)
        {
            setProcessing(false);
         Swal.fire(err.message)
        }
        
     };


     if(processing)
     {
         return (
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
          );
     }
 

  



    return (
        <div className=" max-w-full">

            <h1 className=" text-xl font-bold text-center ">ADD CAMPS</h1>

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
                 <span className="label-text">Image</span>
             </label>
             <input {...register('image', { required: true })} type="file" className="" />
             {errors.image && <span className="text-red-600">Image is required</span>}
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
         <div className=" md:flex  md:flex-row lg:flex-row md:gap-5">
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
         <div className=" flex flex-col md:flex-row md:gap-5">
            <div className="flex-1">
             {/* time picker */}
          
          <div className="">
                     <div className='flex flex-col gap-2 '>
                         <label className="label">
                             <span className="label-text"> Camp Start Time </span>
                         </label>

                         <TimePicker st style={{ width: 100 }} showSecond={true} defaultValue={moment()} className="xxx"
         onChange={onChange} required />
                     </div>
                 </div>
          </div>
         <div className="flex-1">
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
        
         <div className="form-control mt-6">
             <input className="btn btn-primary" type="submit" value="ADD" />
         </div>
     </form>

 </div>
    );
};

export default Add_Camp;