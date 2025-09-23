import React, { useState, useRef, useEffect } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const FavoritesDropdown = () => {
  const { items: favoriteItems, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { showToast } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product.id, 1);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleRemoveFromFavorites = (productId, productName, e) => {
    e.stopPropagation();
    removeFromFavorites(productId);
    showToast(`${productName} removed from favorites!`, 'info');
  };

  const handleViewAll = () => {
    setIsOpen(false);
    window.location.href = '/favorites';
  };

  if (favoriteItems.length === 0) {
    return null; // Don't show dropdown if no favorites
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Heart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-700 text-2xl p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300 group cursor-pointer"
      >
        <i className="fas fa-heart transition-transform duration-300 group-hover:scale-110"></i>
        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center animate-bounce shadow-lg">
          {favoriteItems.length}
        </span>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <i className="fas fa-heart text-red-500"></i>
                <h3 className="font-semibold text-gray-800">My Favorites</h3>
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                  {favoriteItems.length}
                </span>
              </div>
              <button
                onClick={handleViewAll}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-300"
              >
                View All
              </button>
            </div>

            {/* Favorites List */}
            <div className="max-h-96 overflow-y-auto">
              {favoriteItems.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors duration-300 border-b border-gray-50 last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-600 font-bold text-sm">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <del className="text-gray-400 text-xs">
                          ${product.originalPrice}
                        </del>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors duration-300"
                      title="Add to Cart"
                    >
                      <i className="fas fa-shopping-cart text-xs"></i>
                    </button>
                    <button
                      onClick={(e) => handleRemoveFromFavorites(product.id, product.name, e)}
                      className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300"
                      title="Remove from Favorites"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleViewAll}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-2 px-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                View All Favorites
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default FavoritesDropdown;
