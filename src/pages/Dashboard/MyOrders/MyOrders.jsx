import { useState, useEffect } from 'react';
import {
  MdRestaurantMenu,
  MdAttachMoney,
  MdAccessTime,
  MdPerson,
  MdPayment,
} from 'react-icons/md';
import {
  FaUtensils,
  FaHashtag,
  FaShoppingBag,
  FaCreditCard,
} from 'react-icons/fa';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/orders/${user.email}/user`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, axiosSecure]);

  const handlePayment = async (order) => {
    try {
      const response = await axiosSecure.post('/create-payment-session', {
        ...order,
      });
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error('Error creating payment session:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: '#FEA116',
        text: 'Pending',
        bgColor: 'rgba(254, 161, 22, 0.1)',
      },
      accepted: {
        color: '#10b981',
        text: 'Accepted',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      },
      delivered: {
        color: '#0F172B',
        text: 'Delivered',
        bgColor: 'rgba(15, 23, 43, 0.1)',
      },
      cancelled: {
        color: '#ef4444',
        text: 'Cancelled',
        bgColor: 'rgba(239, 68, 68, 0.1)',
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className="badge badge-lg font-semibold"
        style={{
          backgroundColor: config.bgColor,
          color: config.color,
          border: `1px solid ${config.color}`,
        }}
      >
        {config.text}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#FEA116', text: 'Pending', icon: '⏳' },
      paid: { color: '#10b981', text: 'Paid', icon: '✓' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className="badge font-semibold"
        style={{
          backgroundColor: `${config.color}20`,
          color: config.color,
          border: `1px solid ${config.color}`,
        }}
      >
        {config.icon} {config.text}
      </span>
    );
  };

  const shouldShowPayButton = (order) => {
    return (
      order.orderStatus === 'accepted' && order.paymentStatus === 'pending'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span
          className="loading loading-spinner loading-lg"
          style={{ color: '#FEA116' }}
        ></span>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaShoppingBag className="w-8 h-8" color="#FEA116" />
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              My Orders
            </h1>
          </div>
        </div>

        {/* Orders Statistics */}
        {orders.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4 justify-center">
            <div className="stats shadow">
              <div className="stat">
                <h1 className={`stat-title ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>Total Orders</h1>
                <div
                  className={`stat-value ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {orders.length}
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <h1 className={`stat-title ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>Pending Payment</h1>
                <div className="stat-value text-secondary">
                  {orders.filter((o) => o.paymentStatus === 'pending').length}
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <h1 className={`stat-title ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>Delivered</h1>
                <div className="stat-value text-success">
                  {orders.filter((o) => o.orderStatus === 'delivered').length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <FaShoppingBag
              className="w-20 h-20 mx-auto mb-4 opacity-30"
              color="#FEA116"
            />
            <h3
              className={`text-2xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              No Orders Yet
            </h3>
            <p
              className={`text-base-content/70 mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              You haven't placed any orders yet. Start exploring our delicious
              meals!
            </p>
            <button
              onClick={() => (window.location.href = '/meals')}
              className="btn text-white font-semibold border-0 bg-secondary"
            >
              <FaUtensils className="w-5 h-5" />
              Browse Meals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {order.mealName}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <p>Order Status: {getStatusBadge(order.orderStatus)}</p>
                        <p>
                          Payment Status:{' '}
                          {getPaymentStatusBadge(order.paymentStatus)}
                        </p>
                      </div>
                    </div>
                    <BiSolidPurchaseTag className="w-8 h-8" color="#FEA116" />
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <MdAttachMoney className="w-5 h-5" color="#FEA116" />
                      <div>
                        <p className="text-xs text-base-content/70">Price</p>
                        <p className="font-semibold">
                          ${order.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <FaUtensils className="w-5 h-5" color="#FEA116" />
                      <div>
                        <p className="text-xs text-base-content/70">Quantity</p>
                        <p className="font-semibold">x{order.quantity}</p>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 p-3 rounded-lg bg-[#fea1161a]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="text-xl font-bold text-secondary">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chef & Delivery Info */}
                  <div className="space-y-2 mb-4 p-3 rounded-lg bg-base-200/50">
                    <div className="flex items-center gap-2">
                      <MdPerson className="w-4 h-4" color="#FEA116" />
                      <p className="text-sm">
                        <span className="font-semibold">Chef:</span>{' '}
                        {order.chefName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaHashtag className="w-4 h-4" color="#FEA116" />
                      <p className="text-sm font-mono">{order.chefId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdAccessTime className="w-4 h-4" color="#FEA116" />
                      <p className="text-sm">
                        <span className="font-semibold">Delivery:</span>{' '}
                        {order.orderStatus === 'delivered' ? 'Completed' : 'In Progress'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdAccessTime
                        className="w-4 h-4"
                        style={{ color: '#FEA116' }}
                      />
                      <p className="text-sm">
                        <span className="font-semibold">Ordered:</span>{' '}
                        {formatDate(order.orderTime)}
                      </p>
                    </div>
                  </div>

                  {/* Pay Button */}
                  {shouldShowPayButton(order) && (
                    <div className="pt-4 border-t">
                      <button
                        onClick={() => handlePayment(order)}
                        // disabled={processingPayment === order._id}
                        className="btn btn-lg w-full text-white font-semibold border-0 bg-primary"
                      >
                        <FaCreditCard className="w-5 h-5" />
                        Pay Now - {order.totalPrice.toFixed(2)}
                      </button>
                    </div>
                  )}

                  {/* Payment Complete Message */}
                  {order.paymentStatus === 'paid' && (
                    <div className="pt-4 border-t">
                      <div className="alert alert-success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm">
                          Payment completed successfully!
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
