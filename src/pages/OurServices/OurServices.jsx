import React from 'react';
import { motion } from 'motion/react';
import { FaUserTie, FaUtensils, FaShoppingCart, FaLock, FaTruck, FaStar, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import { MdRestaurantMenu, MdPayment } from 'react-icons/md';
import useTheme from '../../hooks/useTheme';
import { useNavigate } from 'react-router';

const services = [
  {
    id: 1,
    name: 'Master Chefs',
    icon: <FaUserTie />,
    description: 'Connect with skilled home chefs who prepare authentic homemade meals with passion and expertise.',
    features: ['Verified chefs', 'Years of experience', 'Specialized cuisines']
  },
  {
    id: 2,
    name: 'Quality Food',
    icon: <FaUtensils />,
    description: 'Fresh, hygienic, and delicious food made with care using the finest ingredients.',
    features: ['Fresh ingredients', 'Hygienic preparation', 'Quality assured']
  },
  {
    id: 3,
    name: 'Online Ordering',
    icon: <FaShoppingCart />,
    description: 'Easy-to-use platform to browse menus, place orders, and track your delivery in real-time.',
    features: ['User-friendly interface', 'Real-time tracking', 'Order history']
  },
  {
    id: 4,
    name: 'Secure Payment',
    icon: <FaLock />,
    description: 'Safe and encrypted payment options powered by Stripe for complete peace of mind.',
    features: ['SSL encryption', 'Multiple payment methods', 'Secure transactions']
  },
  {
    id: 5,
    name: 'Fast Delivery',
    icon: <FaTruck />,
    description: 'Quick and reliable delivery service ensuring your food arrives fresh and hot.',
    features: ['30-60 min delivery', 'Live tracking', 'On-time guarantee']
  },
  {
    id: 6,
    name: 'Chef Reviews',
    icon: <FaStar />,
    description: 'Read authentic reviews and ratings from customers to make informed decisions.',
    features: ['Verified reviews', 'Rating system', 'Photo reviews']
  },
  {
    id: 7,
    name: 'Custom Menus',
    icon: <MdRestaurantMenu />,
    description: 'Browse diverse daily menus tailored to your preferences and dietary requirements.',
    features: ['Daily updates', 'Dietary filters', 'Ingredient lists']
  },
  {
    id: 8,
    name: '24/7 Support',
    icon: <FaHeadset />,
    description: 'Our dedicated support team is always ready to assist you with any queries or concerns.',
    features: ['Round-the-clock help', 'Quick response', 'Multilingual support']
  },
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="h-full"
    >
      <div className="p-6 bg-white h-full flex flex-col space-y-4 shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-lg text-left group hover:bg-secondary hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-secondary">
        {/* Icon */}
        <figure className="text-secondary text-5xl group-hover:text-white transition-colors duration-300">
          {service.icon}
        </figure>
        
        {/* Title */}
        <h3 className="text-primary text-xl font-bold group-hover:text-white transition-colors duration-300">
          {service.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 grow">
          {service.description}
        </p>
        
        {/* Features */}
        <div className="space-y-2 pt-4 border-t border-gray-200 group-hover:border-white/20">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FaCheckCircle className="w-4 h-4 text-secondary group-hover:text-white shrink-0" />
              <span className="text-sm text-gray-700 group-hover:text-white/80">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const OurServices = () => {
  const { theme } = useTheme();
  const navigate =useNavigate();
  
  return (
    <div className="min-h-screen py-40">
      <title>Our Services</title>
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="flex flex-col justify-center items-center mb-8"
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="bg-linear-to-r from-primary to-[#1e293b] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose GhorerRanna?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-5xl font-bold text-secondary mb-2">500+</div>
                <p className="text-gray-300">Verified Chefs</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-secondary mb-2">10K+</div>
                <p className="text-gray-300">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-secondary mb-2">4.9⭐</div>
                <p className="text-gray-300">Average Rating</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>
            Ready to Experience Homemade Excellence?
          </h3>
          <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of satisfied customers enjoying authentic homemade meals
          </p>
          <button className="bg-secondary hover:bg-[#ffb73a] text-primary font-bold border-0 px-8 py-3 text-lg cursor-pointer" onClick={() => navigate('/meals')}>
            Explore Meals
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;