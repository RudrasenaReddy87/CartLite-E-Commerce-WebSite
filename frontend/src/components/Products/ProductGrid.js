import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import { useFavorites } from '../../context/FavoritesContext';

const ProductGrid = () => {
  const { getFilteredProducts, loading, error } = useProducts();
  const { addToCart, openCheckout } = useCart();
  const { showToast } = useUser();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [animatingHearts, setAnimatingHearts] = useState(new Set());

  const products = getFilteredProducts();

  const handleAddToCart = (product) => {
    addToCart(product.id, 1);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleToggleFavorite = (product, e) => {
    e.stopPropagation();
    const productId = product.id;

    console.log('Heart button clicked for product:', product.name, 'ID:', productId);

    // Add animation
    setAnimatingHearts(prev => new Set([...prev, productId]));

    // Toggle favorite status
    toggleFavorite(product);

    // Show toast notification
    const isFav = isFavorite(productId);
    console.log('Is favorite after toggle:', isFav);
    showToast(
      isFav ? `${product.name} removed from favorites!` : `${product.name} added to favorites!`,
      isFav ? 'info' : 'success'
    );

    // Remove animation after delay
    setTimeout(() => {
      setAnimatingHearts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 1000);
  };

  if (loading) {
    return (
      <section className="product-main mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin mx-auto animation-delay-300"></div>
              </div>
              <p className="text-gray-600 text-lg">Loading amazing products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-main mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-16">
            <div className="text-center bg-red-50 p-8 rounded-2xl border border-red-200">
              <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4 animate-bounce"></i>
              <p className="text-red-700 text-xl font-semibold">Oops! Something went wrong</p>
              <p className="text-red-600 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="product-main mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-16">
            <div className="text-center bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <i className="fas fa-search text-5xl text-gray-400 mb-4 animate-pulse"></i>
              <p className="text-gray-600 text-xl font-semibold">No products found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-main mb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-grid group bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image Container */}
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badge */}
                {product.badge && (
                  <div
                    className={`absolute top-4 left-4 px-3 py-1.5 text-white text-sm font-bold rounded-full shadow-lg transform transition-all duration-300 ${
                      product.badgeType === 'pink' ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
                      product.badgeType === 'ocean-green' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                      product.badgeType === 'bittersweet' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      'bg-gradient-to-r from-purple-500 to-indigo-500'
                    } ${hoveredProduct === product.id ? 'scale-110 animate-pulse' : ''}`}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickView(product);
                    }}
                    className="w-12 h-12 bg-white text-gray-700 border border-gray-200 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    onClick={(e) => handleToggleFavorite(product, e)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg relative overflow-hidden ${
                      isFavorite(product.id)
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-red-600 hover:text-white hover:border-red-600'
                    }`}
                  >
                    <i className={`fas fa-heart transition-all duration-300 ${
                      animatingHearts.has(product.id) ? 'animate-bounce' : ''
                    }`}></i>

                    {/* Heart burst animation */}
                    {animatingHearts.has(product.id) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-16 h-16 bg-red-400 rounded-full animate-ping opacity-30"></div>
                        <div className="absolute w-12 h-12 bg-red-300 rounded-full animate-ping opacity-40 animation-delay-100"></div>
                        <div className="absolute w-8 h-8 bg-red-200 rounded-full animate-ping opacity-50 animation-delay-200"></div>
                      </div>
                    )}
                  </button>
                </div>

                {/* Quick Add Button */}
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

                {/* Add to Cart Button (Mobile) */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 md:hidden flex items-center justify-center gap-2"
                >
                  <i className="fas fa-shopping-cart"></i>
                  Add to Cart
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
};

export default ProductGrid;
