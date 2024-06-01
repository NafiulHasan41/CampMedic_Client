import PropTypes from 'prop-types';


import { Navigate ,useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';





const PrivateRoute = ({children}) => {
    
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return (<div className=' text-center items-center justify-center mx-auto mt-20 min-h-screen'>
    <span className="loading loading-spinner text-primary"></span>
    <span className="loading loading-spinner text-secondary"></span>
    <span className="loading loading-spinner text-accent"></span>
    <span className="loading loading-spinner text-neutral"></span>
    <span className="loading loading-spinner text-info"></span>
    <span className="loading loading-spinner text-success"></span>
    <span className="loading loading-spinner text-warning"></span>
    <span className="loading loading-spinner text-error"></span>
</div>);
    }

    if (user) {

        return children;
    }
 
     
    
    { Swal.fire('You need to login first') 

    return <Navigate to="/login" state={{ from: location.pathname }}/>; 

 }
    
    

   
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;