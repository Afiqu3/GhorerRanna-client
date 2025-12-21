import { useState, useEffect } from 'react';
import {
  MdPerson,
  MdEmail,
  MdAccessTime,
  MdCheckCircle,
  MdCancel,
} from 'react-icons/md';
import { FaUserShield, FaUserTie } from 'react-icons/fa';
import { BiSolidUserCheck } from 'react-icons/bi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';
import { toast } from 'react-toastify';

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [chefRequests, setChefRequests] = useState([]);
  const [adminRequests, setAdminRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const chefRes = await axiosSecure.get('/chef-requests');
        const adminRes = await axiosSecure.get('/admin-requests');

        setChefRequests(chefRes.data);
        setAdminRequests(adminRes.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  const handleAccept = async (request) => {
    const result = await Swal.fire({
      title: 'Accept Request?',
      html: `
        <div style="text-align: left; padding: 10px;">
          <p style="margin-bottom: 10px;">
            Accept <strong>${request.userName}</strong>'s request to become a <strong>${request.requestType}</strong>?
          </p>
          <p style="color: #666; font-size: 14px;">
            This will update their role and grant appropriate permissions.
          </p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#0F172B',
      confirmButtonText: 'Yes, Accept!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setProcessingId(request._id);

    try {
      const statusEndpoint =
        request.requestType === 'chef'
          ? `/chef-requests/${request._id}/status`
          : `/admin-requests/${request._id}/status`;

      await axiosSecure.patch(statusEndpoint, {
        status: 'approved',
      });

      await axiosSecure.patch(`/users/${request.userEmail}/role`, {
        role: request.requestType,
      });

      if (request.requestType === 'chef') {
        setChefRequests(
          chefRequests.map((req) =>
            req._id === request._id
              ? { ...req, requestStatus: 'approved' }
              : req
          )
        );
      } else {
        setAdminRequests(
          adminRequests.map((req) =>
            req._id === request._id
              ? { ...req, requestStatus: 'approved' }
              : req
          )
        );
      }

      Swal.fire({
        title: 'Request Accepted!',
        html: `
          <p><strong>${
            request.userName
          }</strong> has been promoted to <strong>${
          request.requestType
        }</strong>!</p>
          ${
            request.requestType === 'chef'
              ? '<p style="color: #666; font-size: 14px;">A unique Chef ID has been generated.</p>'
              : ''
          }
        `,
        icon: 'success',
        confirmButtonColor: '#FEA116',
      });

      toast.success('Request approved successfully!');
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (request) => {
    const result = await Swal.fire({
      title: 'Reject Request?',
      html: `
        <div style="text-align: left; padding: 10px;">
          <p style="margin-bottom: 10px;">
            Reject <strong>${request.userName}</strong>'s request to become a <strong>${request.requestType}</strong>?
          </p>
          <p style="color: #666; font-size: 14px;">
            Their role will remain unchanged.
          </p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#0F172B',
      confirmButtonText: 'Yes, Reject',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setProcessingId(request._id);

    try {
      const statusEndpoint =
        request.requestType === 'chef'
          ? `/chef-requests/${request._id}/status`
          : `/admin-requests/${request._id}/status`;

      await axiosSecure.patch(statusEndpoint, {
        status: 'rejected',
      });

      if (request.requestType === 'chef') {
        setChefRequests(
          chefRequests.map((req) =>
            req._id === request._id
              ? { ...req, requestStatus: 'rejected' }
              : req
          )
        );
      } else {
        setAdminRequests(
          adminRequests.map((req) =>
            req._id === request._id
              ? { ...req, requestStatus: 'rejected' }
              : req
          )
        );
      }

      toast.success('Request rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setProcessingId(null);
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
      approved: {
        color: '#10b981',
        text: 'Approved',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      },
      rejected: {
        color: '#ef4444',
        text: 'Rejected',
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

  const getRequestTypeBadge = (type) => {
    return (
      <span
        className="badge font-semibold"
        style={{
          backgroundColor:
            type === 'chef'
              ? 'rgba(254, 161, 22, 0.2)'
              : 'rgba(15, 23, 43, 0.2)',
          color: type === 'chef' ? '#FEA116' : '#FFFF',
          border: `1px solid ${type === 'chef' ? '#FEA116' : '#0F172B'}`,
        }}
      >
        {type === 'chef' ? (
          <FaUserTie className="w-3 h-3 inline mr-1" />
        ) : (
          <FaUserShield className="w-3 h-3 inline mr-1" />
        )}
        {type.toUpperCase()}
      </span>
    );
  };

  const isButtonDisabled = (request) => {
    return request.requestStatus !== 'pending' || processingId === request._id;
  };

  const allRequests = [...chefRequests, ...adminRequests].sort(
    (a, b) => new Date(b.requestTime) - new Date(a.requestTime)
  );

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
      <title>Manage Requests</title>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BiSolidUserCheck className="w-8 h-8" color="#FEA116" />
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              Manage Requests
            </h1>
          </div>
        </div>

        {/* Statistics */}
        {allRequests.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4 justify-center">
            <div className="stats shadow">
              <div className="stat">
                <h1
                  className={`stat-title ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Total Requests
                </h1>
                <div
                  className={`stat-value ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {allRequests.length}
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
                  {
                    allRequests.filter((r) => r.requestStatus === 'pending')
                      .length
                  }
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
                  Chef Requests
                </h1>
                <div
                  className={`stat-value ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {chefRequests.length}
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
                  Admin Requests
                </h1>
                <div
                  className={`stat-value ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {adminRequests.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {allRequests.length === 0 ? (
          <div className="text-center py-16">
            <BiSolidUserCheck
              className="w-20 h-20 mx-auto mb-4 opacity-30"
              color="#FEA116"
            />
            <h3
              className={`text-2xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              No Requests Yet
            </h3>
            <p
              className={`text-base-content/70 mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              There are no pending requests at the moment.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block card bg-base-100 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead className="bg-primary">
                    <tr>
                      <th className="text-white text-base">#</th>
                      <th className="text-white text-base">User Name</th>
                      <th className="text-white text-base">Email</th>
                      <th className="text-white text-base">Request Type</th>
                      <th className="text-white text-base">Status</th>
                      <th className="text-white text-base">Request Time</th>
                      <th className="text-white text-base text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRequests.map((request, index) => (
                      <tr key={request._id} className="hover">
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-2">
                            <MdPerson className="w-4 h-4" color="#FEA116" />
                            <span className="font-semibold">
                              {request.userName}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <MdEmail className="w-4 h-4" color="#FEA116" />
                            {request.userEmail}
                          </div>
                        </td>
                        <td>{getRequestTypeBadge(request.requestType)}</td>
                        <td>{getStatusBadge(request.requestStatus)}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <MdAccessTime className="w-4 h-4" color="#FEA116" />
                            <span className="text-sm">
                              {formatDate(request.requestTime)}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleAccept(request)}
                              disabled={isButtonDisabled(request)}
                              className="btn btn-sm text-white font-semibold border-0 disabled:opacity-50"
                              style={{
                                backgroundColor: isButtonDisabled(request)
                                  ? '#9ca3af'
                                  : '#10b981',
                              }}
                            >
                              {processingId === request._id ? (
                                <span className="loading loading-spinner loading-xs"></span>
                              ) : (
                                <>
                                  <MdCheckCircle className="w-4 h-4" />
                                  Accept
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              disabled={isButtonDisabled(request)}
                              className="btn btn-sm text-white font-semibold border-0 disabled:opacity-50"
                              style={{
                                backgroundColor: isButtonDisabled(request)
                                  ? '#9ca3af'
                                  : '#ef4444',
                              }}
                            >
                              {processingId === request._id ? (
                                <span className="loading loading-spinner loading-xs"></span>
                              ) : (
                                <>
                                  <MdCancel className="w-4 h-4" />
                                  Reject
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {allRequests.map((request, index) => (
                <div key={request._id} className="card bg-base-100 shadow-xl">
                  <div className="card-body p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="badge font-bold bg-secondary text-white">
                        #{index + 1}
                      </span>
                      {getRequestTypeBadge(request.requestType)}
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {request.userName}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MdEmail className="w-4 h-4" color="#FEA116" />
                        <p className="text-sm break-all">{request.userEmail}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdAccessTime className="w-4 h-4" color="#FEA116" />
                        <p className="text-sm">
                          {formatDate(request.requestTime)}
                        </p>
                      </div>
                      <div>{getStatusBadge(request.requestStatus)}</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(request)}
                        disabled={isButtonDisabled(request)}
                        className="btn btn-sm flex-1 text-white font-semibold border-0 disabled:opacity-50"
                        style={{
                          backgroundColor: isButtonDisabled(request)
                            ? '#9ca3af'
                            : '#10b981',
                        }}
                      >
                        {processingId === request._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <MdCheckCircle className="w-4 h-4" />
                            Accept
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(request)}
                        disabled={isButtonDisabled(request)}
                        className="btn btn-sm flex-1 text-white font-semibold border-0 disabled:opacity-50"
                        style={{
                          backgroundColor: isButtonDisabled(request)
                            ? '#9ca3af'
                            : '#ef4444',
                        }}
                      >
                        {processingId === request._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <MdCancel className="w-4 h-4" />
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageRequests;
