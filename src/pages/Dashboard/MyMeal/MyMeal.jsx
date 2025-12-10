import { useState, useEffect } from 'react';
import {
  MdRestaurantMenu,
  MdAttachMoney,
  MdAccessTime,
  MdPerson,
  MdEdit,
  MdDelete,
} from 'react-icons/md';
import { FaStar, FaUtensils, FaHashtag } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import Swal from 'sweetalert2';
import useTheme from '../../../hooks/useTheme';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

const MyMeals = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/meals/${user.email}`);
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
        setError('Failed to load meals');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [axiosSecure, user]);

  const handleDelete = async (mealId, mealName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${mealName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0F172B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/meals/${mealId}`);

        if (response.data.deletedCount > 0) {
          setMeals(meals.filter((meal) => meal._id !== mealId));

          Swal.fire({
            title: 'Deleted!',
            text: 'Your meal has been deleted successfully.',
            icon: 'success',
            confirmButtonColor: '#FEA116',
          });
        }
      } catch (error) {
        console.error('Error deleting meal:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete meal. Please try again.',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  const handleUpdate = (mealId) => {
    navigate(`/dashboard/update-meal/${mealId}`);
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

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaUtensils className="w-8 h-8" color="#FEA116" />
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              My Meals
            </h1>
          </div>
          <p className="text-base-content/70">Manage all your created meals</p>
        </div>

        {meals.length === 0 ? (
          <div className="text-center py-16">
            <FaUtensils
              className="w-20 h-20 mx-auto mb-4 opacity-30"
              color="#FEA116"
            />
            <h3 className="text-2xl font-semibold mb-2 text-primary">
              No Meals Yet
            </h3>
            <p className="text-base-content/70 mb-6">
              You haven't created any meals yet. Start by creating your first
              meal!
            </p>
            <button
              onClick={() => navigate('/create-meal')}
              className="btn text-white font-semibold border-0 bg-secondary"
            >
              <FaUtensils className="w-5 h-5" />
              Create Meal
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center sm:text-left">
              <p
                className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-primary'
                }`}
              >
                Total Meals:{' '}
                <span style={{ color: '#FEA116' }}>{meals.length}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <div
                  key={meal._id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <figure className="relative h-48 overflow-hidden">
                    <img
                      src={meal.foodImage}
                      alt={meal.foodName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 badge badge-lg gap-1 font-semibold bg-secondary text-white border-0">
                      <FaStar className="w-4 h-4" />
                      {meal.rating.toFixed(1)}
                    </div>
                  </figure>

                  <div className="card-body p-5">
                    <h2 className="card-title text-xl mb-2 text-white">
                      {meal.foodName}
                    </h2>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MdAttachMoney className="w-5 h-5" color="#FEA116" />
                        <span className="font-bold text-lg text-white">
                          {meal.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <IoMdTime className="w-4 h-4" color="#FEA116" />
                        <span>{meal.estimatedDeliveryTime}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MdPerson className="w-4 h-4" color="#FEA116" />
                        <span className="font-medium">
                          Chef: {meal.chefName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FaHashtag className="w-4 h-4" color="#FEA116" />
                        <span className="font-mono text-xs text-white">
                          {meal.chefId}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-1 text-white">
                        <MdRestaurantMenu className="w-4 h-4" color="#FEA116" />
                        Ingredients:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {meal.ingredients
                          .slice(0, 3)
                          .map((ingredient, index) => (
                            <span
                              key={index}
                              className="badge badge-sm gap-2 py-3 px-4 bg-secondary text-primary"
                            >
                              {ingredient}
                            </span>
                          ))}
                        {meal.ingredients.length > 3 && (
                          <span className="badge badge-sm gap-2 py-3 px-4 bg-secondary text-primary">
                            +{meal.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="card-actions justify-end gap-2 pt-3 border-t">
                      <button
                        onClick={() => handleUpdate(meal._id)}
                        className="btn btn-sm text-white font-semibold border-0 flex-1 hover:opacity-90 bg-secondary"
                      >
                        <MdEdit className="w-4 h-4" />
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(meal._id, meal.foodName)}
                        className="btn btn-sm text-white font-semibold border-0 flex-1 hover:opacity-90 bg-primary"
                      >
                        <MdDelete className="w-4 h-4" />
                        Delete
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

export default MyMeals;
