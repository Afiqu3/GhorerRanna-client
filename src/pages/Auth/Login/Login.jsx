import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { Link, useLocation, useNavigate } from 'react-router';
// import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link } from 'react-router';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  //   const { signInUser } = useAuth();
  //   const location = useLocation();
  //   const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log('form data', data);
    // signInUser(data.email, data.password)
    //   .then((result) => {
    //     console.log(result.user);
    //     navigate(location?.state || '/');
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
    <div className="w-full mx-auto max-w-sm shrink-0">
      <h3 className="text-3xl font-extrabold">Welcome back</h3>
      <p className="">
        Login with <span className="text-secondary">GhorerRanna</span>
      </p>
      <form className="space-y-4 mt-3" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input w-full focus:border-transparent"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password field */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
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
          </div>

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-secondary text-primary font-semibold hover:bg-[#ffb73a] transition-all mt-4">
            Login
          </button>
        </fieldset>
        <p>
          Don't have any account?{' '}
          <Link
            state={location.state}
            className="text-secondary underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
