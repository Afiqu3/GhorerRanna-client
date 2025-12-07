import React from 'react';
import authImg from '../assets/authImg.jpg';
import { Link, Outlet } from 'react-router';
import logoImg from '../assets/logo.png';

const AuthLayout = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 min-h-screen sm:p-20 p-4">
          <h3 className="sm:text-xl font-extrabold">
            <Link to={`/`} className="flex items-center gap-x-2 text-secondary">
              <img className="sm:w-12 sm:h-12 w-9 h-9" src={logoImg} alt="" />
              GhorerRanna
            </Link>
          </h3>
          <div className="flex items-center mt-12">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="bg-[#fafdf0] flex-1 min-h-screen items-center hidden sm:flex">
          <img className='h-full' src={authImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
