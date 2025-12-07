import React from 'react';
import { motion } from 'motion/react';
import useTheme from '../../../hooks/useTheme';
import ServiceCard from './ServiceCard';
import { FaUserTie, FaUtensils, FaShoppingCart, FaLock } from 'react-icons/fa';

const services = [
  {
    id: 1,
    name: 'Master Chefs',
    icon: <FaUserTie />,
    description: 'Skilled home chefs preparing authentic homemade meals.',
  },
  {
    id: 2,
    name: 'Quality Food',
    icon: <FaUtensils />,
    description: 'Fresh, hygienic, and delicious food made with care.',
  },
  {
    id: 3,
    name: 'Online Order',
    icon: <FaShoppingCart />,
    description: 'Order your favorite homemade dishes anytime with ease.',
  },
  {
    id: 4,
    name: 'Secure Payment',
    icon: <FaLock />,
    description: 'Safe and encrypted payment options for every order.',
  },
];

const Services = () => {
  const { theme } = useTheme();
  return (
    <section className="my-30">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          className="flex flex-col justify-center items-center mb-15"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              theme === 'dark' ? '' : 'text-primary'
            } mb-2`}
          >
            Our Services
          </h2>

          <div className="h-0.5 bg-secondary w-30"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6"
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1 }}
          // viewport={{ amount: 0.3 }}
          // transition={{ duration: 0.5 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 30,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{ amount: 0.3 }}
              transition={{
                duration: 0.2,
                delay: index * 0.3,
                ease: 'easeOut',
              }}
            >
              <ServiceCard key={service.id} service={service}></ServiceCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
