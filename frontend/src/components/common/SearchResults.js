import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { highlightSearchTerm } from '../../utils/searchUtils';

const SearchResults = () => {
  const { filters, getFilteredProducts } = useProducts();
  const searchTerm = filters.search || '';
  const filteredProducts = getFilteredProducts();

  if (!searchTerm) {
    return null;
  }

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Search Results for "{searchTerm}"
            </h2>
            <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredProducts.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-sort text-gray-400"></i>
              <span>Sorted by relevance</span>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or browse our categories
              </p>
            </div>

            {/* Search suggestions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {['wireless headphones', 'smart watch', 'running shoes', 'casual shirt'].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // This would trigger a new search - you might want to pass a callback
                    console.log('Suggested search:', suggestion);
                  }}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
