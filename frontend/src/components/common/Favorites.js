import React, { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { useProducts } from '../../context/ProductContext';

const Favorites = () => {
  const { items: favoriteProducts, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { showToast } = useUser();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  console.log('Favorites component - favoriteProducts:', favoriteProducts);
  console.log('Favorites component - favoriteProducts length:', favoriteProducts.length);

  const handleAddToCart = (product) => {
    addToCart(product.id, 1);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleRemoveFromFavorites = (productId, productName, e) => {
    e.stopPropagation();
    removeFromFavorites(productId);
    showToast(`${productName} removed from favorites!`, 'info');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      clearFavorites();
      showToast('All favorites cleared!', 'info');
    }
  };

  if (favoriteProducts.length === 0) {
    return (
      <section className="favorites-section py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-8">
              <i className="fas fa-heart text-8xl text-gray-300 mb-4 animate-pulse"></i>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">Your Favorites</h2>
              <p className="text-gray-500 text-lg">No favorite items yet. Start exploring and add some items to your favorites!</p>
            </div>

            {/* Animated empty state */}
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-red-200/30 animate-pulse"></div>
                <i className="fas fa-heart text-6xl text-pink-400 relative z-10 animate-bounce"></i>

                {/* Floating hearts */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-pink-300 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-12 right-8 w-3 h-3 bg-red-300 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-1/2 left-4 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60"></div>
              </div>
            </div>

            <button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites-section py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <i className="fas fa-heart text-4xl text-red-500 animate-pulse"></i>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{favoriteProducts.length}</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Your Favorites</h1>
                <p className="text-gray-600">{favoriteProducts.length} item{favoriteProducts.length !== 1 ? 's' : ''} in your favorites</p>
              </div>
            </div>

            <button
              onClick={handleClearAll}
              className="bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-full hover:bg-red-200 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <i className="fas fa-trash-alt"></i>
              Clear All
            </button>
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product, index) => (
            <div
              key={product.id}
              className="favorite-item group bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image Container */}
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Favorite Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <i className="fas fa-heart animate-pulse"></i>
                    Favorite
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => handleRemoveFromFavorites(product.id, product.name, e)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white text-red-500 border border-gray-200 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                >
                  <i className="fas fa-times"></i>
                </button>

                {/* Add to Cart Button */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    Add to Cart
                  </button>
                </div>

                {/* Floating Elements */}
                {hoveredProduct === product.id && (
                  <>
                    <div className="absolute top-8 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute bottom-8 right-8 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute top-1/2 left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
                  </>
                )}
              </div>

              {/* Product Content */}
              <div className="p-6">
                {/* Category */}
                <p className="text-purple-600 text-sm font-semibold uppercase mb-2 transition-colors duration-300 group-hover:text-purple-700">
                  {product.category}
                </p>

                {/* Title */}
                <h3 className="text-gray-800 text-lg font-semibold capitalize mb-3 transition-all duration-300 group-hover:text-purple-600 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fas fa-star text-sm transition-colors duration-300 ${
                          star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2 transition-colors duration-300 group-hover:text-gray-700">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-900 text-xl font-bold transition-colors duration-300 group-hover:text-purple-600">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <del className="text-gray-400 text-sm transition-all duration-300">
                      ${product.originalPrice}
                    </del>
                  )}
                  {product.originalPrice && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      SAVE ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <i className="fas fa-arrow-left"></i>
              Continue Shopping
            </button>

            <button
              onClick={handleClearAll}
              className="bg-gray-100 text-gray-700 font-semibold py-3 px-8 rounded-full hover:bg-red-100 hover:text-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <i className="fas fa-trash-alt"></i>
              Clear All Favorites
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Favorites;
