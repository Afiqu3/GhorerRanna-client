import React from 'react';
import { motion } from 'motion/react';
import useTheme from '../../../hooks/useTheme';

const CTA = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      className="py-30 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <h3
          className={`text-2xl md:text-3xl font-bold mb-4 ${
            theme === 'dark' ? '' : 'text-primary'
          }`}
        >
          Still have questions?
        </h3>
        <p
          className={`${
            theme === 'dark' ? '' : 'text-primary'
          } mb-6 max-w-2xl mx-auto `}
        >
          Our support team is here to help! Reach out to us and we'll get back
          to you as soon as possible.
        </p>
        <button className="bg-secondary hover:bg-[#ffb73a] text-primary font-semibold border-0 px-8 py-3 text-lg">
          Contact Support
        </button>
      </div>
    </motion.div>
  );
};

export default CTA;
