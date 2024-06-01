import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
// import useAdmin from "../../hooks/useAdmin";





const Navbar = () => {

    const { user , loading , logOut , setLoading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // const [isAdmin] = useAdmin();



    // Theme control 

    const [theme, setTheme] = useState('light')

    const handleToggle = e => {
        if (e.target.checked) {
          setTheme('dark')
        } else {
          setTheme('light')
        }
      }

      useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
    
        // add custom data-theme attribute
        document.querySelector('html').setAttribute('data-theme', localTheme)
      }, [theme])


    //   theme control end

      //control navigation 

      const navigate = useNavigate();


    


    

      if (loading) {
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
      

       


       

        const handleLogOut = () => {
            logOut()
              .then(() => {
                setLoading(false);
                Swal.fire("User Logged out Successfully");
                navigate("/login");
                
              })
              .catch((error) => {
                Swal.fire(error.message);
              });
          };

          const customNavLink = (
            <>
             
                <NavLink to="/"  className={({ isActive }) =>
                      isActive ? " text-white hover:bg-cyan-700 font-bold   border-none" : "font-bold my-2 hover:bg-cyan-300  md:mx-2  text-[#278e83] rounded-lg  border-none"
                    }>Home</NavLink>

                <NavLink to="/availableCamps"  className={({ isActive }) =>
                      isActive ? " text-white hover:bg-cyan-700 font-bold   border-none" : "font-bold my-2 hover:bg-cyan-300  md:mx-2  text-[#238279] rounded-lg  border-none"
                    }>AvailableCamps</NavLink>

                  
        
            </>
          );

    



    return (
        <div>
       <div>
           <nav className=" relative  bg-[#40E0D0]/30 ">
               <div className="container  px-3 py-3 mx-auto">
                   <div className="flex justify-between  lg:flex lg:items-center  lg:justify-between">
                       <div className="flex items-center justify-between">

                           <div className="flex gap-2">
                               <Link to='/'>
                               <img className="w-full h-10 sm:h-10 rounded-lg" src="/src/assets/campmediclogo.jpeg"
                                   alt="logo" />
                               </Link>

                           </div>

                          
                       </div>
                       <div className="flex flex-row  items-center md:flex-row-reverse lg:items-center md:mt-4 lg:mt-0 md:gap-4 md:my-3">

                           <div>
                               <div className="flex flex-row  items-center lg:items-center md:mt-4 lg:mt-0 md:gap-4 md:my-3">

                                   <div className="  mx-1 md:mx-2">
                                       <label className="swap swap-rotate">
                                           {/* this hidden checkbox controls the state */}
                                           <input type="checkbox" className="theme-controller "
                                               onChange={handleToggle} />

                                           {/* sun icon */}
                                           <svg className="swap-off fill-current w-8 h-8 md:w-10 md:h-10 text-white"
                                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                               <path
                                                   d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                           </svg>

                                           {/* moon icon */}
                                           <svg className="swap-on fill-current w-8 h-8  md:w-10 md:h-10 text-black"
                                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                               <path
                                                   d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                           </svg>
                                       </label>
                                   </div>

                                   <div>
                                       {user ? (
                                       <>
                                           <div className="dropdown dropdown-end">
                                               <div tabIndex={0} role="button"
                                                   className="btn btn-ghost btn-circle avatar">
                                                   <div className=" w-8 md:w-10 rounded-full">
                                                       <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                                   </div>
                                               </div>
                                               <ul tabIndex={0}
                                                   className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                                   <li>
                                                       <p className="justify-between">
                                                           {user?.displayName}
                                                       </p>
                                                   </li>
                                                   <li><a>Dashboard</a></li>
                                                   <li><button onClick={handleLogOut}
                                                           className="btn  hover:bg-cyan-700  lg:text-xl  bg-white border-none text-black">
                                                           Logout
                                                       </button></li>
                                               </ul>
                                           </div>
                                       </>

                                       ) : (
                                       <Link to="/login"
                                           className="btn rounded-full bg-white hover:bg-cyan-700  border-none text-black">
                                       Join Us
                                       </Link>
                                       )}
                                   </div>

                               </div>
                           </div>
                           <div>
                             {/* Mobile menu button */}
                           <div className="flex lg:hidden">
                               <button onClick={toggleMenu} type="button"
                                   className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                   aria-label="toggle menu">
                                   {!isOpen ? (
                                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                       <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                   </svg>
                                   ) : (
                                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                       viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                   </svg>
                                   )}
                               </button>

                           </div>

                               {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                           <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300
                               ease-in-out bg-[#a0c5c4] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto
                               lg:opacity-100 lg:translate-x-0 flex flex-col-reverse lg:flex lg:flex-row lg:items-center
                               ${isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full' }`}>
                               <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                                   {customNavLink}
                               </div>

                           </div>

                           </div>
                          
                       </div>

                   </div>
               </div>
           </nav>
       </div>

   </div>
    );
};

export default Navbar;