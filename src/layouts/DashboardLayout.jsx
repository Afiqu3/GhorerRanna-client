import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import { IoMdAddCircle } from "react-icons/io";
import { IoMenu } from 'react-icons/io5';
import { TiShoppingCart } from 'react-icons/ti';
import { GiMeal } from "react-icons/gi";
import { MdRateReview } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineFavorite } from 'react-icons/md';
import { CiSquareQuestion } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { GrDocumentPerformance } from "react-icons/gr";
import logoImg from '../assets/logo.png';

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-primary">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <IoMenu size={24} />
          </label>
          <div className="px-4 font-bold">GhorerRanna Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-primary is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link to="/">
                <img className="w-15" src={logoImg} alt="" />
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4 text-secondary"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* our dashboard links */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
                to="/dashboard/my-profile"
              >
                <CgProfile color="#FEA116" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Orders"
                to="/dashboard/payment-history"
              >
                <TiShoppingCart color="#FEA116" />
                <span className="is-drawer-close:hidden">My Orders</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Review"
                to="/dashboard/assigned-deliveries"
              >
                <MdRateReview color="#FEA116" />
                <span className="is-drawer-close:hidden">My Review</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Favorite Meal"
                to="/dashboard/completed-deliveries"
              >
                <MdOutlineFavorite color="#FEA116" />
                <span className="is-drawer-close:hidden">Favorite Meal</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Create meal"
                to="/dashboard/create-meal"
              >
                <IoMdAddCircle color="#FEA116" />
                <span className="is-drawer-close:hidden">Create meal</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Meals"
                to="/dashboard/my-meal"
              >
                <GiMeal color="#FEA116" />
                <span className="is-drawer-close:hidden">My Meals</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Order Requests"
                to="/dashboard/users-management"
              >
                <CiSquareQuestion color="#FEA116" />
                <span className="is-drawer-close:hidden">Order Requests</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage User"
              >
                <MdManageAccounts color="#FEA116" />
                <span className="is-drawer-close:hidden">Manage User</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Mange request"
              >
                <FaUserShield color="#FEA116" />
                <span className="is-drawer-close:hidden">Mange request</span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Platform Statistics"
              >
                <GrDocumentPerformance color="#FEA116" />
                <span className="is-drawer-close:hidden">Platform Statistics</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
