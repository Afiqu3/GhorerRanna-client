import React from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const MealCard = ({ meal }) => {
  return (
    <div className="bg-primary rounded-2xl shadow-lg overflow-hidden border border-[#1E293B] hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <div className="w-full h-48">
        <img
          src={meal.foodImage}
          alt={meal.chefName}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
        />
      </div>

      <div className="p-5 text-white">
        <h3 className="text-xl font-bold mb-1">{meal.chefName}</h3>
        <p className="text-secondary text-sm mb-3 font-medium">
          Chef ID: {meal.chefId}
        </p>

        <div className="flex items-center gap-2 mb-3 text-sm">
          <FaStar className="text-secondary" />
          <span className="text-gray-300">{meal.rating}</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-gray-300 text-sm">
          <FaMapMarkerAlt className="text-secondary" />
          <span>{meal.deliveryArea}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold text-secondary">${meal.price}</p>
          <button className="my-btn rounded-full cursor-pointer">
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
