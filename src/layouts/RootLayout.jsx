import React, { useEffect } from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import LoadingSpinner from '../pages/Loading/LoadingSpinner';
import useAuth from '../hooks/useAuth';

const RootLayout = () => {
  const { loading } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="overflow-hidden">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
