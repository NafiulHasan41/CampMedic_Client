import { useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import PropTypes from 'prop-types';
// for ratting
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const FeedbackModal = ({camp}) => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [ loading , setLoading] = useState(false);

    const axiosSecure = useAxiosSecure();
  
    const handleReview = async (e)=>{
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const Review = form.review.value;
        const Ratting = rating;
        const CampId = camp.CampId;
        const CampName = camp.CampName;
        const ReviewerName = user.displayName;
        const ReviewerEmail = user.email;
        const ReviewerImage = user.photoURL;
        const Reviewer = {CampId, CampName, Review, Ratting, ReviewerName, ReviewerEmail, ReviewerImage};

        try{
                  const res = await axiosSecure.post("/ratting", Reviewer);
                //   console.log(res.data.insertedId);
                  if(res.data.insertedId){
                      Swal.fire('Review Submitted Successfully')

                      
                   
                      setRating(0);
                      form.reset();
                      setIsOpen(false);
                      setLoading(false);
                  }
                  else if(res.data.insertedId === null)
                  {
                        Swal.fire(`You already given Review for  ("${camp.CampName}") camp`)
                        setLoading(false);
                        setRating(0);
                        form.reset();
                        setIsOpen(false);
                    
                  }
        }
        catch(error){
            Swal.fire(error.message)
            setLoading(false);
        }
         
    }

    

    return (
        <div>
              <div className="relative flex justify-center">
                
              <button onClick={()=> setIsOpen(true)}  disabled={camp?.ConfirmationStatus !=='Confirmed' && camp?.PaymentStatus !=='Paid' }
                className="btn bg-yellow-500 text-white">
               <VscFeedback />
            </button>

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
                        Give Your Feedback and Rating
                      </h3>

                      <form onSubmit={handleReview}  className="mt-4" action="#">
                          
 
                        {/* lg */}
                            <textarea placeholder="Write Your Review" name="review" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                        {/* ratting */}
                        <div>
                             <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                        </div>
                          <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                              <button type="button" onClick={()=> setIsOpen(false)}
                                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize
                                  transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2
                                  sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800
                                  hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300
                                  focus:ring-opacity-40"
                                  >
                                  Cancel
                              </button>

                              {
                                loading? (<span className="loading loading-spinner text-accent"></span>):(<button type="submit"
                                
                                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Give Feedback
                               </button>)
                              }

                              
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
FeedbackModal.propTypes = {
    camp: PropTypes.object.isRequired,
};

export default FeedbackModal;