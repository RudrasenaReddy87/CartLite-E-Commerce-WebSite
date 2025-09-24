import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

const MobileMenu = () => {
  const { mobileMenu, closeMobileMenu } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    closeMobileMenu();
  };

  if (!mobileMenu.isOpen) return null;

  return (
    <>
      <div className="overlay fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}></div>

      <div className="mobile-menu fixed top-0 right-0 h-full w-80 max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
        <div className="mobile-menu-top bg-gradient-to-r from-purple-500 to-blue-500 text-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-lg font-bold uppercase">
              Menu
            </h2>
            <button
              onClick={closeMobileMenu}
              className="text-white text-xl p-1.5 hover:bg-white hover:bg-opacity-20 rounded-full transition-all"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="mobile-menu-search bg-white p-4 border-b border-gray-200">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-r-md hover:bg-purple-600 transition-colors"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <ul className="mobile-menu-list bg-white p-4 space-y-3 overflow-y-auto max-h-96">
          <li>
            <a
              href="/"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-gray-800 text-sm font-semibold uppercase hover:text-purple-500 transition-colors flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <i className="fas fa-home mr-3 text-purple-500"></i>
              Home
            </a>
          </li>
          <li>
            <a
              href="/shop"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-gray-800 text-sm font-semibold uppercase hover:text-purple-500 transition-colors flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <i className="fas fa-shopping-bag mr-3 text-purple-500"></i>
              Shop
            </a>
          </li>
          <li>
            <a
              href="/categories"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-gray-800 text-sm font-semibold uppercase hover:text-purple-500 transition-colors flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <i className="fas fa-list mr-3 text-purple-500"></i>
              Categories
            </a>
          </li>
          <li>
            <a
              href="/favorites"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-gray-800 text-sm font-semibold uppercase hover:text-purple-500 transition-colors flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <i className="fas fa-heart mr-3 text-purple-500"></i>
              Favorites
            </a>
          </li>
          <li>
            <a
              href="/about"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-gray-800 text-sm font-semibold uppercase hover:text-purple-500 transition-colors flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <i className="fas fa-info-circle mr-3 text-purple-500"></i>
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-gray-800 text-sm font-semibold uppercase hover:text-purple-500 transition-colors flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <i className="fas fa-phone mr-3 text-purple-500"></i>
              Contact
            </a>
          </li>
        </ul>

        <div className="mobile-menu-bottom bg-gray-50 p-4">
          <div className="mb-4">
            <h3 className="text-gray-800 text-sm font-bold mb-2">Quick Links</h3>
            <div className="flex space-x-3">
              <a href="#" className="text-purple-500 hover:text-purple-600 transition-colors">
                <i className="fab fa-facebook text-lg"></i>
              </a>
              <a href="#" className="text-purple-500 hover:text-purple-600 transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-purple-500 hover:text-purple-600 transition-colors">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-purple-500 hover:text-purple-600 transition-colors">
                <i className="fab fa-youtube text-lg"></i>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-800 text-sm font-semibold flex items-center">
              <i className="fas fa-phone mr-2 text-purple-500"></i>
              Call us:
            </span>
            <a href="tel:+1234567890" className="text-purple-500 text-sm font-semibold hover:underline">
              +1 234 567 890
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-800 text-sm font-semibold flex items-center">
              <i className="fas fa-envelope mr-2 text-purple-500"></i>
              Email:
            </span>
            <a href="mailto:info@anonecommerce.com" className="text-purple-500 text-sm font-semibold hover:underline">
              info@anonecommerce.com
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-menu {
          transform: translateX(100%);
        }

        .mobile-menu.active {
          transform: translateX(0);
        }

        .overlay {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .overlay.active {
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 640px) {
          .mobile-menu {
            width: 100%;
            max-width: none;
          }
        }
      `}</style>
    </>
  );
};

export default MobileMenu;
