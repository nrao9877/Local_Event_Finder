// components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  useEffect(() => {
    if (!user) {
      // If user is not logged in, redirect to the Sign-In page
      navigate('/signin');
    } else if (role === 'admin' && !user.isAdmin) {
      // If user is not an admin but tries to access admin page, redirect to Unauthorized page
      navigate('/unauthorized');
    }
  }, [navigate, user, role]);

  if (!user || (role === 'admin' && !user.isAdmin)) {
    // Return null to prevent rendering protected content until redirect happens
    return null;
  }

  // If user is authenticated and has the correct role, render the children components
  return children;
};

export default ProtectedRoute;
