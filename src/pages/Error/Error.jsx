import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import useTheme from '../../hooks/useTheme';

const Error = () => {
  const { theme } = useTheme();

  return (
    <section className="flex items-center justify-center h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h1
          className={`text-[10rem] font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-primary'
          }`}
        >
          404
        </h1>
        <p
          className={`text-xl md:text-2xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-primary'
          }`}
        >
          Oops! Page Not Found
        </p>
        <p
          className={`text-md md:text-lg mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-primary'
          }`}
        >
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-secondary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary hover:text-secondary transition-all duration-300 ease-in-out"
        >
          Go Back Home
        </Link>
      </motion.div>
    </section>
  );
};

export default Error;
