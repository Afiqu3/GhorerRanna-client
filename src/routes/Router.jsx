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
        path: 'mealDetails/:mealId',
        element: (
          <PrivateRouter>
            <MealDetails></MealDetails>
          </PrivateRouter>
        ),
      },
      {
        path: 'order/:mealId',
        element: (
          <PrivateRouter>
            <Order></Order>
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
        Component: CreateMeal,
      },
      {
        path: 'my-meals',
        Component: MyMeal,
      },
      {
        path: 'update-meal/:mealId',
        Component: UpdateMeal,
      },
      {
        path: 'order-requests',
        Component: OrderRequests,
      },
      {
        path: 'my-orders',
        Component: MyOrders,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'my-review',
        Component: MyReview,
      },
      {
        path: 'favorite-meal',
        Component: FavoriteMeal,
      },
      {
        path: 'manage-requests',
        Component: ManageRequests,
      },
      {
        path: 'manage-users',
        Component: ManageUsers,
      },
    ],
  },
  {
    path: '*',
    Component: Error,
  },
]);
