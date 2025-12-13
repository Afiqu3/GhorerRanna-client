import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { createUser, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Watch password field to compare with confirm password
  const password = useWatch({ control, name: 'password' });

  const handleRegistration = (data) => {
    // console.log(data);
    // console.log('after register', data.photo[0]);
    const profileImg = data.photo[0];

    createUser(data.email, data.password)
      .then(() => {
        // console.log(result.user);

        // 1. store the image in form data
        const formData = new FormData();
        formData.append('image', profileImg);

        // 2. send the photo to store and get the ul
        const imageAPIUrl = `https://api.imgbb.com/1/upload?key=
            ${import.meta.env.VITE_IMAGE_HOST}`;

        axios.post(imageAPIUrl, formData).then((res) => {
          const photoURL = res.data.data.url;

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            address: data.address,
            photoURL: photoURL,
          };
          axiosSecure.post('/users', userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success('Register Successfully!!!', {
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

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUser(userProfile)
            .then(() => {
              console.log('profile updated successfully');
              navigate('/');
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="w-full max-w-md mx-auto shrink-0 text-white">
      <title>Register-GhorerRanna</title>
      <h3 className="text-3xl font-extrabold">Create an Account</h3>
      <p className="">
        Register with <span className="text-secondary">GhorerRanna</span>
      </p>

      <form
        className="space-y-4 mt-3"
        onSubmit={handleSubmit(handleRegistration)}
      >
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="input w-full focus:outline-0 border-[#999D93] focus:border-white bg-[#1D232A] text-white"
            placeholder="Your Name"
          />
          {errors.name?.type === 'required' && (
            <p className="text-red-500">Name is required.</p>
          )}

          {/* address field */}
          <label className="label">Address</label>
          <input
            type="text"
            {...register('address', { required: true })}
            className="input w-full focus:outline-0 border-[#999D93] focus:border-white bg-[#1D232A] text-white"
            placeholder="Your address"
          />
          {errors.address?.type === 'required' && (
            <p className="text-red-500">Address is required.</p>
          )}

          {/* photo image field */}
          <label className="label">Photo</label>

          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input w-full focus:outline-0 border-[#999D93] focus:border-white bg-[#1D232A] text-white"
            placeholder="Your Photo"
          />

          {errors.photo?.type === 'required' && (
            <p className="text-red-500">Photo is required.</p>
          )}

          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input w-full focus:outline-0 border-[#999D93] focus:border-white bg-[#1D232A] text-white"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is required.</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
              className="input w-full focus:outline-0 border-[#999D93] focus:border-white bg-[#1D232A] text-white"
              placeholder="Password"
            />
            <span
              onClick={handleTogglePassword}
              className={`absolute top-3 right-3 z-1 cursor-pointer text-white`}
            >
              {showPassword ? (
                <FaEyeSlash size={18}></FaEyeSlash>
              ) : (
                <FaEye size={18}></FaEye>
              )}
            </span>
            {errors.password?.type === 'required' && (
              <p className="text-red-500">Password is required.</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === 'pattern' && (
              <p className="text-red-500">
                Password must have at least one uppercase, at least one
                lowercase, at least one number, and at least one special
                characters
              </p>
            )}
          </div>

          {/* confirm password */}
          <label className="label">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: true,
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              className="input w-full focus:outline-0 border-[#999D93] focus:border-white bg-[#1D232A] text-white"
              placeholder="Confirm Password"
            />
            <span
              onClick={handleToggleConfirmPassword}
              className={`absolute top-3 right-3 z-1 cursor-pointer text-white`}
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={18}></FaEyeSlash>
              ) : (
                <FaEye size={18}></FaEye>
              )}
            </span>
            {errors.confirmPassword?.type === 'required' && (
              <p className="text-red-500">Confirm Password is required.</p>
            )}
            {errors.confirmPassword?.type === 'validate' && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button className="btn border-0 shadow-none outline-none bg-secondary text-primary font-semibold hover:bg-[#ffb73a] transition-all mt-4">
            Register
          </button>
        </fieldset>
        <p>
          Already have an account?{' '}
          <Link
            state={location.state}
            className="text-secondary underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
