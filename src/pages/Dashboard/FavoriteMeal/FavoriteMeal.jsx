import { useState, useEffect } from 'react';
import {
  MdDelete,
  MdAttachMoney,
  MdPerson,
  MdAccessTime,
} from 'react-icons/md';
import { FaHeart, FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const FavoriteMeals = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/favorites/${user.email}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, axiosSecure]);

  const handleDelete = async (favoriteId, mealName) => {
    const result = await Swal.fire({
      title: 'Remove from Favorites?',
      html: `Are you sure you want to remove <strong>"${mealName}"</strong> from your favorites?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#0F172B',
      confirmButtonText: 'Yes, Remove it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      return;
    }

    setDeletingId(favoriteId);

    try {
      const response = await axiosSecure.delete(`/favorites/${favoriteId}`);

      if (response.data.deletedCount > 0) {
        setFavorites(
          favorites.filter((favorite) => favorite._id !== favoriteId)
        );

        toast.success('Meal removed from favorites successfully! 💔', {
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
      <title>Favorite Meal</title>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaHeart className="w-8 h-8" color="#FEA116" />
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              My Favorite Meals
            </h1>
          </div>
        </div>

        {/* Favorites Count */}
        {favorites.length > 0 && (
          <div className="mb-6 text-center">
            <div className="stats shadow">
              <div className="stat">
                <h1
                  className={`stat-title ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Total Favorites
                </h1>
                <div className="stat-value text-secondary">
                  {favorites.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <FaHeart
              className="w-20 h-20 mx-auto mb-4 opacity-30"
              color="#FEA116"
            />
            <h3
              className={`text-2xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              No Favorite Meals Yet
            </h3>
            <p
              className={`text-base-content/70 mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              You haven't added any meals to your favorites yet. Start exploring
              and save your favorites!
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
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block card bg-[#1D232A] text-white shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* Table Head */}
                  <thead className="bg-primary">
                    <tr>
                      <th className="text-white text-base">#</th>
                      <th className="text-white text-base">Meal Name</th>
                      <th className="text-white text-base">Chef Name</th>
                      <th className="text-white text-base">Price</th>
                      <th className="text-white text-base">Date Added</th>
                      <th className="text-white text-base text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {favorites.map((favorite, index) => (
                      <tr key={favorite._id} className="hover">
                        <th>{index + 1}</th>
                        <td>
                          <div className="flex items-center gap-2">
                            <FaUtensils className="w-4 h-4" color="#FEA116" />
                            <span className="font-semibold">
                              {favorite.mealName}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <MdPerson className="w-4 h-4" color="#FEA116" />
                            {favorite.chefName}
                          </div>
                        </td>
                        <td>
                          <span className="font-bold text-white">
                            {favorite.price.toFixed(2)}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <MdAccessTime className="w-4 h-4" color="#FEA116" />
                            {formatDate(favorite.addedAt)}
                          </div>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              handleDelete(favorite._id, favorite.mealName)
                            }
                            disabled={deletingId === favorite._id}
                            className="btn btn-sm text-white font-semibold border-0 bg-[#ef4444] shadow-none"
                          >
                            {deletingId === favorite._id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <>
                                <MdDelete className="w-4 h-4" />
                                Delete
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {favorites.map((favorite, index) => (
                <div key={favorite._id} className="card bg-primary text-white shadow-xl">
                  <div className="card-body p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="badge font-bold bg-secondary text-white">
                            #{index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          {favorite.mealName}
                        </h3>
                      </div>
                      <FaHeart className="w-6 h-6" color="#FEA116" />
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <MdPerson className="w-5 h-5" color="#FEA116" />
                        <div>
                          <p className="text-xs text-[#ABB6C8]">Chef</p>
                          <p className="font-semibold">{favorite.chefName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MdAttachMoney className="w-5 h-5" color="#FEA116" />
                        <div>
                          <p className="text-xs text-[#ABB6C8]">Price</p>
                          <p className="font-bold text-white">
                            ${favorite.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MdAccessTime className="w-5 h-5" color="#FEA116" />
                        <div>
                          <p className="text-xs text-[#ABB6C8]">
                            Added On
                          </p>
                          <p className="font-semibold">
                            {formatDate(favorite.addedAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        handleDelete(favorite._id, favorite.mealName)
                      }
                      disabled={deletingId === favorite._id}
                      className="btn btn-sm w-full text-white font-semibold border-0 bg-[#ef4444] shadow-none"
                    >
                      {deletingId === favorite._id ? (
                        <>
                          <span className="loading loading-spinner loading-xs"></span>
                          Removing...
                        </>
                      ) : (
                        <>
                          <MdDelete className="w-4 h-4" />
                          Remove from Favorites
                        </>
                      )}
                    </button>
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

export default FavoriteMeals;
