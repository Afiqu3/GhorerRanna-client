import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  MdAttachMoney,
  MdPeople,
  MdPendingActions,
  MdLocalShipping,
} from 'react-icons/md';
import { FaChartBar, FaUsers, FaUtensils } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [statistics, setStatistics] = useState({
    totalPayment: 0,
    totalUsers: 0,
    ordersPending: 0,
    ordersDelivered: 0,
    totalOrders: 0,
    ordersAccepted: 0,
    ordersCancelled: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);

        const usersResponse = await axiosSecure.get('/users');
        const ordersResponse = await axiosSecure.get('/orders');

        const users = usersResponse.data;
        const orders = ordersResponse.data;

        const totalPayment = orders
          .filter((order) => order.paymentStatus === 'paid')
          .reduce((sum, order) => sum + order.totalPrice, 0);

        const ordersPending = orders.filter(
          (order) => order.orderStatus === 'pending'
        ).length;
        const ordersDelivered = orders.filter(
          (order) => order.orderStatus === 'delivered'
        ).length;
        const ordersAccepted = orders.filter(
          (order) => order.orderStatus === 'accepted'
        ).length;
        const ordersCancelled = orders.filter(
          (order) => order.orderStatus === 'cancelled'
        ).length;

        setStatistics({
          totalPayment,
          totalUsers: users.length,
          ordersPending,
          ordersDelivered,
          ordersAccepted,
          ordersCancelled,
          totalOrders: orders.length,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, [axiosSecure]);

  const orderStatusData = [
    { name: 'Pending', value: statistics.ordersPending, color: '#FEA116' },
    { name: 'Accepted', value: statistics.ordersAccepted, color: '#10b981' },
    { name: 'Delivered', value: statistics.ordersDelivered, color: '#7c3aed' },
    { name: 'Cancelled', value: statistics.ordersCancelled, color: '#ef4444' },
  ];

  const paymentOrderData = [
    {
      name: 'Overview',
      'Total Orders': statistics.totalOrders,
      Delivered: statistics.ordersDelivered,
      Pending: statistics.ordersPending,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}
    >
      <title>Platform Statistics</title>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaChartBar className="w-8 h-8" color="#FEA116" />
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              Platform Statistics
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Payment */}
          <div className="card bg-linear-to-br from-green-500 to-green-600 text-white shadow-xl">
            <div className="card-body p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Total Payment</p>
                  <h2 className="text-3xl font-bold">
                    ${statistics.totalPayment.toFixed(2)}
                  </h2>
                  <p className="text-xs opacity-75 mt-2">Revenue generated</p>
                </div>
                <MdAttachMoney className="w-16 h-16 opacity-30" />
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="card bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-xl">
            <div className="card-body p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Total Users</p>
                  <h2 className="text-3xl font-bold">
                    {statistics.totalUsers}
                  </h2>
                  <p className="text-xs opacity-75 mt-2">Registered users</p>
                </div>
                <MdPeople className="w-16 h-16 opacity-30" />
              </div>
            </div>
          </div>

          {/* Orders Pending */}
          <div
            className="card bg-linear-to-br text-white shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #FEA116 0%, #ff8c00 100%)',
            }}
          >
            <div className="card-body p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Orders Pending</p>
                  <h2 className="text-3xl font-bold">
                    {statistics.ordersPending}
                  </h2>
                  <p className="text-xs opacity-75 mt-2">Awaiting processing</p>
                </div>
                <MdPendingActions className="w-16 h-16 opacity-30" />
              </div>
            </div>
          </div>

          {/* Orders Delivered */}
          <div
            className="card text-white shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #0F172B 0%, #1e293b 100%)',
            }}
          >
            <div className="card-body p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Orders Delivered</p>
                  <h2 className="text-3xl font-bold">
                    {statistics.ordersDelivered}
                  </h2>
                  <p className="text-xs opacity-75 mt-2">
                    Successfully completed
                  </p>
                </div>
                <MdLocalShipping className="w-16 h-16 opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Order Status Pie Chart */}
          <div className="card bg-primary text-white shadow-xl">
            <div className="card-body p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <FaUtensils className="w-5 h-5" color="#FEA116" />
                Order Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                {orderStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Bar Chart */}
          <div className="card bg-primary shadow-xl">
            <div className="card-body p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <FaChartBar className="w-5 h-5" style={{ color: '#FEA116' }} />
                Order Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentOrderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Total Orders" fill="#7c3aed " />
                  <Bar dataKey="Delivered" fill="#10b981" />
                  <Bar dataKey="Pending" fill="#FEA116" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Orders */}
          <div className="card bg-primary shadow-xl">
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-white">Total Orders</h3>
                <FaUtensils className="w-6 h-6" color="#10b981" />
              </div>
              <p className="text-3xl font-bold text-[#10b981]">
                {statistics.totalOrders}
              </p>
              <p className="text-sm text-[#ABB6C8] mt-2">
                All time orders
              </p>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="card bg-primary shadow-xl">
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-white">
                  Completion Rate
                </h3>
                <MdLocalShipping className="w-6 h-6" color="#10b981" />
              </div>
              <p className="text-3xl font-bold text-success">
                {statistics.totalOrders > 0
                  ? (
                      (statistics.ordersDelivered / statistics.totalOrders) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </p>
              <p className="text-sm text-[#ABB6C8] mt-2">
                Successfully delivered
              </p>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="card bg-primary shadow-xl">
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-white">
                  Avg Order Value
                </h3>
                <MdAttachMoney className="w-6 h-6" color="#10b981" />
              </div>
              <p className="text-3xl font-bold text-success">
                $
                {statistics.ordersDelivered > 0
                  ? (
                      statistics.totalPayment / statistics.ordersDelivered
                    ).toFixed(2)
                  : 0}
              </p>
              <p className="text-sm text-[#ABB6C8] mt-2">
                Per delivered order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
