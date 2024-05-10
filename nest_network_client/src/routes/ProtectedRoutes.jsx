import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import PropTypes from 'prop-types'
const ProtectedRoutes = ({children}) => {
const {user,loading} = useAuth()
const location = useLocation()
if(loading) return <Loader/>
if(user?.email) return children;
return <Navigate state={location.pathname} to='/login' replace={true}/>
// location.pathname = before login where it interested to go 
};
ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default ProtectedRoutes;
