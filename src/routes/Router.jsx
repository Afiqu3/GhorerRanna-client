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
import UpdateMeal from '../pages/Dashboard/MyMeal/UpdateMeal';
import MealDetails from '../pages/Meals/MealDetails';
import Order from '../pages/Order/Order';
import OrderRequests from '../pages/Dashboard/OrderRequests/OrderRequests';
import MyOrders from '../pages/Dashboard/MyOrders/MyOrders';
import PaymentSuccess from '../pages/Dashboard/MyOrders/PaymentSuccess';
import MyReview from '../pages/Dashboard/MyReview/MyReview';
import FavoriteMeal from '../pages/Dashboard/FavoriteMeal/FavoriteMeal';
import ManageRequests from '../pages/Dashboard/ManageRequests/ManageRequests';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import PlatformStatistics from '../pages/Dashboard/PlatformStatistics/PlatformStatistics';
import Meals from '../pages/Meals/Meals';
import ChefRouter from './ChefRouter';
import AdminRouter from './AdminRouter';
import ActiveRouter from './ActiveRouter';
import UserRouter from './UserRouter';
import OurServices from '../pages/OurServices/OurServices';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'meals',
        Component: Meals,
      },
      {
        path: 'services',
        Component: OurServices,
      },
      {
        path: 'mealDetails/:mealId',
        element: <MealDetails></MealDetails>,
      },
      {
        path: 'order/:mealId',
        element: (
          <PrivateRouter>
            <ActiveRouter>
              <Order></Order>
            </ActiveRouter>
          </PrivateRouter>
        ),
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
        element: (
          <ChefRouter>
            <ActiveRouter>
              <CreateMeal></CreateMeal>
            </ActiveRouter>
          </ChefRouter>
        ),
      },
      {
        path: 'my-meals',
        element: (
          <ChefRouter>
            <MyMeal></MyMeal>
          </ChefRouter>
        ),
      },
      {
        path: 'update-meal/:mealId',
        element: (
          <ChefRouter>
            <UpdateMeal></UpdateMeal>
          </ChefRouter>
        ),
      },
      {
        path: 'order-requests',
        element: (
          <ChefRouter>
            <OrderRequests></OrderRequests>
          </ChefRouter>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <UserRouter>
            <MyOrders></MyOrders>
          </UserRouter>
        ),
      },
      {
        path: 'payment-success',
        element: (
          <UserRouter>
            <PaymentSuccess></PaymentSuccess>
          </UserRouter>
        ),
      },
      {
        path: 'my-review',
        element: (
          <UserRouter>
            <MyReview></MyReview>
          </UserRouter>
        ),
      },
      {
        path: 'favorite-meal',
        element: (
          <UserRouter>
            <FavoriteMeal></FavoriteMeal>
          </UserRouter>
        ),
      },
      {
        path: 'manage-requests',
        element: (
          <AdminRouter>
            <ManageRequests></ManageRequests>
          </AdminRouter>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <AdminRouter>
            <ManageUsers></ManageUsers>
          </AdminRouter>
        ),
      },
      {
        path: 'platform-statistics',
        element: (
          <AdminRouter>
            <PlatformStatistics></PlatformStatistics>
          </AdminRouter>
        ),
      },
    ],
  },
  {
    path: '*',
    Component: Error,
  },
]);
