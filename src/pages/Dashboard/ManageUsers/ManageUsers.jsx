import { useState, useEffect } from 'react';
import {
  MdPerson,
  MdEmail,
  MdVerifiedUser,
  MdWarning,
  MdBlock,
} from 'react-icons/md';
import { FaUserShield, FaUserTie, FaUser, FaUsers } from 'react-icons/fa';
import { BiSolidUserDetail } from 'react-icons/bi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingEmail, setProcessingEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  const handleMakeFraud = async (user) => {
    const result = await Swal.fire({
      title: 'Mark as Fraud?',
      html: `
        <div style="text-align: left; padding: 10px;">
          <p style="margin-bottom: 10px;">
            Are you sure you want to mark <strong>${user.displayName}</strong> as fraud?
          </p>
          <p style="color: #ef4444; font-size: 14px; margin-bottom: 10px;">
            ⚠️ This action will:
          </p>
          <ul style="color: #666; font-size: 14px; padding-left: 20px;">
            <li>Suspend their account</li>
            <li>Restrict their access to platform features</li>
          </ul>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#0F172B',
      confirmButtonText: 'Yes, Mark as Fraud',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    setProcessingEmail(user.email);

    try {
      const response = await axiosSecure.patch(`/users/${user.email}/status`, {
        status: 'fraud',
      });

      if (response.data.modifiedCount > 0) {
        setUsers(
          users.map((u) =>
            u.email === user.email ? { ...u, status: 'fraud' } : u
          )
        );

        Swal.fire({
          title: 'User Marked as Fraud',
          html: `<p><strong>${user.name}</strong> has been marked as fraud.</p>`,
          icon: 'success',
          confirmButtonColor: '#FEA116',
        });

        toast.success('User status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    } finally {
      setProcessingEmail(null);
    }
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      user: {
        color: '#3b82f6',
        text: 'User',
        icon: FaUser,
        bgColor: 'rgba(59, 130, 246, 0.1)',
      },
      chef: {
        color: '#FEA116',
        text: 'Chef',
        icon: FaUserTie,
        bgColor: 'rgba(254, 161, 22, 0.1)',
      },
      admin: {
        color: '#0F172B',
        text: 'Admin',
        icon: FaUserShield,
        bgColor: 'rgba(15, 23, 43, 0.1)',
      },
    };

    const config = roleConfig[role] || roleConfig.user;
    const Icon = config.icon;

    return (
      <span
        className="badge badge-lg font-semibold gap-1"
        style={{
          backgroundColor: config.bgColor,
          color: config.color,
          border: `1px solid ${config.color}`,
        }}
      >
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color: '#10b981',
        text: 'Active',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      },
      fraud: {
        color: '#ef4444',
        text: 'Fraud',
        bgColor: 'rgba(239, 68, 68, 0.1)',
      },
    };

    const config = statusConfig[status] || statusConfig.active;

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

  const shouldShowFraudButton = (user) => {
    return user.role !== 'admin' && user.status !== 'fraud';
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus =
      filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

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
      <title>Mange Users</title>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaUsers className="w-8 h-8" color="#FEA116" />
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              Manage Users
            </h1>
          </div>
        </div>

        {/* Statistics */}
        {users.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4 justify-center">
            <div className="stats shadow">
              <div className="stat">
                <h1
                  className={`stat-title ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Total Users
                </h1>
                <div className="stat-value" style={{ color: '#0F172B' }}>
                  {users.length}
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
                  Active
                </h1>
                <div className="stat-value text-success">
                  {users.filter((u) => u.status === 'active').length}
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
                  Chefs
                </h1>
                <div className="stat-value" style={{ color: '#FEA116' }}>
                  {users.filter((u) => u.role === 'chef').length}
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
                  Fraud
                </h1>
                <div className="stat-value text-error">
                  {users.filter((u) => u.status === 'fraud').length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Search */}
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="input input-bordered w-full focus:outline-none focus:border-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Role Filter */}
              <div className="form-control">
                <select
                  className="select select-bordered w-full focus:outline-none focus:border-2"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                  <option value="chef">Chef</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="form-control">
                <select
                  className="select select-bordered w-full focus:outline-none focus:border-2"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="fraud">Fraud</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table/Cards */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <FaUsers
              className="w-20 h-20 mx-auto mb-4 opacity-30"
              color="#FEA116"
            />
            <h3 className="text-2xl font-semibold mb-2 text-white">
              No Users Found
            </h3>
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
                      <th className="text-white text-base">Role</th>
                      <th className="text-white text-base">Status</th>
                      <th className="text-white text-base text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={user._id} className="hover">
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-2">
                            <MdPerson className="w-5 h-5" color="#FEA116" />
                            <span className="font-semibold">
                              {user.displayName}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <MdEmail className="w-4 h-4" color="#FEA116" />
                            {user.email}
                          </div>
                        </td>
                        <td>{getRoleBadge(user.role)}</td>
                        <td>{getStatusBadge(user.status)}</td>
                        <td className="text-center">
                          {shouldShowFraudButton(user) ? (
                            <button
                              onClick={() => handleMakeFraud(user)}
                              disabled={processingEmail === user.email}
                              className="btn btn-sm text-white font-semibold border-0 bg-[#ef4444]"
                            >
                              {processingEmail === user.email ? (
                                <span className="loading loading-spinner loading-xs"></span>
                              ) : (
                                <>
                                  <MdWarning className="w-4 h-4" />
                                  Make Fraud
                                </>
                              )}
                            </button>
                          ) : user.role === 'admin' ? (
                            <span className="text-sm text-base-content/50">
                              -
                            </span>
                          ) : (
                            <span
                              className="badge badge-sm"
                              style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                              }}
                            >
                              Already Fraud
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredUsers.map((user, index) => (
                <div key={user._id} className="card bg-base-100 shadow-xl">
                  <div className="card-body p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="badge font-bold bg-secondary text-white">
                        #{index + 1}
                      </span>
                      {getRoleBadge(user.role)}
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-white">
                      {user.displayName}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MdEmail className="w-4 h-4" color="#FEA116" />
                        <p className="text-sm break-all">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdVerifiedUser className="w-4 h-4" color="#FEA116" />
                        {getStatusBadge(user.status)}
                      </div>
                    </div>

                    {shouldShowFraudButton(user) ? (
                      <button
                        onClick={() => handleMakeFraud(user)}
                        disabled={processingEmail === user.email}
                        className="btn btn-sm w-full text-white font-semibold border-0 bg-[#ef4444]"
                      >
                        {processingEmail === user.email ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <MdWarning className="w-4 h-4" />
                            Mark as Fraud
                          </>
                        )}
                      </button>
                    ) : user.role === 'admin' ? (
                      <div className="text-center text-sm text-base-content/50 py-2">
                        Admin users cannot be marked as fraud
                      </div>
                    ) : (
                      <div className="alert alert-error">
                        <MdBlock className="w-5 h-5" />
                        <span className="text-sm">
                          This user is marked as fraud
                        </span>
                      </div>
                    )}
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

export default ManageUsers;
