import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router';
import LoadingSpinner from '../pages/Loading/LoadingSpinner';

const ActiveRouter = ({ children }) => {
  const { loading } = useAuth();
  const { status, roleLoading } = useRole();


  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (status !== 'active') {
    return <Navigate to="/"></Navigate>;
  }

  return children;
};

export default ActiveRouter;