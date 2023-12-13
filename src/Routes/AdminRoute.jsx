import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    const [isAdmin, isAdminLoading] = useAdmin()
    if(loading || isAdminLoading){
        return <><span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        </>
    }

    if(user && isAdmin){
        return children
    }

    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;