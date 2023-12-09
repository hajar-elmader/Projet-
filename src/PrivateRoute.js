import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // Check if the token exists in localStorage or any other authentication mechanism
  const isAuthenticated = localStorage.getItem('token');

  // If the user is authenticated, render the protected route, otherwise redirect to the login page
  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
