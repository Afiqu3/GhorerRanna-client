import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  MdRestaurantMenu,
  MdAttachMoney,
  MdAccessTime,
  MdPerson,
  MdLocationOn,
} from 'react-icons/md';
import {
  FaStar,
  FaUtensils,
  FaHashtag,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useTheme from '../../hooks/useTheme';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

const MealDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { mealId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/meals/${mealId}/info`);
        setMeal(response.data);
      } catch (error) {
        console.error('Error fetching meal:', error);
        toast.error('Failed to load meal details');
      } finally {
        setLoading(false);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(`/reviews/meal/${mealId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchMealData();
    fetchReviews();

    if (user) {
      const checkIsFavorite = async () => {
        try {
          const response = await axiosSecure.get(
            `/favoritesCheck?mealId=${mealId}&email=${user.email}`
          );
          setIsFavorite(response.data.favorite);
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      };

      checkIsFavorite();
    }
  }, [mealId, axiosSecure, user]);

  const handleAddToFavorites = async () => {
    if (isFavorite) {
      toast.info('Already in favorites!');
      return;
    }

    try {
      const favoriteData = {
        userEmail: user.email,
        mealId: meal._id,
        mealName: meal.foodName,
        chefId: meal.chefId,
        chefName: meal.chefName,
        price: meal.price,
      };

      const response = await axiosSecure.post('/favorites', favoriteData);

      if (response.data.acknowledged) {
        setIsFavorite(true);
        toast.success('Added to favorites! ❤️');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleOrderNow = () => {
    navigate(`/order/${mealId}`);
  };

  const onSubmitReview = async (data) => {
    setIsSubmitting(true);

    try {
      const reviewData = {
        mealId: meal._id,
        mealName: meal.foodName,
        reviewerName: user.displayName,
        userEmail: user.email,
        reviewerImage: user.photoURL,
        rating: parseInt(data.rating),
        comment: data.comment,
        date: new Date().toISOString(),
      };

      const response = await axiosSecure.post('/reviews', reviewData);

      if (response.data.acknowledged) {
        toast.success('Review submitted successfully! 🎉');
        reset();
        setShowReviewForm(false);

        setReviews([reviewData, ...reviews]);

        const updatedRating =
          (meal.rating * (meal.reviewCount || 0) + reviewData.rating) /
          ((meal.reviewCount || 0) + 1);
        setMeal({
          ...meal,
          rating: updatedRating,
          reviewCount: (meal.reviewCount || 0) + 1,
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
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

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="alert alert-error max-w-md">
          <span>Meal not found</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 my-40"
      style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}
    >
      <title>{meal.foodName}</title>
      <div className="max-w-6xl mx-auto">
        {/* Meal Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <figure className="h-full">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-full object-cover"
              />
            </figure>
          </div>

          {/* Details Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-6 sm:p-8">
              {/* Title and Favorite */}
              <div className="flex items-start justify-between mb-4">
                <h1
                  className={`text-3xl sm:text-4xl font-bold flex-1 ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {meal.foodName}
                </h1>
                {user && (
                  <button
                    onClick={handleAddToFavorites}
                    className={`btn btn-circle btn-lg bg-secondary ${
                      isFavorite
                        ? 'bg-secondary text-white'
                        : 'bg-transparent text-secondary'
                    }`}
                  >
                    {isFavorite ? (
                      <FaHeart className="w-6 h-6" />
                    ) : (
                      <FaRegHeart className="w-6 h-6" />
                    )}
                  </button>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {renderStars(Math.round(meal.rating))}
                </div>
                <span className="font-bold text-lg text-secondary">
                  {meal.rating.toFixed(1)}
                </span>
                <span className="text-sm text-base-content/70">
                  ({meal.reviewCount || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-6">
                <MdAttachMoney className="w-7 h-7" color="#FEA116" />
                <span
                  className={`text-3xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {meal.price.toFixed(2)}
                </span>
              </div>

              {/* Info Grid */}
              <div className="space-y-4 mb-6">
                {/* Chef */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200/50">
                  <MdPerson className="w-5 h-5" color="#FEA116" />
                  <div>
                    <p className="text-sm text-base-content/70">Chef</p>
                    <p
                      className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {meal.chefName}
                    </p>
                  </div>
                </div>

                {/* Chef ID */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200/50">
                  <FaHashtag className="w-5 h-5" color="#FEA116" />
                  <div>
                    <p className="text-sm text-base-content/70">Chef ID</p>
                    <p
                      className={`font-mono text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {meal.chefId}
                    </p>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200/50">
                  <IoMdTime className="w-5 h-5" color="#FEA116" />
                  <div>
                    <p className="text-sm text-base-content/70">
                      Estimated Delivery
                    </p>
                    <p
                      className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {meal.estimatedDeliveryTime}
                    </p>
                  </div>
                </div>

                {/* Delivery Area */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-base-200/50">
                  <MdLocationOn className="w-5 h-5" color="#FEA116" />
                  <div>
                    <p className="text-sm text-base-content/70">
                      Delivery Area
                    </p>
                    <p
                      className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {meal.deliveryArea}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              {user && (
                <button
                  onClick={handleOrderNow}
                  className="btn btn-lg w-full text-white font-semibold text-base border-0 bg-primary"
                >
                  <FaUtensils className="w-5 h-5" />
                  Order Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body p-6 sm:p-8">
            <h2
              className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              <MdRestaurantMenu className="w-6 h-6" color="#FEA116" />
              Ingredients
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {meal.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="badge badge-lg p-4 justify-start bg-secondary text-primary"
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chef Experience Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body p-6 sm:p-8">
            <h2
              className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              <MdPerson className="w-6 h-6" color="#FEA116" />
              Chef's Experience
            </h2>
            <p className="text-base leading-relaxed">{meal.chefExperience}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-primary'
                }`}
              >
                <BiSolidQuoteAltLeft className="w-6 h-6" color="#FEA116" />
                Reviews ({reviews.length})
              </h2>
              {user && (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="btn text-white font-semibold border-0 bg-secondary"
                >
                  {showReviewForm ? 'Cancel' : 'Give Review'}
                </button>
              )}
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div
                className="mb-8 p-6 rounded-lg"
                style={{
                  backgroundColor: 'rgba(254, 161, 22, 0.05)',
                  border: '1px solid rgba(254, 161, 22, 0.2)',
                }}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Write Your Review
                </h3>
                <div onSubmit={handleSubmit(onSubmitReview)}>
                  {/* Rating */}
                  <div className="mb-4">
                    <label className="label mb-2">Rating</label>
                    <select
                      className="select select-bordered w-full focus:outline-0 focus:border-0"
                      {...register('rating', {
                        required: 'Rating is required',
                      })}
                    >
                      <option value="">Select rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                    {errors.rating && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.rating.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="mb-4">
                    <label className="label mb-2">Comment</label>
                    <textarea
                      className="textarea textarea-bordered focus:outline-none focus:border-2 w-full h-24"
                      placeholder="Share your experience..."
                      {...register('comment', {
                        required: 'Comment is required',
                      })}
                    />
                    {errors.comment && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.comment.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit(onSubmitReview)}
                    disabled={isSubmitting}
                    className={`btn font-semibold border-0 bg-primary text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-base-content/70 py-8">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className={`p-5 rounded-lg border hover:shadow-md transition-shadow 
                      ${
                        theme === 'dark' ? 'border-white/10' : 'border-black/10'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Reviewer Image */}
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full">
                          <img
                            src={review.reviewerImage}
                            alt={review.reviewerName}
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        {/* Reviewer Name and Date */}
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4
                              className={`font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-primary'
                              }`}
                            >
                              {review.reviewerName}
                            </h4>
                            <p className="text-sm text-base-content/70">
                              {formatDate(review.date)}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>

                        {/* Comment */}
                        <p className="text-base leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
