import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  MdRestaurantMenu,
  MdAttachMoney,
  MdAccessTime,
  MdPerson,
  MdImage,
  MdList,
} from 'react-icons/md';
import { FaUtensils } from 'react-icons/fa';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useTheme from '../../../hooks/useTheme';
import axios from 'axios';

const CreateMeal = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/users/${user.email}/info`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        toast.error('Failed to load user information');
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserInfo();
    }
  }, [user, axiosSecure]);

  const addIngredient = () => {
    if (
      currentIngredient.trim() &&
      !ingredients.includes(currentIngredient.trim())
    ) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const onSubmit = async (data) => {
    const foodImg = data.foodImage[0];
    // console.log(foodImg);
    if (ingredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    if (!userInfo) {
      toast.error('User information not loaded');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', foodImg);

      const imageAPIUrl = `https://api.imgbb.com/1/upload?key=
            ${import.meta.env.VITE_IMAGE_HOST}`;

      axios.post(imageAPIUrl, formData).then((res) => {
        const foodImage = res.data.data.url;

        const mealData = {
          foodName: data.foodName,
          chefName: userInfo.displayName,
          deliveryArea: data.deliveryArea,
          foodImage: foodImage,
          price: parseFloat(data.price),
          rating: 0,
          ingredients: ingredients,
          estimatedDeliveryTime: data.estimatedDeliveryTime,
          chefExperience: data.chefExperience,
          chefId: userInfo.chefId,
          userEmail: userInfo.email,
        };

        axiosSecure.post('/meals', mealData).then((res) => {
          if (res.data.insertedId) {
            toast.success('Meal created successfully! 🎉', {
              duration: 3000,
            });
            reset();
            setIngredients([]);
          }
        });
      });
    } catch (error) {
      console.error('Error creating meal:', error);
      toast.error('Failed to create meal. Please try again.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="alert alert-error max-w-md">
          <span>Failed to load user information. Please refresh the page.</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaUtensils className="w-8 h-8" color="#FEA116" />
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              Create New Meal
            </h1>
          </div>
          <p className="text-base-content/70">
            Add a delicious meal to your menu
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Food Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label mb-2">User Email</label>
                  <input
                    type="text"
                    value={user?.email}
                    placeholder="User Email"
                    className="input input-bordered w-full focus:outline-none focus:border-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="label mb-2">Chef ID</label>
                  <input
                    type="text"
                    value={userInfo?.chefId}
                    placeholder="chef id"
                    className="input input-bordered w-full focus:outline-none focus:border-2"
                    readOnly
                  />
                </div>
              </div>

              {/* Food Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label mb-2">Chef Name</label>
                  <input
                    type="text"
                    value={userInfo.displayName}
                    placeholder="Name"
                    className="input input-bordered w-full focus:outline-none focus:border-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="label mb-2">Food Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Grilled Chicken Salad"
                    className="input input-bordered w-full focus:outline-none focus:border-2"
                    {...register('foodName', {
                      required: 'Food name is required',
                    })}
                  />
                  {errors.foodName && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.foodName.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Delivery Area */}
              <div className="mb-6">
                <label className="label mb-2">Delivery Area</label>
                <input
                  type="text"
                  placeholder="e.g., Dhaka"
                  className="input input-bordered w-full focus:outline-none focus:border-2"
                  {...register('deliveryArea', {
                    required: 'Delivery Area',
                  })}
                />
                {errors.deliveryArea && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.deliveryArea.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Food Image */}
              <div className="mb-6">
                <label className="label mb-2">Food Image</label>

                <input
                  type="file"
                  {...register('foodImage', { required: true })}
                  className="file-input w-full focus:border-transparent"
                  placeholder="Food Image"
                />

                {/* <label className="label">
                  <span
                    className="label-text font-semibold flex items-center gap-2"
                    style={{ color: '#0F172B' }}
                  >
                    <MdImage className="w-5 h-5" style={{ color: '#FEA116' }} />
                    Food Image URL
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full focus:outline-none focus:border-2"
                  style={{
                    borderColor: errors.foodImage ? '#ef4444' : '#e5e7eb',
                  }}
                  {...register('foodImage', {
                    required: 'Image URL is required',
                    pattern: {
                      value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                      message: 'Please enter a valid image URL',
                    },
                  })}
                /> */}
                {errors.foodImage && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.foodImage.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Price and Delivery Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Price */}
                <div>
                  <label className="label mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="12.99"
                    className="input input-bordered w-full focus:outline-none focus:border-2"
                    {...register('price', {
                      required: 'Price is required',
                      min: {
                        value: 0.01,
                        message: 'Price must be greater than 0',
                      },
                    })}
                  />
                  {errors.price && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.price.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Estimated Delivery Time */}
                <div>
                  <label className="label mb-2">Delivery Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 30 minutes"
                    className="input input-bordered w-full focus:outline-none focus:border-2"
                    {...register('estimatedDeliveryTime', {
                      required: 'Delivery time is required',
                    })}
                  />
                  {errors.estimatedDeliveryTime && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.estimatedDeliveryTime.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <label className="label mb-2">Ingredients</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyPress={handleIngredientKeyPress}
                    placeholder="Add an ingredient and press Enter or click Add"
                    className="input input-bordered flex-1 focus:outline-none focus:border-2"
                  />
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="btn text-white border-0 bg-secondary"
                  >
                    <IoMdAdd className="w-5 h-5" />
                    Add
                  </button>
                </div>

                {/* Ingredients List */}
                {ingredients.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="badge badge-lg gap-2 py-3 px-4 bg-secondary text-primary"
                      >
                        <span>{ingredient}</span>
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="hover:opacity-70"
                        >
                          <IoMdClose className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chef Experience */}
              <div className="mb-8">
                <label className="label mb-2">Chef Experience</label>
                <textarea
                  placeholder="e.g., 5 years of experience in Mediterranean cuisine"
                  className="textarea textarea-bordered h-24 w-full focus:outline-none focus:border-2"
                  {...register('chefExperience', {
                    required: 'Chef experience is required',
                  })}
                />
                {errors.chefExperience && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.chefExperience.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="btn bg-secondary text-primary font-semibold hover:bg-[#ffb73a] transition-all w-full"
                >
                  Create Meal
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Card */}
        <div
          className="mt-6 p-4 rounded-lg border"
          style={{
            backgroundColor: 'rgba(254, 161, 22, 0.1)',
            borderColor: 'rgba(254, 161, 22, 0.3)',
          }}
        >
          <p
            className={`text-sm text-center ${
              theme === 'dark' ? 'text-white' : 'text-primary'
            }`}
          >
            <strong>Note:</strong> All fields are required. Make sure to add
            ingredients before submitting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateMeal;
