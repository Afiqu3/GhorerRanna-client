import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useTheme from '../../../hooks/useTheme';

const DashboardHome = () => {
  const { user } = useAuth();
  const {theme} = useTheme();
  return (
    <div className={` flex justify-center items-center h-full ${theme === 'light' ? 'bg-white': 'bg-black'}`}>
      <h1 className={`text-4xl ${theme === 'light' ? 'text-black': 'text-white'}`}>
        Welcome, <span className="text-secondary font-bold">{user.displayName}</span>
      </h1>
    </div>
  );
};

export default DashboardHome;
