import PropTypes from 'prop-types';
// for ratting
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const RattingCard = (Ratting ) => {
    

    return (
        <div className=' bg-transparent'>
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-cyan-300 rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex justify-center -mt-16 md:justify-end">
            <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="ReviewerImage" src={Ratting?.Ratting?.ReviewerImage}/>
        </div>
    
        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">{Ratting?.Ratting?.ReviewerName}</h2>
    
        <p className="mt-2 text-sm text-gray-700 font-semibold dark:text-gray-200">{`"${Ratting?.Ratting?.Review}"`}</p>
    
        <div className="flex justify-end mt-4">
        <Rating style={{ maxWidth: 150 }} value={Ratting?.Ratting?.Ratting} readOnly />
        </div>
    </div>
    </div>
    );
};
RattingCard.propTypes = {
    Ratting: PropTypes.object.isRequired,
};

export default RattingCard;