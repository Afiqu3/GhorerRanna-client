import { useState, useEffect } from 'react';
import {
  MdEmail,
  MdLocationOn,
  MdVerifiedUser,
  MdPerson,
  MdRestaurant,
  MdAdminPanelSettings,
} from 'react-icons/md';
import { FaHashtag, FaAward } from 'react-icons/fa';
// import useRole from '../../../hooks/useRole';
import useTheme from '../../../hooks/useTheme';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Bounce, toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  //   const { role } = useRole();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [chef, setChef] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/users/${user.email}/info`);
        setUserInfo(response.data);
      } catch (err) {
        setError('Failed to load user information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user, axiosSecure]);


  useEffect(() => {
    const checkChefRequest = async () => {
      try {
        const response = await axiosSecure.get(`/chef-requests/${user.email}/check`);
        // console.log('inside api', chef);
        if (response.data.requested) {
          setChef(true);
        }
        } catch (err) {
        console.error('Failed to check chef request status', err);
      }
    };

    checkChefRequest();
  }, [user, axiosSecure]);

  const handleBeChef = async () => {
    const data = {
        userName: userInfo.displayName,
        userEmail: userInfo.email,
        requestType: 'chef',
    }
    try {
      await axiosSecure.post('/chef-requests', data).then((res) => {
        if (res.data.insertedId) {
          toast.success('Successfully requested for chef!!!', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
          });
        }
      });
    } catch (err) {
      setError('Failed to load user information');
      console.error(err);
    }
  };

  const handleBeAdmin = () => {
    console.log('Request to become an admin');
    // Add your logic here
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    return status === 'active' ? 'badge badge-success' : 'badge badge-error';
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      user: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      chef: 'text-white',
      admin: 'text-white',
    };

    const roleStyles = {
      chef: { backgroundColor: '#FEA116' },
      admin: { backgroundColor: '#0F172B' },
    };

    return {
      class: roleColors[role] || 'badge',
      style: roleStyles[role] || {},
    };
  };

  const roleBadge = getRoleBadge(userInfo?.role);
//   console.log(chef);

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-primary">
            My Profile
          </h1>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6 border-b border-base-300">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-offset-base-100 ring-offset-2 ring-secondary border-secondary border-2">
                  <img
                    src={userInfo?.photoURL}
                    alt={userInfo?.name}
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                  {userInfo?.displayName}
                </h2>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span
                    className={`badge ${roleBadge.class}`}
                    style={roleBadge.style}
                  >
                    {userInfo?.role?.toUpperCase()}
                  </span>
                  <span className={getStatusBadge(userInfo?.status)}>
                    {userInfo?.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-base-200/50 hover:shadow-md transition-shadow">
                <MdEmail className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-base-content/70 mb-1 font-medium">
                    Email
                  </p>
                  <p className="font-semibold break-all text-white">
                    {userInfo?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-base-200/50 hover:shadow-md transition-shadow">
                <MdLocationOn className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-base-content/70 mb-1 font-medium">
                    Address
                  </p>
                  <p className="font-semibold text-white">
                    {userInfo?.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-base-200/50 hover:shadow-md transition-shadow">
                <MdPerson className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-base-content/70 mb-1 font-medium">
                    Role
                  </p>
                  <p className="font-semibold capitalize text-white">
                    {userInfo?.role}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-base-200/50 hover:shadow-md transition-shadow">
                <MdVerifiedUser className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-base-content/70 mb-1 font-medium">
                    Status
                  </p>
                  <p className="font-semibold capitalize text-white">
                    {userInfo?.status}
                  </p>
                </div>
              </div>

              {userInfo?.role === 'chef' && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-base-200/50 md:col-span-2 hover:shadow-md transition-shadow">
                  <FaHashtag className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-base-content/70 mb-1 font-medium">
                      Chef ID
                    </p>
                    <p className="font-semibold font-mono text-white">
                      {userInfo?.chefId}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {userInfo?.role !== 'admin' && (
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-base-300">
                {userInfo?.role !== 'chef' && (
                  <button
                    onClick={handleBeChef}
                    className="btn flex-1 text-white font-semibold hover:opacity-90 transition-opacity border-0 bg-secondary"
                    disabled={chef}
                  >
                    <MdRestaurant className="w-5 h-5" />
                    Be a Chef
                  </button>
                )}

                <button
                  onClick={handleBeAdmin}
                  className="btn bg-primary flex-1 text-white font-semibold hover:opacity-90 transition-opacity border-0"
                >
                  <MdAdminPanelSettings className="w-5 h-5" />
                  Be an Admin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
