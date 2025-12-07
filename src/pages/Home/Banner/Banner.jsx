import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Typewriter } from 'react-simple-typewriter';
import banner1 from '../../../assets/banner-1.jpg';
import banner2 from '../../../assets/banner-2.jpg';
import banner3 from '../../../assets/banner-3.jpg';
import banner4 from '../../../assets/banner-4.jpg';
import { useNavigate } from 'react-router';

const slides = [banner1, banner2, banner3, banner4];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-10 overflow-hidden text-white">
      <div className="max-w-6xl lg:mx-auto mx-4 lg:my-40 my-20">
        <AnimatePresence>
          <motion.img
            key={current}
            src={slides[current]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold mb-4"
          >
            Fresh Homemade Meals From{' '}
            <span className="text-secondary">
              <Typewriter
                words={[
                  'Local Home Cooks',
                  'Your Neighborhood Chefs',
                  'Authentic Kitchens',
                  'Trusted Home Makers',
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={60}
                delaySpeed={1500}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-lg max-w-2xl mb-8"
          >
            GhorerRanna connects home cooks with food lovers looking for fresh,
            healthy, and affordable homemade meals. Discover daily menus, order
            with ease, enjoy secure payments, and track your order in real-time.
          </motion.p>

          <motion.button
            onClick={() => navigate('/meals')}
            whileTap={{ scale: 0.95 }}
            className="text-black my-btn rounded-full cursor-pointer"
          >
            Explore Menu
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
