import React from 'react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    reviewerName: 'Alexandra Miller',
    reviewerImage: 'https://randomuser.me/api/portraits/women/62.jpg',
    rating: 5,
    comment:
      "Hands down the best pasta carbonara I've ever had! Perfectly creamy, crispy guanciale, and the portion was generous. Already craving it again.",
    date: '2025-12-05T14:30:00Z',
  },
  {
    reviewerName: 'Carlos Rivera',
    reviewerImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4,
    comment:
      'The grilled salmon was cooked to perfection and the lemon butter sauce was delicious. Only wish the side vegetables had a bit more seasoning.',
    date: '2025-12-03T19:15:00Z',
  },
  {
    reviewerName: 'Priya Sharma',
    reviewerImage: 'https://randomuser.me/api/portraits/women/31.jpg',
    rating: 5,
    comment:
      "That butter chicken with garlic naan was pure heaven! Rich, flavorful, and just the right amount of spice. Best Indian meal I've had in years.",
    date: '2025-11-30T20:45:00Z',
  },
  {
    reviewerName: 'Thomas Weber',
    reviewerImage: 'https://randomuser.me/api/portraits/men/78.jpg',
    rating: 3,
    comment:
      'The burger was decent but unfortunately overcooked and a little dry. Fries were great though, and the milkshake saved the day.',
    date: '2025-11-28T13:10:00Z',
  },
  {
    reviewerName: 'Fatima Al-Sayed',
    reviewerImage: 'https://randomuser.me/api/portraits/women/19.jpg',
    rating: 5,
    comment:
      'The lamb mandi was incredible - tender meat falling off the bone, fragrant rice, and the spices were perfectly balanced. Worth every penny!',
    date: '2025-11-25T18:55:00Z',
  },
  {
    reviewerName: "Liam O'Connor",
    reviewerImage: 'https://randomuser.me/api/portraits/men/53.jpg',
    rating: 4,
    comment:
      'Loved the truffle mushroom risotto! Creamy and packed with flavor. Took off one star only because the portion felt slightly small for the price.',
    date: '2025-11-22T21:20:00Z',
  },
];

const Reviews = () => {
  return (
    <section className="bg-primary py-30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col justify-center items-center mb-15"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-2 text-white`}>
            Our Users Say
          </h2>
          <div className="h-0.5 bg-secondary w-30"></div>
        </motion.div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#1E293B] p-6 rounded-2xl shadow-lg border border-[#283548] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-secondary"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white">{review.reviewerName}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-[#FEA116]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-300 leading-relaxed text-sm">
                  “{review.comment}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
