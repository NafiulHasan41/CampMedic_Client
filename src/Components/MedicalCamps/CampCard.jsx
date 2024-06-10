import { CiCalendarDate } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdOutlineAttachMoney } from "react-icons/md";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


const CampCard = ({camp}) => {
    return (
        <div data-aos="zoom-in-up" className="w-full max-w-sm overflow-hidden bg-[#008B8B] rounded-lg  dark:bg-gray-800 shadow-2xl shadow-cyan-700 group ">
       <img className="object-cover object-center group-hover:scale-110  w-full h-56" src={camp.Image} alt="avatar"/>

    <div className="flex items-center px-6 py-3 bg-gray-900">
    
        <h1 className="mx-3 text-lg font-semibold text-white">{camp.CampName}</h1>
    </div>

    <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{camp.HealthcareProfessional}</h1>

        <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
           
        <FaPeopleGroup />

            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.ParticipantCount}</h1>
        </div>

        <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
            <svg aria-label="location pin icon" className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"/><path fillRule="evenodd" clipRule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"/>
            </svg>

            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.Location}</h1>
        </div>

        <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
        <MdOutlineAttachMoney />

            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.CampFees}</h1>
        </div>

        <div className="flex gap-2">
        <div className="flex items-center mt-4  text-black dark:text-gray-200 text-2xl ">
              
           <CiCalendarDate />

            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.Date}</h1>
        </div>
        <div className="flex items-center mt-4 text-black dark:text-gray-200 text-2xl">
            
        <IoIosTime/>
            <h1 className="px-2 text-[#FFFFFF] text-sm">{camp.Time}</h1>
        </div>
        </div>
        <div className=" my-2 text-center">
            <Link to={`/camp-details/${camp._id}`}>
         <button className=" btn bg-[#40E0D0] font-bold text-xl hover:bg-cyan-200 hover:scale-110 rounded-full border-none ">Details</button>
         </Link>
        </div>

        
    </div>
</div>
    );
};

CampCard.propTypes = {
    camp: PropTypes.object.isRequired,
};

export default CampCard;