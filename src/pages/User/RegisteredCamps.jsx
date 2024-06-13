import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const RegisteredCamps = () => {
    const axiosSecure = useAxiosSecure();
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [searchText, setSearchText] = useState('');
    const [camps, setCamps] = useState([]);

    const fetchCamps = async ({ queryKey }) => {
        const [, currentPage, itemsPerPage, search] = queryKey;
        const response = await axiosSecure.get(`/user-registered-camps?page=${currentPage}&size=${itemsPerPage}&search=${search}`);
        return response.data;
    };

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['camps', currentPage, itemsPerPage, search],
        queryFn: fetchCamps
    });

    useEffect(() => {
        if (!isLoading && !isError) {
            setCamps(data);
        }
    }, [data, isLoading, isError]);

    const fetchCampCount = async ({ queryKey }) => {
        const [, search] = queryKey;
        const response = await axiosSecure.get(`/user-registered-camps-count?search=${search}`);
        return response.data;
    };

    const { data: campCount, isLoading: countLoading, isError: countError } = useQuery({
        queryKey: ['campCount', search],
        queryFn: fetchCampCount
    });

    useEffect(() => {
        if (!countLoading && !countError) {
            setCount(campCount.count);
        }
    }, [campCount, countError, countLoading]);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

    const handlePaginationButton = value => {
        setCurrentPage(value);
    };

    const handleSearch = e => {
        e.preventDefault();
        setSearch(searchText);
    };

    const handleDelete = async campId => {
        Swal.fire({
            title: 'Are you sure want to cancel it?',
            text: "You won't be able to undo this! It will be deleted",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/delete-participant/${campId}`);
                    Swal.fire('Canceled Successful');
                    refetch();
                } catch (err) {
                    Swal.fire(err.message);
                }
            }
        });
    };

    if (isLoading || countLoading) return <div className="text-center">
        <section className="bg-white min-h-screen">
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
    </div>;

    return (
        <div>
            <div>
                <form onSubmit={handleSearch}>
                    <div className="flex m-2 flex-row justify-center">
                        <input id="search" type="text"
                            className="px-1 py-1 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                            onChange={e => setSearchText(e.target.value)}
                            value={searchText}
                            name='search'
                            placeholder='Enter Search Text'
                            aria-label='Enter Search Text' />
                        <button
                            className="px-2 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-400 font-bold rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="overflow-x-auto max-h-screen overflow-y-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-[16px] text-blue-600 font-extrabold">CampName</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">Fees($)</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">ParticipantName</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">Payment<br />Status</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">Confirmation<br />Status</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">Cancel</th>
                            <th className="text-[16px] text-blue-600 font-extrabold">Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps?.map(camp =>
                            <tr key={camp?._id} className="bg-blue-100 text-black">
                                <td className="w-3/10">
                                    <div className="">
                                        <div>
                                            <div className="font-bold">{camp?.CampName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="w-1/10">{camp?.CampFees}</td>
                                <td className="font-extrabold w-1/10">{camp?.ParticipantName}</td>
                                <td className="w-1/10">
                                    {camp?.PaymentStatus === 'Unpaid'
                                        ?
                                         <Link to={`/dashboard/pay/${camp._id}`} >   <button className="hover:scale-110">Pay</button></Link>
                                        : camp?.PaymentStatus
                                    }
                                </td>
                                <td className="w-1/10">
                                    <button
                                        className={`text-black p-2 font-bold rounded-lg hover:scale-125`}>
                                        {camp?.ConfirmationStatus}
                                    </button>
                                </td>
                                <td className="w-1/10">
                                    <button
                                        disabled={camp?.ConfirmationStatus === 'Confirmed' && camp?.PaymentStatus === 'Paid'}
                                        onClick={() => handleDelete(camp?._id)} className="btn bg-red-500 text-white">
                                        <RiDeleteBin5Fill />
                                    </button>
                                </td>
                                <td className="w-1/10">
                                    <button
                                        className={`text-black p-2 font-bold rounded-lg hover:scale-125`}> Feedback </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center mt-12 overflow-x-auto w-full'>
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
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-[#a0c5c4] text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
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
    );
};

export default RegisteredCamps;
