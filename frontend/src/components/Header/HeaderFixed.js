import TypingAnimation from '../common/TypingAnimation';
import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContextFixed';
import CartModalCompact from '../common/CartModalCompact';

const Header = () => {
  const { toggleMobileMenu, closeMobileMenu, animationReset } = useUser();
  const { itemCount, openCheckout } = useCart();
  const promotionalTexts = [
    "Get 20% off",
    "Free shipping",
    "New arrivals",
    "Limited offer",
    "Best deals",
    "Sale 50% off"
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <>
      {/* Header Top with Enhanced Animation */}
      <div className={`bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 py-2 hidden md:block transition-all duration-500 ${isScrolled ? 'opacity-90' : 'opacity-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <p className="text-white text-fs-9 uppercase font-medium animate-pulse">
              🎉 Free shipping on orders over $50 | <TypingAnimation texts={promotionalTexts} typingSpeed={100} deletingSpeed={50} pauseTime={2000} resetTrigger={Date.now()} />
            </p>
          </div>
        </div>
      </div>

      {/* Header Main with Enhanced Effects */}
      <header className={`bg-white border-b-2 border-gray-100 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg backdrop-blur-md' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-8">
            {/* Logo with Animation */}
            <div className="flex-shrink-0">
              <a href="/" className="block group">
                <img
                  src="/images/logo/logo.svg"
                  alt="CartLite E-commerce"
                  className="h-10 w-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
            </div>

            {/* Enhanced Search Container */}
            <div className="flex-1 max-w-lg">
              <form onSubmit={handleSearch} className="relative">
                <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search products..."
                    className={`w-full py-3 px-5 pr-14 text-onyx text-fs-7 border-2 rounded-full transition-all duration-300 bg-gray-50 focus:bg-white ${
                      isSearchFocused
                        ? 'border-purple-500 shadow-lg ring-4 ring-purple-100'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl p-2 rounded-full transition-all duration-300 ${
                      isSearchFocused
                        ? 'text-purple-600 bg-purple-100 scale-110'
                        : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <i className="fas fa-search transition-transform duration-300 hover:scale-110"></i>
                  </button>
                </div>
              </form>
            </div>

            {/* Enhanced Header Actions */}
            <div className="flex items-center gap-3">
              {/* User Account */}
              <button className="relative text-gray-700 text-2xl p-2 rounded-full hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 group">
                <i className="fas fa-user transition-transform duration-300 group-hover:scale-110"></i>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Wishlist */}
              <button className="relative text-gray-700 text-2xl p-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300 group">
                <i className="fas fa-heart transition-transform duration-300 group-hover:scale-110"></i>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Cart with Enhanced Animation */}
              <button
                onClick={openCheckout}
                className="relative text-gray-700 text-2xl p-2 rounded-full hover:bg-green-50 hover:text-green-600 transition-all duration-300 group cursor-pointer"
              >
                <i className="fas fa-shopping-bag transition-transform duration-300 group-hover:scale-110"></i>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center animate-bounce shadow-lg">
                    {itemCount}
                  </span>
                )}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-700 text-2xl p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Desktop Navigation */}
      <nav className="bg-white border-b border-gray-100 hidden md:block sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center items-center gap-12 py-2">
            {[
              { name: 'Home', icon: 'fas fa-home', href: '/' },
              { name: 'Shop', icon: 'fas fa-store', href: '/shop' },
              { name: 'Categories', icon: 'fas fa-th-large', href: '/categories' },
              { name: 'About', icon: 'fas fa-info-circle', href: '/about' },
              { name: 'Contact', icon: 'fas fa-phone', href: '/contact' }
            ].map((item, index) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="group flex flex-col items-center gap-1 text-gray-700 text-fs-7 font-semibold uppercase hover:text-purple-600 transition-all duration-300 py-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <i className={`${item.icon} transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-1`}></i>
                  <span className="relative">
                    {item.name}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Compact Cart Modal */}
      <CartModalCompact />
    </>
  );
};

export default Header;
