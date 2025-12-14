import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  MdRestaurantMenu,
  MdAttachMoney,
  MdEmail,
  MdLocationOn,
  MdShoppingCart,
} from 'react-icons/md';
import { FaHashtag, FaUtensils } from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import { BiSolidPurchaseTag } from 'react-icons/bi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useTheme from '../../hooks/useTheme';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Order = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { mealId } = useParams();
  const { user: currentUser } = useAuth();
  const [meal, setMeal] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const [quantity, setQuantity] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const watchQuantity = watch('quantity', 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const mealResponse = await axiosSecure.get(`/meals/${mealId}/info`);
        const userResponse = await axiosSecure.get(
          `/users/${currentUser.email}/info`
        );

        setMeal(mealResponse.data);
        setUser(userResponse.data);

        if (userResponse.data.address) {
          setValue('userAddress', userResponse.data.address);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mealId, axiosSecure, currentUser, setValue]);

  const calculateTotal = () => {
    if (!meal) return 0;
    return (meal.price * watchQuantity).toFixed(2);
  };

  const onSubmit = async (data) => {
    const totalPrice = calculateTotal();

    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Confirm Order',
      html: `
        <div style="text-align: left; padding: 10px;">
          <p style="font-size: 18px; margin-bottom: 10px;">
            <strong>Your total price is: $${totalPrice}</strong>
          </p>
          <p style="margin-bottom: 5px;">Meal: ${meal.foodName}</p>
          <p style="margin-bottom: 5px;">Quantity: ${data.quantity}</p>
          <p style="margin-bottom: 5px;">Delivery Address: ${data.userAddress}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0F172B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm Order!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        mealId: meal._id,
        mealName: meal.foodName,
        price: meal.price,
        quantity: parseInt(data.quantity),
        totalPrice: parseFloat(totalPrice),
        chefId: meal.chefId,
        userEmail: user.email,
        userAddress: data.userAddress,
        orderStatus: 'pending',
      };

      const response = await axiosSecure.post('/orders', orderData);

      if (response.data.acknowledged) {
        await Swal.fire({
          title: 'Order Confirmed!',
          html: `
            <div style="text-align: center;">
              <p style="font-size: 18px; margin-bottom: 10px;">
                Your order has been successfully placed! 🎉
              </p>
              <p style="font-size: 16px; margin-bottom: 5px;">
                Order Total: <strong>$${totalPrice}</strong>
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonColor: '#FEA116',
        });

        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to place order. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  if (!meal || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="alert alert-error max-w-md">
          <span>Failed to load order information. Please try again.</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 my-30"
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
            Back
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <MdShoppingCart className="w-8 h-8" color="#FEA116" />
              <h1
                className={`text-3xl sm:text-4xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-primary'
                }`}
              >
                Place Order
              </h1>
            </div>
            <p className="text-base-content/70">Complete your order details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-6 sm:p-8">
                <h2
                  className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  <BiSolidPurchaseTag className="w-6 h-6" color="#FEA116" />
                  Order Information
                </h2>

                <div>
                  {/* Meal Name */}
                  <div className="mb-6">
                    <label className="label mb-2">
                      <MdRestaurantMenu className="w-5 h-5" color="#FEA116" />
                      Meal Name
                    </label>
                    <input
                      type="text"
                      value={meal.foodName}
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <label className="label mb-2">
                      <MdAttachMoney className="w-5 h-5" color="#FEA116" />
                      Price per Item
                    </label>
                    <input
                      type="text"
                      value={`${meal.price.toFixed(2)}`}
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="label mb-2">
                      <MdShoppingCart className="w-5 h-5" color="#FEA116" />
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="input input-bordered focus:border-0 w-full"
                      {...register('quantity', {
                        required: 'Quantity is required',
                        min: { value: 1, message: 'Minimum quantity is 1' },
                      })}
                    />
                    {errors.quantity && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.quantity.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Chef ID */}
                  <div className="mb-6">
                    <label className="label mb-2">
                      <FaHashtag className="w-5 h-5" color="#FEA116" />
                      Chef ID
                    </label>
                    <input
                      type="text"
                      value={meal.chefId}
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed font-mono text-sm"
                      disabled
                    />
                  </div>

                  {/* User Email */}
                  <div className="mb-6">
                    <label className="label mb-2">
                      <MdEmail className="w-5 h-5" color="#FEA116" />
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                      disabled
                    />
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-6">
                    <label className="label mb-2">
                      <MdLocationOn className="w-5 h-5" color="#FEA116" />
                      Delivery Address
                    </label>
                    <textarea
                      placeholder="Enter your complete delivery address"
                      className="textarea textarea-bordered h-24 w-full focus:border-0"
                      {...register('userAddress', {
                        required: 'Delivery address is required',
                      })}
                    />
                    {errors.userAddress && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.userAddress.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-8">
              <div className="card-body p-6">
                <h2
                  className={`text-xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-primary'
                  }`}
                >
                  Order Summary
                </h2>

                {/* Meal Image */}
                <figure className="rounded-lg overflow-hidden mb-4">
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="w-full h-40 object-cover"
                  />
                </figure>

                {/* Summary Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-base-content/70">
                      Price per item:
                    </span>
                    <span className="font-semibold">
                      ${meal.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Quantity:</span>
                    <span className="font-semibold">{watchQuantity}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: '#FEA116' }}
                    >
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>

                {/* Confirm Order Button */}
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="btn btn-lg w-full text-white font-semibold text-base border-0 bg-primary"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaUtensils className="w-5 h-5" />
                      Confirm Order
                    </>
                  )}
                </button>

                {/* Info */}
                <div
                  className="mt-4 p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(254, 161, 22, 0.1)' }}
                >
                  <p
                    className={`text-xs text-center ${
                      theme === 'dark' ? 'text-white' : 'text-primary'
                    }`}
                  >
                    By confirming, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
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
            <strong>Note:</strong> Please ensure your delivery address is
            correct. Orders cannot be modified after confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
