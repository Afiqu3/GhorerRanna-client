import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import useTheme from '../../hooks/useTheme';
import MealCard from '../Home/LatestMeals/MealCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaSearch } from 'react-icons/fa';
import { MdSort } from 'react-icons/md';

const Meals = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalMeals, setTotalMeals] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const mealsPerPage = 10;

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/meals', {
        params: {
          page: currentPage,
          limit: mealsPerPage,
          sort: sortOrder,
          search: searchTerm
        }
      });
      setMeals(response.data.meals);
      setTotalMeals(response.data.totalMeals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOrder, searchTerm, axiosSecure]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals();
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const totalPages = Math.ceil(totalMeals / mealsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="my-40">
      <title>All Meals</title>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
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
            All Meals
          </h2>
          <div className="h-0.5 bg-secondary w-30"></div>
        </motion.div>

        {/* Search and Sort Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                placeholder="Search meals..."
                className="input input-bordered w-full pr-10 focus:outline-none focus:border-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-ghost btn-circle absolute right-0 top-0"
              >
                <FaSearch className="w-5 h-5 text-secondary" />
              </button>
            </div>
          </form>

          {/* Sort */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <MdSort className="w-5 h-5 text-secondary" />
            <select
              className="select select-bordered w-full md:w-auto"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-center">
          <p className="text-sm text-base-content/70">
            Showing {meals.length} of {totalMeals} meals
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-secondary"></span>
          </div>
        ) : meals.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <p className="text-xl text-base-content/70">No meals found</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="btn btn-secondary mt-4"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          /* Meals Grid */
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {meals.map((meal, index) => (
              <motion.div
                key={meal._id}
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
                viewport={{ amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
              >
                <MealCard meal={meal} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join">
              {/* Previous Button */}
              <button
                className="join-item btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                «
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  index === 0 ||
                  index === totalPages - 1 ||
                  (index >= currentPage - 1 && index <= currentPage + 1);

                // Show ellipsis
                const showEllipsisBefore =
                  index === currentPage - 2 && currentPage > 2;
                const showEllipsisAfter =
                  index === currentPage + 2 && currentPage < totalPages - 3;

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <button key={index} className="join-item btn btn-disabled">
                      ...
                    </button>
                  );
                }

                if (!showPage) return null;

                return (
                  <button
                    key={index}
                    className={`join-item btn ${
                      currentPage === index ? 'btn-active bg-secondary' : ''
                    }`}
                    onClick={() => handlePageChange(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                className="join-item btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meals;