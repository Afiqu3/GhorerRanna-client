import React from 'react';
import { motion } from 'motion/react';
import banner1 from '../../../assets/banner-1.jpg';
import banner2 from '../../../assets/banner-2.jpg';
import banner3 from '../../../assets/banner-3.jpg';
import banner4 from '../../../assets/banner-4.jpg';

const About = () => {
  return (
    <section className="bg-primary">
      <div className="py-30 relative">
        <div className="max-w-6xl mx-auto text-white">
          <motion.div
            className="flex flex-col justify-center items-center mb-15"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-2`}>About Us</h2>
            <div className="h-0.5 bg-secondary w-30"></div>
          </motion.div>

          <div className="flex lg:flex-row flex-col gap-4 lg:px-0 px-4">
            <motion.div
              className="relative flex-1 grid md:grid-cols-2 grid-cols-1 gap-4"
            >
              <motion.img
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="w-full h-full"
                src={banner2}
                alt=""
              />
              <motion.img
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="md:block hidden pt-13 pr-13"
                src={banner1}
                alt=""
              />
              <motion.img
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="md:block hidden pl-13 pb-13"
                src={banner3}
                alt=""
              />
              <motion.img
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="md:block hidden"
                src={banner4}
                alt=""
              />
              {/* <img className="absolute -top-15 -left-15 w-70 h-50" src={banner1} alt="" /> */}
              {/* <img className="absolute -bottom-15 -left-15 w-50 h-50" src={banner3} alt="" /> */}
            </motion.div>

            <div className="flex-1 flex flex-col justify-center gap-4 text-left">
              <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-left">
                Welcome to GhorerRanna
              </h2>
              <p className="text-gray-400 sm:text-base text-sm">
                GhorerRanna is a modern online platform that connects passionate
                home cooks with people who crave fresh, healthy, and affordable
                homemade meals. Our mission is to bring the warmth of
                home-cooked food to your table while empowering local chefs to
                earn from their own kitchens. Whether you're looking for daily
                meals, special dishes, or unique home-style flavors, GhorerRanna
                offers a simple and secure way to browse menus, place orders,
                and enjoy meals made with care. With features like real-time
                ordering, verified cooks, secure payments, and community
                reviews, we ensure a trustworthy and delightful food experience
                for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
