import { useState, useEffect } from 'react';
import {
  MdRestaurantMenu,
  MdAttachMoney,
  MdEmail,
  MdLocationOn,
  MdAccessTime,
  MdCancel,
} from 'react-icons/md';
import {
  FaUtensils,
  FaCheckCircle,
  FaTruck,
  FaShoppingBag,
} from 'react-icons/fa';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';

const OrderRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [chefInfo, setChefInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchChefAndOrders = async () => {
      try {
        setLoading(true);

        const userResponse = await axiosSecure.get(`/users/${user.email}/info`);
        const chef = userResponse.data;
        setChefInfo(chef);

        const ordersResponse = await axiosSecure.get(`/orders/${chef.chefId}`);
        // const ordersResponse = await axiosSecure.get(`/orders/123`);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefAndOrders();
  }, [user, axiosSecure]);

  const updateOrderStatus = async (orderId, newStatus, actionName) => {
    const result = await Swal.fire({
      title: `${actionName} Order?`,
      text: `Are you sure you want to ${actionName.toLowerCase()} this order?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F172B',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${actionName}!`,
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      return;
    }

    setUpdatingOrderId(orderId);

    try {
      const response = await axiosSecure.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      if (response.data.modifiedCount > 0) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );

        Swal.fire({
          title: 'Success!',
          text: `Order ${actionName.toLowerCase()} successfully!`,
          icon: 'success',
          confirmButtonColor: '#FEA116',
        });
      }
    } catch (error) {
      console.error('Error updating order:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update order status. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleCancel = (orderId) => {
    updateOrderStatus(orderId, 'cancelled', 'Cancel');
  };

  const handleAccept = (orderId) => {
    updateOrderStatus(orderId, 'accepted', 'Accept');
  };

  const handleDeliver = (orderId) => {
    updateOrderStatus(orderId, 'delivered', 'Deliver');
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
        color: 'white',
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
        className="badge font-semibold"
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
      pending: { color: '#FEA116', text: 'Pending' },
      paid: { color: '#10b981', text: 'Paid' },
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
        {config.text}
      </span>
    );
  };

  const isButtonDisabled = (order, action) => {
    const isUpdating = updatingOrderId === order._id;

    if (isUpdating) return true;

    if (action === 'cancel') return order.orderStatus !== 'pending';

    if (action === 'accept') return order.orderStatus !== 'pending';

    if (action === 'deliver') return order.orderStatus !== 'accepted';
  };

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
      <title>Order Requests</title>
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
              Order Requests
            </h1>
          </div>
        </div>

        {/* Orders Count */}
        {orders.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4 justify-center">
            <div className="stats shadow">
              <div className="stat">
                <h1
                  className={`stat-title ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Total Orders
                </h1>
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
                <h1
                  className={`stat-title ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Pending
                </h1>
                <div className="stat-value text-secondary">
                  {orders.filter((o) => o.orderStatus === 'pending').length}
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <h1
                  className={`stat-title ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Accepted
                </h1>
                <div className="stat-value text-success">
                  {orders.filter((o) => o.orderStatus === 'accepted').length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <FaShoppingBag className="w-20 h-20 mx-auto mb-4 opacity-30 text-secondary" />
            <h3
              className={`text-2xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              No Orders Yet
            </h3>
            <p
              className={`"text-base-content/7 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              You don't have any orders at the moment.
            </p>
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

                  {/* Customer Info */}
                  <div className="space-y-2 mb-4 p-3 rounded-lg bg-base-200/50">
                    <div className="flex items-center gap-2">
                      <MdEmail className="w-4 h-4" color="#FEA116" />
                      <p className="text-sm break-all">{order.userEmail}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MdLocationOn
                        className="w-4 h-4 mt-0.5 shrink-0"
                        color="#FEA116"
                      />
                      <p className="text-sm">{order.userAddress}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdAccessTime className="w-4 h-4" color="#FEA116" />
                      <p className="text-sm">{formatDate(order.orderTime)}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                    <button
                      onClick={() => handleCancel(order._id)}
                      disabled={isButtonDisabled(order, 'cancel')}
                      className="btn btn-sm flex-1 text-white font-semibold border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: isButtonDisabled(order, 'cancel')
                          ? '#9ca3af'
                          : '#ef4444',
                      }}
                    >
                      {updatingOrderId === order._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
                          <MdCancel className="w-4 h-4" />
                          Cancel
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleAccept(order._id)}
                      disabled={isButtonDisabled(order, 'accept')}
                      className="btn btn-sm flex-1 text-white font-semibold border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: isButtonDisabled(order, 'accept')
                          ? '#9ca3af'
                          : '#10b981',
                      }}
                    >
                      {updatingOrderId === order._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
                          <FaCheckCircle className="w-4 h-4" />
                          Accept
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeliver(order._id)}
                      disabled={isButtonDisabled(order, 'deliver')}
                      className="btn btn-sm flex-1 text-white font-semibold border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: isButtonDisabled(order, 'deliver')
                          ? '#9ca3af'
                          : '#0F172B',
                      }}
                    >
                      {updatingOrderId === order._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
                          <FaTruck className="w-4 h-4" />
                          Deliver
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderRequests;
