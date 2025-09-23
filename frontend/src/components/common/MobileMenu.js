import React from 'react';
import { useUser } from '../../context/UserContext';

const MobileMenu = () => {
  const { mobileMenu, closeMobileMenu } = useUser();

  if (!mobileMenu.isOpen) return null;

  return (
    <>
      <div className="overlay active" onClick={closeMobileMenu}></div>

      <div className="mobile-menu active">
        <div className="mobile-menu-top bg-white border-b border-cultured p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-onyx text-fs-5 font-weight-600 uppercase">
              Menu
            </h2>
            <button
              onClick={closeMobileMenu}
              className="text-onyx text-xl p-1.5"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <ul className="mobile-menu-list bg-white p-5 space-y-4">
          <li>
            <a
              href="/"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-onyx text-fs-7 font-weight-600 uppercase hover:text-salmon-pink transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/shop"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-onyx text-fs-7 font-weight-600 uppercase hover:text-salmon-pink transition-colors"
            >
              Shop
            </a>
          </li>
          <li>
            <a
              href="/categories"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-onyx text-fs-7 font-weight-600 uppercase hover:text-salmon-pink transition-colors"
            >
              Categories
            </a>
          </li>
          <li>
            <a
              href="/about"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-onyx text-fs-7 font-weight-600 uppercase hover:text-salmon-pink transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/contact"
              onClick={closeMobileMenu}
              className="mobile-menu-link text-onyx text-fs-7 font-weight-600 uppercase hover:text-salmon-pink transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="mobile-menu-bottom bg-cultured p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-onyx text-fs-7 font-weight-600">Call us:</span>
            <a href="tel:+1234567890" className="text-salmon-pink text-fs-7 font-weight-600">
              +1 234 567 890
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-onyx text-fs-7 font-weight-600">Email:</span>
            <a href="mailto:info@anonecommerce.com" className="text-salmon-pink text-fs-7 font-weight-600">
              info@anonecommerce.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
