// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * ProtectedRoute Component - Ensures a route is accessible only to authenticated users.
 * @param {Object} Component - The component to render if the user is authenticated.
 * @param {Object} rest - Any additional props.
 * @returns {JSX.Element} 
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
