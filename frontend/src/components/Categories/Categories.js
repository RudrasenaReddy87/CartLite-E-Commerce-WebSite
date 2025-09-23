import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';

const Categories = () => {
  const { categories } = useProducts();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section className="category py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <i className="fas fa-th-large"></i>
            Shop by Category
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 block mt-2">
              Perfect Style
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium products across various categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-white border border-gray-200 rounded-2xl p-6 text-center transition-all duration-500 hover:border-purple-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden group">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon Container */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-2xl flex items-center justify-center mx-auto transition-all duration-500 group-hover:border-purple-400 group-hover:shadow-lg group-hover:scale-110">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-8 h-8 text-gray-700 transition-all duration-500 group-hover:brightness-110"
                    />
                  </div>

                  {/* Hover Ring Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl animate-ping"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-gray-900 text-base font-bold uppercase mb-2 transition-colors duration-300 group-hover:text-purple-600">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium transition-colors duration-300 group-hover:text-gray-700">
                    {category.itemCount} items
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: hoveredCategory === category.id ? '100%' : '0%'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <i className="fas fa-arrow-right text-white text-xs transition-transform duration-300 group-hover:translate-x-0.5"></i>
                  </div>
                </div>

                {/* Floating Elements */}
                {hoveredCategory === category.id && (
                  <>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute top-1/2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4">
            <button className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="relative z-10 flex items-center gap-2">
                View All Categories
                <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="hidden md:flex items-center gap-2 text-gray-600">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">+12 more</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200">
          {[
            { number: '50+', label: 'Categories', icon: 'fas fa-th-large' },
            { number: '10K+', label: 'Products', icon: 'fas fa-box' },
            { number: '25K+', label: 'Happy Customers', icon: 'fas fa-users' },
            { number: '4.9', label: 'Rating', icon: 'fas fa-star' }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <i className={`${stat.icon} text-purple-600 text-lg`}></i>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
