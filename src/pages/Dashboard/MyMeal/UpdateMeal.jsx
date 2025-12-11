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
import { IoMdAdd, IoMdClose, IoMdArrowBack } from 'react-icons/io';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

const UpdateMeal = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mealData, setMealData] = useState(null);
  const navigate = useNavigate();
  const { mealId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/meals/${mealId}/info`);
        const meal = response.data;

        setMealData(meal);
        setIngredients(meal.ingredients || []);

        // Set form values
        setValue('foodName', meal.foodName);
        setValue('deliveryArea', meal.deliveryArea);
        setValue('foodImage', meal.foodImage);
        setValue('price', meal.price);
        setValue('estimatedDeliveryTime', meal.estimatedDeliveryTime);
        setValue('chefExperience', meal.chefExperience);
      } catch (error) {
        console.error('Error fetching meal data:', error);
        toast.error('Failed to load meal information');
      } finally {
        setLoading(false);
      }
    };
    fetchMealData();
  }, [mealId, setValue, axiosSecure]);

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
    if (ingredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedMealData = {
        foodName: data.foodName,
        foodImage: data.foodImage,
        deliveryArea: data.deliveryArea,
        price: parseFloat(data.price),
        ingredients: ingredients,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
      };

      const response = await axiosSecure.patch(
        `/meals/${mealId}`,
        updatedMealData
      );

      if (response.data.modifiedCount > 0) {
        toast.success('Meal updated successfully! 🎉', {
          duration: 3000,
        });

        navigate('/dashboard/my-meals');
      } else if (
        response.data.acknowledged &&
        response.data.modifiedCount === 0
      ) {
        toast.info('No changes were made');
      }
    } catch (error) {
      console.error('Error updating meal:', error);
      toast.error('Failed to update meal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  const handleBack = () => {
    navigate('/dashboard/my-meals');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  if (!mealData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="alert alert-error max-w-md">
          <span>Failed to load meal information. Please try again.</span>
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
        {/* Header */}
        <div className="mb-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="btn btn-sm mb-4 text-white font-semibold border-0 bg-primary"
          >
            <IoMdArrowBack className="w-5 h-5" />
            Back to My Meals
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <MdRestaurantMenu className="w-8 h-8" color="#FEA116" />
              <h1
                className={`text-3xl sm:text-4xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-primary'
                }`}
              >
                Update Meal
              </h1>
            </div>
            <p className="text-base-content/70">Edit your meal information</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 sm:p-8">
            <form onSubmit={handleFormSubmit}>
              {/* Food Name */}
              <div className="mb-6">
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

              {/* Food Image URL */}
              <div className="mb-6">
                <label className="label mb-2">Food Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full focus:outline-none focus:border-2"
                  {...register('foodImage', {
                    required: 'Image URL is required',
                  })}
                />
                {errors.foodImage && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.foodImage.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Price and Delivery Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Price */}
                <div>
                  <label className="label mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="12.99"
                    className="input input-bordered w-full focus:outline-none focus:border-2"
                    style={{
                      borderColor: errors.price ? '#ef4444' : '#e5e7eb',
                    }}
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-lg flex-1 font-semibold"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="btn btn-lg bg-primary flex-1 text-white font-semibold text-base border-0 hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaUtensils className="w-5 h-5" />
                      Update Meal
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMeal;
