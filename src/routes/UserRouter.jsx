import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router';
import LoadingSpinner from '../pages/Loading/LoadingSpinner';

const UserRouter = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== 'user') {
    return <Navigate to="/"></Navigate>;
  }

  return children;
};

export default UserRouter;
