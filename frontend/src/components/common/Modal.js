import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';

const Modal = () => {
  const { modal, hideModal, resetAnimation } = useUser();

  if (!modal.isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    hideModal();
  };

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-close-overlay fixed inset-0 bg-black bg-opacity-50" onClick={handleBackdropClick}></div>

      <div className="modal-content relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-4">
        <button
          onClick={hideModal}
          className="modal-close-btn absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
        >
          <i className="fas fa-times text-sm"></i>
        </button>

        <div className="newsletter-img hidden sm:block">
          <img src="/images/newsletter.png" alt="subscribe newsletter" className="w-full h-48 object-cover rounded-t-lg" />
        </div>

        <div className="newsletter p-6">
          <form onSubmit={handleNewsletterSubmit}>
            <div className="newsletter-header mb-4">
              <h3 className="newsletter-title text-gray-800 text-xl font-bold mb-2">
                Subscribe Newsletter.
              </h3>
              <p className="newsletter-desc text-gray-600 text-sm leading-relaxed">
                Subscribe the <b>Anon</b> to get latest products and discount update.
              </p>
            </div>

            <input
              type="email"
              name="email"
              className="email-field w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              placeholder="Email Address"
              required
            />

            <button
              type="submit"
              className="btn-newsletter w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
