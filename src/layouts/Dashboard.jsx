import {  FaCalendar, FaHome, FaList, FaSearch, FaUsers } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";

import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { VscFeedback } from "react-icons/vsc";



const Dashboard = () => {
      
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
      <div className=" flex flex-col lg:flex-row m-3 lg:m-10 lg:gap-8  ">
        <div className=" lg:w-1/4 border-none sm:border-2 rounded-xl ">
          <div className=" border-black border-2 rounded-xl w-full">
            <nav className="  relative bg-[#40E0D0] rounded-xl  shadow-xl ">
              <div className="container px-3 py-3 mx-auto">
                <div className="lg:flex lg:flex-col lg:items-center lg:justify-between">
                  <div className="flex flex-col items-end lg:items-center  lg:justify-between">
                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                      <p className=" font-semibold text-blue-500 mx-2">Option</p>
                      <button
                        onClick={toggleMenu}
                        type="button"
                        className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                        aria-label="toggle menu"
                      >
                        {!isOpen ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 8h16M4 16h16"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                  <div
                    className={`absolute  inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300
                                ease-in-out bg-[#40E0D0] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-full
                                lg:opacity-100 lg:translate-x-0 flex flex-col-reverse lg:flex lg:flex-row lg:items-start
                                ${
                                  isOpen
                                    ? "translate-x-0 opacity-100 "
                                    : "opacity-0 -translate-x-full"
                                }`}
                  >
                    <div className="flex flex-col my-5 ml-2 space-y-2 lg:space-y-8  lg:min-h-[calc(100vh-50px)]">
                      {/* dashboard side bar */}
                      <div className=" w-full">
                        <ul className="menu p-4">
                          <li>
                            <div className="flex flex-col items-center mt-6 -mx-2">
                              <img
                                className="object-cover w-24 h-24 mx-2 rounded-full"
                                src={user?.photoURL}
                                alt="avatar"
                              />
                              <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
                                {user?.displayName}
                              </h4>
                              <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                {user?.email}
                              </p>
                            </div>
                          </li>
                          <div className="divider font-extrabold" ></div>
                          {isAdmin ? (
                            <>
                              <li>
                                <NavLink to="/dashboard/admin_home">
                                  <FaHome></FaHome>
                                  ADMIN HOME
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/dashboard/add_camp">
                                  <IoMdAddCircleOutline />
                                  ADD CAMPS
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/dashboard/manageItems">
                                  <FaList></FaList>
                                  MANAGE CAMPS
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to="/dashboard/users">
                                  <FaUsers></FaUsers>
                                 REGISTERED CAMPS
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/dashboard/usersQuery">
                                  <FaUsers></FaUsers>
                                  USER REVIEW
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/dashboard/usersQuery">
                                <VscFeedback />
                                 USER FEEDBACK
                                 </NavLink>
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <NavLink to="/dashboard/userHome">
                                  <FaHome></FaHome>
                                  User Home
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/dashboard/userHome">
                                  <FaHome></FaHome>
                                  User Home
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/dashboard/orderHistory">
                                  <FaCalendar></FaCalendar>
                                  Order History
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to="/dashboard/payment">
                                  <FaList></FaList>
                                  Payment
                                </NavLink>
                              </li>
                            </>
                          )}
                          {/* shared nav links */}
                          <div className="divider text-black" > Common</div>
                          <li>
                            <NavLink to="/">
                              <FaHome></FaHome>
                              Home
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/availableCamps">
                              <FaSearch></FaSearch>
                              All Available Camp
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="lg:w-3/4 m-5 md:m-5">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;