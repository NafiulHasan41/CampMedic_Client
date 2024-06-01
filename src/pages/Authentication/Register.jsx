import {  useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";
import { IoEye ,IoEyeOff } from "react-icons/io5";
import { imageUpload } from "../../api/Utility/imageUpload";
import useAuth from "../../hooks/useAuth";



const Register = () => {  const axiosPublic = useAxiosPublic();
    const {  register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    const [ pass , setPass] = useState(false);

    const onSubmit = async (data) => {
       const imageFile = data.image[0];
       try{

        const imageURL = await imageUpload(imageFile);
     
    
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log("logged in user" , loggedUser);
                updateUserProfile(data.name, imageURL)
                    .then( async() => {
                       
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }

                        try{

                            const res = await  axiosPublic.post('/users', userInfo)
                           
                            if (res.data.insertedId) {

                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                reset();
                                navigate('/');
                            }

                        }
                        
                        catch (error) {

                            Swal.fire(error.message)
                        } 

                    })
                    .catch(error => Swal.fire(error.message))
            })

       }
       catch(err)
       {
        Swal.fire(err.message)
       }
       
    };






        return (
            <>
                <Helmet>
                    <title>CampMedic  | Register</title>
                </Helmet>
                <div className="hero min-h-screen  ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="flex-1 text-center lg:text-left">
                        <img className=" md:w-full rounded-xl" src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?w=360" alt="" />
                        </div>
                        <div className=" flex-1 card flex-shrink-0 w-full max-w-sm shadow-2xl bg-[#40E0D0]">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
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
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type={ pass? "text" : "password"}   {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} placeholder="password" className="input input-bordered" />
                                     <span  onClick={() => setPass(!pass)} className=" text-2xl absolute top-12 right-3">{ pass ? <IoEye/> : <IoEyeOff/> }</span>
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                    
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Register" />
                                </div>
                            </form>
                            <SocialLogin></SocialLogin>
                            <p className="p-6"><small>Already have an account <Link to="/login"><button className="btn text-xl font-bold text-blue-500">Login</button> </Link></small></p>
                            
                        </div>
                    </div>
                </div>
            </>
        );
    };

export default Register;