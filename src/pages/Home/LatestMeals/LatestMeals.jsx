import React from 'react';
import { motion } from 'motion/react';
import useTheme from '../../../hooks/useTheme';
import MealCard from './MealCard';
import { Link } from 'react-router';

const latestMeals = [
  {
    chefName: 'Marco Pierre',
    chefId: 'CHF001',
    foodImage:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    foodPrice: 32.99,
    foodRating: 4.8,
    deliveryArea: 'Manhattan, Brooklyn',
  },
  {
    chefName: 'Aisha Rahman',
    chefId: 'CHF002',
    foodImage:
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    foodPrice: 18.5,
    foodRating: 4.9,
    deliveryArea: 'Queens, Bronx',
  },
  {
    chefName: 'Luis Mendoza',
    chefId: 'CHF003',
    foodImage:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    foodPrice: 14.0,
    foodRating: 4.7,
    deliveryArea: 'Los Angeles Downtown, Hollywood',
  },
  {
    chefName: 'Mei Ling Chen',
    chefId: 'CHF004',
    foodImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    foodPrice: 28.0,
    foodRating: 4.6,
    deliveryArea: 'San Francisco, Oakland',
  },
  {
    chefName: 'Giovanni Rossi',
    chefId: 'CHF005',
    foodImage:
      'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    foodPrice: 22.0,
    foodRating: 4.9,
    deliveryArea: 'Chicago Loop, Lincoln Park',
  },
  {
    chefName: 'Priya Sharma',
    chefId: 'CHF006',
    foodImage:
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    foodPrice: 16.99,
    foodRating: 4.8,
    deliveryArea: 'Jersey City, Hoboken, Newark',
  },
];

const LatestMeals = () => {
  const { theme } = useTheme();
  return (
    <section className="my-30">
      <div className="max-w-6xl mx-auto px-6">
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
            Latest Meals
          </h2>

          <div className="h-0.5 bg-secondary w-30"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {latestMeals.map((meal, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
            >
              <MealCard meal={meal}></MealCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to={'/meals'} target="_parent" className="bg-secondary text-[#0F172B] px-4 py-2 rounded-full font-semibold hover:bg-[#ffb73a] transition-all">
            See All Meals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestMeals;
