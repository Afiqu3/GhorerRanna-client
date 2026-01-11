import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaUserTie,
  FaUser,
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import { Bounce, toast } from 'react-toastify';

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signInUser, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Demo credentials
  const demoCredentials = {
    admin: {
      email: 'admin@admin.com',
      password: '1234A@a',
    },
    chef: {
      email: 'admin1@admin.com',
      password: '1234A@a',
    },
    user: {
      email: 'admin2@admin.com',
      password: '1234A@a',
    },
  };

  const handleLogin = async (data) => {
    setIsLoading(true);

    try {
      const result = await signInUser(data.email, data.password);

      toast.success(`Welcome back, ${result.user.displayName || 'User'}!`, {
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

      navigate(location?.state || '/');
    } catch (error) {
      console.error('Login error:', error);

      // Handle specific Firebase auth errors
      let errorMessage = 'Login failed. Please try again.';

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password'
      ) {
        errorMessage =
          'Invalid email or password. Please check your credentials.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage =
          'No account found with this email. Please register first.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage =
          'This account has been disabled. Please contact support.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      }

      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const credentials = demoCredentials[role];
    setValue('email', credentials.email);
    setValue('password', credentials.password);

    toast.info(`Demo ${role} credentials loaded. Click Login to continue.`, {
      position: 'top-center',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="w-full mx-auto max-w-sm shrink-0">
      <title>Login - GhorerRanna</title>
      <h3 className="text-3xl font-extrabold text-white">Welcome back</h3>
      <p className="text-white">
        Login with <span className="text-secondary">GhorerRanna</span>
      </p>

      {/* Demo Login Buttons */}
      <div className="mt-4 mb-6">
        <p className="text-sm text-gray-400 mb-3 text-center">
          Quick Demo Login:
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            disabled={isLoading}
            className="btn btn-sm bg-primary hover:bg-primary/80 text-white border-0 disabled:opacity-50"
            title="Login as Admin"
          >
            <FaUserShield className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('chef')}
            disabled={isLoading}
            className="btn btn-sm bg-secondary hover:bg-secondary/80 text-primary border-0 disabled:opacity-50"
            title="Login as Chef"
          >
            <FaUserTie className="w-4 h-4" />
            <span className="hidden sm:inline">Chef</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('user')}
            disabled={isLoading}
            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-0 disabled:opacity-50"
            title="Login as User"
          >
            <FaUser className="w-4 h-4" />
            <span className="hidden sm:inline">User</span>
          </button>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset" disabled={isLoading}>
          {/* Email field */}
          <div className="form-control">
            <label className="label text-[#999D93]">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`input w-full focus:outline-0 border-[#999D93] focus:border-white bg-[#1D232A] text-white ${
                errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="form-control mt-4">
            <label className="label text-[#999D93]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className={`input w-full focus:outline-0 border-[#999D93] focus:border-white bg-[#1D232A] text-white pr-12 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                placeholder="Enter your password"
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute top-3 right-3 z-10 cursor-pointer text-white hover:text-secondary transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-2">
            <a className="link link-hover text-white text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full border-0 shadow-none outline-none bg-secondary text-primary font-semibold hover:bg-[#ffb73a] transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </fieldset>

        <p className="text-white text-center">
          Don't have an account?{' '}
          <Link
            state={location.state}
            className="text-secondary underline hover:text-[#ffb73a] transition-colors"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>

      <SocialLogin />
    </section>
  );
};

export default Login;
