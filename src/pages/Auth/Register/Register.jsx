import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
// import useAuth from '../../../hooks/useAuth';
// import axios from 'axios';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  //   const { createUser, updateUser } = useAuth();
  //   const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    console.log(data);
    // console.log('after register', data.photo[0]);
    // const profileImg = data.photo[0];

    // createUser(data.email, data.password)
    //   .then(() => {
    //     // console.log(result.user);

    //     // 1. store the image in form data
    //     const formData = new FormData();
    //     formData.append('image', profileImg);

    //     // 2. send the photo to store and get the ul
    //     const imageAPIUrl = `https://api.imgbb.com/1/upload?key=
    //         ${import.meta.env.VITE_IMAGE_HOST}`;

    //     axios.post(imageAPIUrl, formData).then((res) => {
    //       const photoURL = res.data.data.url;

    //       // create user in the database
    //       const userInfo = {
    //         email: data.email,
    //         displayName: data.name,
    //         photoURL: photoURL,
    //       };
    //       axiosSecure.post('/users', userInfo).then((res) => {
    //         if (res.data.insertedId) {
    //           console.log('user created in the database');
    //         }
    //       });

    //       // update user profile to firebase
    //       const userProfile = {
    //         displayName: data.name,
    //         photoURL: res.data.data.url,
    //       };

    //       updateUser(userProfile)
    //         .then(() => {
    //           console.log('profile updated successfully');
    //         })
    //         .catch((error) => [console.log(error)]);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full max-w-md mx-auto shrink-0">
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
            className="input w-full focus:border-transparent"
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
            className="input w-full focus:border-transparent"
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
            className="file-input w-full focus:border-transparent"
            placeholder="Your Photo"
          />

          {errors.name?.type === 'required' && (
            <p className="text-red-500">Photo is required.</p>
          )}

          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input w-full focus:border-transparent"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is required.</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
              className="input w-full focus:border-transparent"
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

          <button className="btn bg-secondary text-primary font-semibold hover:bg-[#ffb73a] transition-all mt-4">
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
