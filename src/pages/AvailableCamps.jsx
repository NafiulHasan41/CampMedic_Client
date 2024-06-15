import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { TfiLayoutColumn2Alt, TfiLayoutColumn3Alt } from "react-icons/tfi";
import CampCard from "../Components/MedicalCamps/CampCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";


const AvailableCamps = () => {
  
  const axiosPublic = useAxiosPublic();


    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    // For handling all sideBar action

   const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)
  const [columnCount, setColumnCount] = useState(true);

  const showColumn =  columnCount ? "lg:grid-cols-3" : "lg:grid-cols-2";

  // console.log(showColumn);
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const [camps, setCamps] = useState([])



  // using Axios

  const fetchCamps = async ({ queryKey }) => {
    
    const [  ,currentPage, itemsPerPage, search, sort] = queryKey;
    // console.log("Inside" ,currentPage, itemsPerPage)
    const response = await axiosPublic.get(`/camps?page=${currentPage}&size=${itemsPerPage}&sort=${sort}&search=${search}`);
    return response.data;
    
  };


  
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ['camps', currentPage, itemsPerPage, search, sort], 
    queryFn: fetchCamps
  });
  
  useEffect(() => {
    if (!isLoading && !isError) {
      setCamps(data);
    }
  }, [data, isLoading, isError]);

 

  //fetching camp count
  const fetchCampCount = async ({ queryKey }) => {
    const [ , search ] = queryKey;
    const response = await axiosPublic.get(`/camps_count?search=${search}`);
    return response.data;
  };
  
  const { data:campCount, isLoading: countLoading , isError: countError } = useQuery({ 
    queryKey: ['campCount', search], 
    queryFn: fetchCampCount 
  });
  
  useEffect(() => {
    if (!countLoading && !countError) {
      setCount(campCount.count);
    }
  }, [campCount,countError,countLoading]);

  // console.log(count);

 //pagination
  const numberOfPages = Math.ceil(count / itemsPerPage)
  const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

  //  handle pagination button
  const handlePaginationButton = value => {
   
    setCurrentPage(value)
  }


  const handleReset = () => {
    setSort('')
    setSearch('')
    setSearchText('')

  }

  const handleSearch = e => {
    e.preventDefault()

    setSearch(searchText)
  }



  if (isLoading) {
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
        <div>
            <Helmet>
            <title>CampMedic : Available Camps</title>
            </Helmet>

             <div className=" flex flex-col lg:flex-row m-3 lg:m-10 lg:gap-8 ">
        <div className=" lg:w-1/4 border-none sm:border-2 rounded-xl ">
            <div className=" border-black border-2 rounded-xl">
                <nav className="  relative bg-[#a0c5c4] rounded-xl  shadow-xl ">
                    <div className="container px-3 py-3 mx-auto">
                        <div className="lg:flex lg:flex-col lg:items-center lg:justify-between">
                            <div className="flex flex-col items-end lg:items-center  lg:justify-between">
                                <form onSubmit={handleSearch}>
                                    <div className="flex m-2 flex-row justify-center">
                                        <input id="search" type="text"
                                            className="px-1 py-1 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                                            onChange={e=> setSearchText(e.target.value)}
                                        value={searchText}
                                        name='search'
                                        placeholder='Enter Search Text'
                                        aria-label='Enter Search Text' />
 
                                        <button
                                            className=" px-2 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-400 font-bold rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                            Search
                                        </button>
                                    </div>
                                </form>
 
                                {/* Mobile menu button */}
                                <div className="flex lg:hidden">
                                    <p className=" font-semibold text-blue-500">Filter</p>
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
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
 
                            {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                            <div className={`absolute  inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300
                                ease-in-out bg-[#a0c5c4] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-full
                                lg:opacity-100 lg:translate-x-0 flex flex-col-reverse lg:flex lg:flex-row lg:items-start
                                ${isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full' }`}>
                                <div
                                    className="flex flex-col my-5 ml-2 space-y-2 lg:space-y-8  min-h-[calc(100vh-50px)]">
 
                                    <div>
                                        <button onClick={handleReset}
                                            className='btn hover:scale-[1.15] text-black text-xl w-full'>
                                            Reset
                                        </button>
                                    </div>

                                    <div className=" hidden  lg:flex lg:justify-between text-3xl p-2">
                                        <p className="mr-2 text-white">Column : </p>
                                        {
                                            columnCount ? <TfiLayoutColumn3Alt onClick={()=> setColumnCount(!columnCount)} /> : <TfiLayoutColumn2Alt onClick={()=> setColumnCount(!columnCount)} />
                                        }
                                    </div>
                          
 
                                    <div>
                                        <select onChange={e=> {
                                            setSort(e.target.value)
                                            setCurrentPage(1)
                                            }}
                                            value={sort}
                                            name='sort'
                                            id='sort'
                                            className='p-4 rounded-md text-black border-none w-full'
                                            >
                                            <option value=''>Sort By </option>
                                            <option value='Most Registered'>Most Registered</option>
                                            <option value='Camp Fees'>Camp Fees</option>
                                            <option value='Alphabetical Order'>Alphabetical Order</option>
                                        </select>
 
                                    </div>


                                
 
                                   

                                   
 
                                </div>
 
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div className="lg:w-3/4">
 
 
 
 
           
 
  {/* for for showing camp all cart showing  */}
             <div className={` grid grid-cols-1 md:grid-cols-2 ${showColumn}  gap-5 justify-items-center gap-y-5 lg:gap-y-10`}>

                {
                      camps.map((camp) => (
                        <CampCard key={camp._id} camp={camp}/>
                    ))
                }
               
             </div>
 
            {/* pagination */}
            <div className='flex justify-center mt-12 overflow-x-auto w-full' >
         {/* Previous Button */}
         <button
           disabled={currentPage === 1}
           onClick={() => handlePaginationButton(currentPage - 1)}
           className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
         >
           <div className='flex items-center -mx-1'>
             <svg
               xmlns='http://www.w3.org/2000/svg'
               className='w-6 h-6 mx-1 rtl:-scale-x-100'
               fill='none'
               viewBox='0 0 24 24'
               stroke='currentColor'
             >
               <path
                 strokeLinecap='round'
                 strokeLinejoin='round'
                 strokeWidth='2'
                 d='M7 16l-4-4m0 0l4-4m-4 4h18'
               />
             </svg>
 
             <span className='mx-1'>previous</span>
           </div>
         </button>
         {/* Numbers */}
         {pages.map(btnNum => (
           <button
             onClick={() => handlePaginationButton(btnNum)}
             key={btnNum}
             className={`hidden ${
               currentPage === btnNum ? 'bg-[#a0c5c4] text-white' : ''
             } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
           >
             {btnNum}
           </button>
         ))}
         {/* Next Button */}
         <button
           disabled={currentPage === numberOfPages}
           onClick={() => handlePaginationButton(currentPage + 1)}
           className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
         >
           <div className='flex items-center -mx-1'>
             <span className='mx-1'>Next</span>
 
             <svg
               xmlns='http://www.w3.org/2000/svg'
               className='w-6 h-6 mx-1 rtl:-scale-x-100'
               fill='none'
               viewBox='0 0 24 24'
               stroke='currentColor'
             >
               <path
                 strokeLinecap='round'
                 strokeLinejoin='round'
                 strokeWidth='2'
                 d='M17 8l4 4m0 0l-4 4m4-4H3'
               />
             </svg>
           </div>
         </button>
            </div>
        </div>
    </div>

            
        </div>
    );
};

export default AvailableCamps;