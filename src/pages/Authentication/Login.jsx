import { Link , useLocation , useNavigate } from "react-router-dom";
import {  useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoEye ,IoEyeOff } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2"
import SocialLogin from "./SocialLogin";




const Login = () => {


    const {  signIn  } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    


    

    const handleLogin = async e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
      
        try {
            //User Login
             await signIn(email, password)
         
             Swal.fire({
                title: 'User Login Successful.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });

            if( location.state === "/login")
                {
                  navigate("/")
                }
                else
                {
                  navigate(location?.state ? location.state.from : "/");
                }


          } catch (err) {
            console.log(err)
            Swal.fire(err?.message)
          }
    }

    


     const [ pass , setPass] = useState(false);




    return (
        <div className="w-[95%] mx-auto mb-10">

          <Helmet>
            <title> CampMedic  : Login</title>
        </Helmet>
       <div className="hero gap-1 md:min-h-[500px] mt-3 ">
        <div className="hero-content w-full mx-auto flex-col lg:flex-row-reverse">
            <div className=" flex-1 text-center lg:text-left">
                <img className=" w-full rounded-xl" src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?w=360" alt="" />
            </div>
            <div className=" flex-1 card shrink-0 w-full max-w-sm md:max-w-full shadow-2xl bg-[#40E0D0] ">
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-[#86664b] font-bold">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl text-[#86664b] font-bold">Password</span>
                            
                        </label>
                       <div className=" relative"> 

                       <input type={ pass? "text" : "password"} name="password" placeholder="password" className="input input-bordered w-full" required />
                        <span  onClick={() => setPass(!pass)} className=" text-2xl absolute top-3 right-3">{ pass ? <IoEye/> : <IoEyeOff/> }</span>

                       </div>
                        
                       
                        
                       
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn  text-[#86664b] border-none text-xs md:text-xl ">Login</button>
                    </div>

                </form>

                <div className=" text-center">
                     <p className=" mb-2 text-[#86664b] text-center text-xl"> Login with </p>
                     <SocialLogin/>                   
                </div>

                <label className="label text-center  justify-center text-xl">
                        <p className=" mx-3 text-[#86664b] font-bold"> New User ?</p>    <Link to="/register"  className="label-text-alt btn  border-none  text-xl text-[#86664b]"> Register</Link>
                        </label>
            </div>
        </div>
    </div>
   
</div>
    );
};


export default Login;