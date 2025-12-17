import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdRestaurantMenu, MdEdit, MdDelete, MdClose } from 'react-icons/md';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/reviews/user/${user.email}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, axiosSecure]);

  const handleDelete = async (reviewId, mealName) => {
    const result = await Swal.fire({
      title: 'Delete Review?',
      html: `Are you sure you want to delete your review for <strong>"${mealName}"</strong>?<br><small>This action cannot be undone.</small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#0F172B',
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await axiosSecure.delete(`/reviews/${reviewId}`);

      if (response.data.deletedCount > 0) {
        setReviews(reviews.filter((review) => review._id !== reviewId));

        Swal.fire({
          title: 'Deleted!',
          text: 'Your review has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#FEA116',
        });
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete review. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setValue('rating', review.rating);
    setValue('comment', review.comment);
  };

  const closeEditModal = () => {
    setEditingReview(null);
    reset();
  };

  const onSubmitUpdate = async (data) => {
    setIsSubmitting(true);

    try {
      const updatedData = {
        rating: parseInt(data.rating),
        comment: data.comment,
        updatedAt: new Date().toISOString(),
      };

      const response = await axiosSecure.patch(
        `/reviews/${editingReview._id}`,
        updatedData
      );

      if (response.data.modifiedCount > 0) {
        // Update local state
        setReviews(
          reviews.map((review) =>
            review._id === editingReview._id
              ? { ...review, ...updatedData }
              : review
          )
        );

        toast.success('Review updated successfully! 🎉');
        closeEditModal();
      }
    } catch (error) {
      console.error('Error updating review:', error);
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
    return [...Array(5)].map((_, index) =>
      index < rating ? (
        <FaStar key={index} className="w-5 h-5 text-yellow-400" />
      ) : (
        <FaRegStar key={index} className="w-5 h-5 text-gray-300" />
      )
    );
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BiSolidQuoteAltLeft className="w-8 h-8" color="#FEA116" />
            <h1
              className={`text-3xl sm:text-4xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              My Reviews
            </h1>
          </div>
        </div>

        {/* Reviews Count */}
        {reviews.length > 0 && (
          <div className="mb-6 text-center">
            <div className="stats shadow">
              <div className="stat">
                <h1
                  className={`stat-title ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Total Reviews
                </h1>
                <div
                  className={`stat-value ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  {reviews.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <BiSolidQuoteAltLeft
              className="w-20 h-20 mx-auto mb-4 opacity-30"
              color="#FEA116"
            />
            <h3
              className={`text-2xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              No Reviews Yet
            </h3>
            <p
              className={`text-base-content/70 mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-primary'
              }`}
            >
              You haven't placed any orders yet. Start exploring our delicious
              meals!
            </p>
            <button
              onClick={() => (window.location.href = '/meals')}
              className="btn text-white font-semibold border-0 bg-secondary"
            >
              <MdRestaurantMenu className="w-5 h-5" />
              Browse Meals
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {review.mealName}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="font-bold text-lg text-secondary">
                          {review.rating}.0
                        </span>
                      </div>
                      <p className="text-sm text-base-content/70">
                        {formatDate(review.date)}
                      </p>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="mb-4 p-4 rounded-lg bg-base-200/50">
                    <p className="text-base leading-relaxed">
                      {review.comment}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => openEditModal(review)}
                      className="btn btn-sm flex-1 text-white font-semibold border-0 bg-secondary"
                    >
                      <MdEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id, review.mealName)}
                      className="btn btn-sm flex-1 text-white font-semibold border-0 bg-[#ef4444]"
                    >
                      <MdDelete className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingReview && (
          <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-2xl text-white">Edit Review</h3>
                <button
                  onClick={closeEditModal}
                  className="btn btn-sm btn-circle"
                  disabled={isSubmitting}
                >
                  <MdClose className="w-5 h-5" />
                </button>
              </div>

              <div
                className="mb-4 p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(254, 161, 22, 0.1)' }}
              >
                <p className="font-semibold" style={{ color: '#0F172B' }}>
                  {editingReview.mealName}
                </p>
              </div>

              <div>
                {/* Rating */}
                <div className="mb-6">
                  <label className="label mb-2">Rating</label>
                  <select
                    className="select select-bordered w-full"
                    {...register('rating', { required: 'Rating is required' })}
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
                <div className="mb-6">
                  <label className="label mb-2">Comment</label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32 focus:outline-none focus:border-2"
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="btn flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmitUpdate)}
                    disabled={isSubmitting}
                    className="btn flex-1 text-white font-semibold border-0 bg-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Updating...
                      </>
                    ) : (
                      'Update Review'
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-backdrop" onClick={closeEditModal}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
