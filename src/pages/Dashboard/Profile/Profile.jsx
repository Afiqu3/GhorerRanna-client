import { useState, useEffect } from 'react';
import {
  MdEmail,
  MdLocationOn,
  MdVerifiedUser,
  MdPerson,
  MdRestaurant,
  MdAdminPanelSettings,
  MdEdit,
  MdClose,
  MdSave,
} from 'react-icons/md';
import { FaHashtag } from 'react-icons/fa';
import useTheme from '../../../hooks/useTheme';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Bounce, toast } from 'react-toastify';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [chef, setChef] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [editForm, setEditForm] = useState({
    displayName: '',
    photoURL: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/users/${user.email}/info`);
        setUserInfo(response.data);
        // Initialize edit form with current data
        setEditForm({
          displayName: response.data.displayName || '',
          photoURL: response.data.photoURL || '',
          address: response.data.address || '',
        });
        // console.log(editForm)
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
        const response = await axiosSecure.get(
          `/chef-requests/${user.email}/check`
        );
        const response2 = await axiosSecure.get(
          `/admin-requests/${user.email}/check`
        );
        if (response.data.requested) {
          setChef(true);
        }
        if (response2.data.requested) {
          setAdmin(true);
        }
      } catch (err) {
        console.error('Failed to check chef request status', err);
      }
    };

    checkChefRequest();
  }, [user, axiosSecure]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        displayName: userInfo.displayName || '',
        photoURL: userInfo.photoURL || '',
        address: userInfo.address || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    if (!editForm.displayName.trim()) {
      toast.error('Display name is required');
      return;
    }
    if (!editForm.photoURL.trim()) {
      toast.error('Photo URL is required');
      return;
    }
    if (!editForm.address.trim()) {
      toast.error('Address is required');
      return;
    }

    setIsUpdating(true);

    try {
      await updateUser({
        displayName: editForm.displayName,
        photoURL: editForm.photoURL,
      });

      const response = await axiosSecure.patch(`/users/${user.email}/info`, {
        displayName: editForm.displayName,
        photoURL: editForm.photoURL,
        address: editForm.address,
      });

      if (response.data.modifiedCount > 0 || response.data.acknowledged) {
        setUserInfo((prev) => ({
          ...prev,
          displayName: editForm.displayName,
          photoURL: editForm.photoURL,
          address: editForm.address,
        }));

        setIsEditing(false);

        toast.success('Profile updated successfully! 🎉', {
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
    } catch (err) {
      console.error('Failed to update profile', err);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBeChef = async () => {
    const data = {
      userName: userInfo.displayName,
      userEmail: userInfo.email,
      requestType: 'chef',
    };
    try {
      await axiosSecure.post('/chef-requests', data).then((res) => {
        setChef(true);
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

  const handleBeAdmin = async () => {
    const data = {
      userName: userInfo.displayName,
      userEmail: userInfo.email,
      requestType: 'admin',
    };
    try {
      await axiosSecure.post('/admin-requests', data).then((res) => {
        setAdmin(true);
        if (res.data.insertedId) {
          toast.success('Successfully requested for admin!!!', {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
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
      admin: { backgroundColor: '#FEA116' },
    };

    return {
      class: roleColors[role] || 'badge',
      style: roleStyles[role] || {},
    };
  };

  const roleBadge = getRoleBadge(userInfo?.role);

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}
    >
      <title>My Profile</title>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-primary'
            }`}
          >
            My Profile
          </h1>
        </div>

        <div className="card bg-primary shadow-xl">
          <div className="card-body p-6 sm:p-8">
            {/* Edit Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleEditToggle}
                disabled={isUpdating}
                className="btn btn-sm bg-secondary hover:bg-secondary/80 text-primary border-0"
              >
                {isEditing ? (
                  <>
                    <MdClose className="w-5 h-5" />
                    Cancel
                  </>
                ) : (
                  <>
                    <MdEdit className="w-5 h-5" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 pb-6 border-b border-white/50">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring ring-offset-black ring-offset-2 ring-secondary border-secondary border-2">
                  <img
                    src={isEditing ? editForm.photoURL : userInfo?.photoURL}
                    alt={
                      isEditing ? editForm.displayName : userInfo?.displayName
                    }
                    className="rounded-full"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left w-full">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="displayName"
                      value={editForm.displayName}
                      onChange={handleInputChange}
                      placeholder="Display Name"
                      className="input input-bordered w-full bg-[#131A27] text-white border-white/20"
                      disabled={isUpdating}
                    />
                    <input
                      type="url"
                      name="photoURL"
                      value={editForm.photoURL}
                      onChange={handleInputChange}
                      placeholder="Photo URL"
                      className="input input-bordered w-full bg-[#131A27] text-white border-white/20"
                      disabled={isUpdating}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                      {userInfo?.displayName}
                    </h2>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span
                        className={`badge border-0 ${roleBadge.class}`}
                        style={roleBadge.style}
                      >
                        {userInfo?.role?.toUpperCase()}
                      </span>
                      <span className={getStatusBadge(userInfo?.status)}>
                        {userInfo?.status?.toUpperCase()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#131A27] hover:shadow-md transition-shadow">
                <MdEmail className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#ABB6C8] mb-1 font-medium">
                    Email
                  </p>
                  <p className="font-semibold break-all text-white">
                    {userInfo?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#131A27] hover:shadow-md transition-shadow">
                <MdLocationOn className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#ABB6C8] mb-1 font-medium">
                    Address
                  </p>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      className="textarea textarea-bordered w-full bg-[#0F172B] text-white border-white/20 h-20"
                      disabled={isUpdating}
                    />
                  ) : (
                    <p className="font-semibold text-white">
                      {userInfo?.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#131A27] hover:shadow-md transition-shadow">
                <MdPerson className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#ABB6C8] mb-1 font-medium">
                    Role
                  </p>
                  <p className="font-semibold capitalize text-white">
                    {userInfo?.role}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-[#131A27] hover:shadow-md transition-shadow">
                <MdVerifiedUser className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#ABB6C8] mb-1 font-medium">
                    Status
                  </p>
                  <p className="font-semibold capitalize text-white">
                    {userInfo?.status}
                  </p>
                </div>
              </div>

              {userInfo?.role === 'chef' && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#131A27] md:col-span-2 hover:shadow-md transition-shadow">
                  <FaHashtag className="w-6 h-6 mt-1 shrink-0 text-secondary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#ABB6C8] mb-1 font-medium">
                      Chef ID
                    </p>
                    <p className="font-semibold font-mono text-white">
                      {userInfo?.chefId}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Save Button - Only show when editing */}
            {isEditing && (
              <div className="mt-6 pt-6 border-t border-white/50">
                <button
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="btn w-full bg-secondary hover:bg-secondary/80 text-primary font-bold border-0"
                >
                  {isUpdating ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <MdSave className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Role Request Buttons */}
            {!isEditing && userInfo?.role !== 'admin' && (
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-white/50">
                {userInfo?.role !== 'chef' && (
                  <button
                    onClick={handleBeChef}
                    className="btn flex-1 shadow text-white font-semibold hover:opacity-90 transition-opacity border border-white bg-secondary"
                    disabled={chef}
                  >
                    <MdRestaurant className="w-5 h-5" />
                    Be a Chef
                  </button>
                )}

                <button
                  onClick={handleBeAdmin}
                  className="btn bg-primary shadow flex-1 text-white font-semibold hover:opacity-90 transition-opacity border border-white"
                  disabled={admin}
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
