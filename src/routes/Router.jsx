import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import AuthLayout from '../layouts/AuthLayout';
import Error from '../pages/Error/Error';
import PrivateRouter from './PrivateRouter';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/Dashboard/Home/DashboardHome';
import Profile from '../pages/Dashboard/Profile/Profile';
import CreateMeal from '../pages/Dashboard/CreateMeal/CreateMeal';
import MyMeal from '../pages/Dashboard/MyMeal/MyMeal';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: 'my-profile',
        Component: Profile,
      },
      {
        path: 'create-meal',
        Component: CreateMeal,
      },
      {
        path: 'my-meal',
        Component: MyMeal,
      },
    ],
  },
  {
    path: '*',
    Component: Error,
  },
]);
