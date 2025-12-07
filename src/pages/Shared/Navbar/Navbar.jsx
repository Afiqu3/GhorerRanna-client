import React, { useEffect, useState } from 'react';
import Links from './Links';
import { IoIosMenu } from 'react-icons/io';
import { TbXboxXFilled } from 'react-icons/tb';
import { Link, NavLink } from 'react-router';
import './links.css';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import logoImg from '../../../assets/logo.png';
// import useAuth from '../../hooks/useAuth';
import useTheme from '../../../hooks/useTheme';
// import { Bounce, toast } from "react-toastify";

const navigationData = [
  {
    name: 'Home',
    path: '/',
    id: 1,
  },
  {
    name: 'Meals',
    path: '/meals',
    id: 2,
  },
  // {
  //   name: "Register",
  //   path: "/register",
  //   id: 3,
  // },
  // {
  //   name: "Login",
  //   path: "/login",
  //   id: 4,
  // },
];

const privateNavigationData = [
  {
    name: 'My Dashboard',
    path: '/dashboard',
    id: 3,
  },
  // {
  //   name: 'My Added Jobs',
  //   path: '/myAddedJobs',
  //   id: 4,
  // },
  // {
  //   name: 'My Accepted Jobs',
  //   path: '/myAcceptedJobs',
  //   id: 5,
  // },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const user = false;
  //   const { user, signOutUser } = useAuth();
  // const navigate = useNavigate();

  const links = navigationData.map((nav) => (
    <Links key={nav.id} nav={nav}></Links>
  ));
  const privateLinks = privateNavigationData.map((nav) => (
    <Links key={nav.id} nav={nav}></Links>
  ));

  // Theme
  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  // Scroll

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // logout
  const handleLogOut = () => {
    // signOutUser()
    //   .then(() => {
    //     toast.success("Logout Successfully!", {
    //       position: "top-center",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: false,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //       transition: Bounce,
    //     });
    //   })
    //   .catch(() => {
    //     // console.log(error);
    //   });
  };

  return (
    <section className='flex justify-center'>
      <div
        className={`fixed top-0 z-50 w-full transition-all duration-800 ease-in-out ${
          scrolled
            ? 'bg-primary/95 shadow-lg backdrop-blur translate-y-2 lg:rounded-full sm:max-w-6xl sm:px-10'
            : 'bg-primary translate-y-0 scale-100'
        }`}
      >
        {/* <div className="absolute inset-0 bg-black/50"></div> */}
        <nav
          className={`flex justify-between items-center pt-7 max-w-6xl lg:mx-auto mx-4 md:py-5 ${
            !isOpen ? 'pb-7' : ''
          }`}
        >
          <motion.div
            className="flex items-center gap-x-3"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {isOpen ? (
              <TbXboxXFilled
                className="text-4xl text-white lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              ></TbXboxXFilled>
            ) : (
              <IoIosMenu
                className="text-4xl text-white lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              ></IoIosMenu>
            )}
            <h3
              className="sm:text-xl font-extrabold"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Link
                to={`/`}
                className="flex items-center gap-x-2 text-secondary"
              >
                <img className="sm:w-12 sm:h-12 w-9 h-9" src={logoImg} alt="" />
                GhorerRanna
              </Link>
            </h3>
          </motion.div>

          <div className="lg:flex gap-x-4 items-center hidden">
            <ul className="lg:flex hidden gap-x-8 font-medium">
              {links} {user && privateLinks}
            </ul>
          </div>

          <div className="lg:flex gap-x-4 items-center hidden">
            {/* <ul className="lg:flex hidden gap-x-8 font-medium">{links}</ul> */}
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-x-2">
                  <Link
                    to={'/login'}
                    target="_parent"
                    className="hidden group lg:flex items-center gap-2 my-btn rounded-full text-black"
                  >
                    <FaUser />
                    <span>Login</span>
                  </Link>
                  <Link
                    to={'/register'}
                    target="_parent"
                    className="hidden group lg:flex items-center gap-2 my-btn rounded-full text-black"
                  >
                    <FaUserPlus />
                    <span>Register</span>
                  </Link>

                  <div className='text-white'>
                    <label className="swap swap-rotate">
                      {/* this hidden checkbox controls the state */}
                      <input
                        onChange={(e) => handleTheme(e.target.checked)}
                        type="checkbox"
                        className="theme-controller"
                        defaultChecked={
                          localStorage.getItem('theme') === 'dark'
                        }
                      />

                      {/* sun icon */}
                      <svg
                        className="swap-off h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                      </svg>

                      {/* moon icon */}
                      <svg
                        className="swap-on h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                      </svg>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Big screen and user is true */}
            {user && (
              <div className="">
                <motion.div
                  className="dropdown dropdown-hover dropdown-center"
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="cursor-pointer m-1"
                  >
                    <img
                      src={user.photoURL}
                      className="rounded-full w-12"
                      alt=""
                    />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-primary text-white rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li className="pointer-events-none cursor-not-allowed text-gray-400">
                      <p className="font-extrabold">{user.displayName}</p>
                    </li>
                    <li className="flex justify-center hover:bg-secondary hover:text-white">
                      <div className="flex items-center text-white">
                        <label className="swap swap-rotate">
                          {/* this hidden checkbox controls the state */}
                          <input
                            onChange={(e) => handleTheme(e.target.checked)}
                            type="checkbox"
                            className="theme-controller"
                            defaultChecked={
                              localStorage.getItem('theme') === 'dark'
                            }
                          />

                          {/* sun icon */}
                          <svg
                            className="swap-off h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                          </svg>

                          {/* moon icon */}
                          <svg
                            className="swap-on h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                          </svg>
                        </label>
                      </div>
                    </li>
                    <li className="hover:bg-secondary hover:text-white">
                      <Link onClick={handleLogOut}>
                        <FiLogOut></FiLogOut>Logout
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              </div>
            )}
          </div>

          {!user && (
            <div className="lg:hidden block text-white">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  type="checkbox"
                  className="theme-controller"
                  defaultChecked={localStorage.getItem('theme') === 'dark'}
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-10 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          )}

          {/* small or medium screen and user is true */}
          {user && (
            <div className="lg:hidden block">
              <motion.div
                className="dropdown dropdown-bottom dropdown-end"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div tabIndex={0} role="button" className="cursor-pointer m-1">
                  <img src={user.photoURL} alt="" />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-primary text-white rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <p className="font-extrabold">{user.displayName}</p>
                  </li>
                  <li className="flex justify-center">
                    <div className="flex items-center text-white">
                      <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input
                          onChange={(e) => handleTheme(e.target.checked)}
                          type="checkbox"
                          className="theme-controller"
                          defaultChecked={
                            localStorage.getItem('theme') === 'dark'
                          }
                        />

                        {/* sun icon */}
                        <svg
                          className="swap-off h-8 w-8 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                          className="swap-on h-8 w-8 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                      </label>
                    </div>
                  </li>
                  <li>
                    <Link onClick={handleLogOut}>
                      <FiLogOut></FiLogOut>Logout
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </div>
          )}

          {/* {user && (
          <div className="flex gap-6 items-center">
            <div className="lg:block hidden">
              <ul className="lg:flex hidden gap-x-8 font-medium">
                {privateLinks}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                <img className="w-12 rounded-full" src={user.photoURL} alt="" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <button
                onClick={handleLogOut}
                className="hidden group lg:flex items-center gap-2 bg-linear-to-r from-[#52057B] to-[#892CDC] text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform focus:ring-2 focus:ring-[#892CDC] focus:outline-none cursor-pointer"
              >
                <FiLogOut className="text-white text-lg transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Logout</span>
              </button>
            </motion.div>
          </div>
        )} */}
        </nav>

        {/*  mobile and tab */}
        {isOpen && !user && (
          <div className="lg:hidden mt-2 mb-5 ml-10 space-y-3 max-w-45 relative h-25">
            <ul className={`space-y-3 animation`}>{links}</ul>
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="space-y-3">
                <Link
                  to={'/login'}
                  target="_parent"
                  className="lg:hidden animation flex items-center justify-center gap-2 my-btn rounded-full text-black"
                >
                  <FaUser />
                  <span>Login</span>
                </Link>
                <Link
                  to={'/register'}
                  target="_parent"
                  className="lg:hidden animation flex items-center gap-2 justify-center my-btn rounded-full text-black"
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
        {isOpen && user && (
          <div className="lg:hidden mt-2 mb-5 ml-10 space-y-3 max-w-45 relative h-25">
            <ul className={`space-y-3 animation`}>
              {links} {privateLinks}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
