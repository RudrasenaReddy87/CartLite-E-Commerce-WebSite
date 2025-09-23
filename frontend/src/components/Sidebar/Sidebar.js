import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';

const Sidebar = () => {
  const { categories, updateFilters } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleCategoryFilter = (category) => {
    updateFilters({ category: category === 'all' ? '' : category });
    setActiveFilter(category);
  };

  const handlePriceFilter = (priceRange) => {
    updateFilters({ priceRange });
    setActiveFilter(priceRange);
  };

  const handleRatingFilter = (rating) => {
    updateFilters({ rating });
    setActiveFilter(rating.toString());
  };

  const clearAllFilters = () => {
    updateFilters({ category: '', priceRange: '', rating: '' });
    setActiveFilter('');
    setPriceRange([0, 500]);
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="lg:sticky lg:top-8">
        {/* Filter Toggle (Mobile) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            <i className={`fas fa-filter transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            {isOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className={`space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
          {/* Categories Filter */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900 text-xl font-bold uppercase tracking-wider relative">
                Categories
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </h3>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-th-large text-purple-600 text-sm"></i>
              </div>
            </div>

            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryFilter('all')}
                  className={`group flex items-center justify-between w-full text-left p-3 rounded-xl transition-all duration-300 ${
                    activeFilter === 'all'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <i className="fas fa-th-large text-lg transition-transform duration-300 group-hover:scale-110"></i>
                    <span className="font-medium">All Categories</span>
                  </span>
                  {activeFilter === 'all' && (
                    <i className="fas fa-check text-sm animate-fadeIn"></i>
                  )}
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryFilter(category.name.toLowerCase())}
                    className={`group flex items-center justify-between w-full text-left p-3 rounded-xl transition-all duration-300 ${
                      activeFilter === category.name.toLowerCase()
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                    }`}
                  >
                    <span className="flex items-center gap-3 capitalize">
                      <i className="fas fa-tag text-lg transition-transform duration-300 group-hover:scale-110"></i>
                      <span className="font-medium">{category.name}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                        activeFilter === category.name.toLowerCase()
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.itemCount}
                      </span>
                      {activeFilter === category.name.toLowerCase() && (
                        <i className="fas fa-check text-sm animate-fadeIn"></i>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Filter */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900 text-xl font-bold uppercase tracking-wider relative">
                Price Range
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </h3>
              <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <i className="fas fa-dollar-sign text-green-600 text-sm"></i>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg transition-all duration-300"
                     style={{ width: `${(priceRange[1] / 500) * 100}%` }}></div>
              </div>

              <ul className="space-y-2">
                {[
                  { range: '0-50', label: '$0 - $50', value: '0-50' },
                  { range: '50-100', label: '$50 - $100', value: '50-100' },
                  { range: '100-200', label: '$100 - $200', value: '100-200' },
                  { range: '200-500', label: '$200+', value: '200-500' }
                ].map((price) => (
                  <li key={price.range}>
                    <button
                      onClick={() => handlePriceFilter(price.value)}
                      className={`group flex items-center justify-between w-full text-left p-3 rounded-xl transition-all duration-300 ${
                        activeFilter === price.value
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <i className="fas fa-tag text-lg transition-transform duration-300 group-hover:scale-110"></i>
                        <span className="font-medium">{price.label}</span>
                      </span>
                      {activeFilter === price.value && (
                        <i className="fas fa-check text-sm animate-fadeIn"></i>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900 text-xl font-bold uppercase tracking-wider relative">
                Customer Rating
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </h3>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
                <i className="fas fa-star text-yellow-600 text-sm"></i>
              </div>
            </div>

            <ul className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <li key={rating}>
                  <button
                    onClick={() => handleRatingFilter(rating)}
                    className={`group flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all duration-300 ${
                      activeFilter === rating.toString()
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                    }`}
                  >
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`fas fa-star text-lg transition-all duration-300 ${
                            star <= rating
                              ? 'text-yellow-400 group-hover:text-yellow-500'
                              : 'text-gray-300 group-hover:text-gray-400'
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="font-medium ml-2">& Up</span>
                    {activeFilter === rating.toString() && (
                      <i className="fas fa-check text-sm animate-fadeIn ml-auto"></i>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Clear Filters */}
          {activeFilter && (
            <div className="bg-white border-2 border-red-100 rounded-2xl p-6 shadow-lg">
              <button
                onClick={clearAllFilters}
                className="group w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <i className="fas fa-times transition-transform duration-300 group-hover:rotate-90"></i>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
