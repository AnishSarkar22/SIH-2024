import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user_id');
  const location = useLocation();

  console.log('PrivateRoute: isAuthenticated =', isAuthenticated);
  console.log('PrivateRoute: current location =', location.pathname);

  if (!isAuthenticated) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;