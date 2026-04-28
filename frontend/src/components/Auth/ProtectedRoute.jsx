import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * @param {string[]} allowedRoles - List of roles permitted to access this route
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // No token found, redirect to signin
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Role not authorized for this section
    // Redirect to their specific dashboard or an unauthorized page
    const redirectPath = 
      userRole === "SUPER_ADMIN" ? "/super-admin" :
      userRole === "HR" ? "/admin" :
      userRole === "EMPLOYEE" ? "/employee" :
      userRole === "CLIENT" ? "/client" : "/signin";
      
    // return <Navigate to={redirectPath} replace />;
    return <Navigate to="/signin" replace />;
  }

  // Authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
