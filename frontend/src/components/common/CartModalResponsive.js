import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import CartItem from './CartItem';
import UserInfoForm from './UserInfoForm';
import AddressForm from './AddressForm';
import PaymentOptions from './PaymentOptions';

const CartModalResponsive = () => {
  const {
    items,
    total,
    itemCount,
    isCheckoutOpen,
    currentStep,
    closeCheckout,
    nextStep,
    prevStep,
    resetCheckout,
    userInfo,
    address,
    paymentMethod
  } = useCart();

  const { showToast } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  // Handle modal visibility and animations
  useEffect(() => {
    if (isCheckoutOpen) {
      setIsVisible(true);
      setAnimationClass('animate-in');
      document.body.style.overflow = 'hidden';
    } else {
      setAnimationClass('animate-out');
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 300);
    }
  }, [isCheckoutOpen]);

  const handleClose = () => {
    closeCheckout();
    resetCheckout();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      nextStep();
    } else {
      // Complete order
      showToast('Order placed successfully! 🎉', 'success');
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      prevStep();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return items.length > 0;
      case 2: return userInfo.name && userInfo.email && userInfo.phone;
      case 3: return address.street && address.city && address.zipCode;
      case 4: return paymentMethod;
      default: return true;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Shopping Cart';
      case 2: return 'Customer Information';
      case 3: return 'Delivery Address';
      case 4: return 'Payment Method';
      case 5: return 'Order Confirmation';
      default: return 'Checkout';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Review your items';
      case 2: return 'Enter your details';
      case 3: return 'Where should we deliver?';
      case 4: return 'Choose payment method';
      case 5: return 'Confirm your order';
      default: return '';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`cart-modal-overlay ${animationClass}`} onClick={handleBackdropClick}>
      <div className="cart-modal-responsive">
        {/* Header */}
        <div className="cart-modal-header-responsive">
          <div className="cart-modal-title-responsive">
            <h2 className="cart-modal-title-text">{getStepTitle()}</h2>
            <p className="cart-modal-description">{getStepDescription()}</p>
          </div>
          <button
            onClick={handleClose}
            className="cart-modal-close-responsive"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="cart-modal-progress-responsive">
          <div className="progress-bar-responsive">
            <div
              className="progress-fill-responsive"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
          <div className="progress-steps-responsive">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`progress-step-responsive ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
              >
                <span className="step-number-responsive">{step}</span>
                <span className="step-label-responsive">
                  {step === 1 && 'Cart'}
                  {step === 2 && 'Info'}
                  {step === 3 && 'Address'}
                  {step === 4 && 'Payment'}
                  {step === 5 && 'Confirm'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="cart-modal-content-responsive">
          {currentStep === 1 && (
            <div className="cart-items-section-responsive">
              {items.length === 0 ? (
                <div className="empty-cart-responsive">
                  <i className="fas fa-shopping-cart empty-cart-icon"></i>
                  <h3 className="empty-cart-title">Your cart is empty</h3>
                  <p className="empty-cart-message">Add some items to get started!</p>
                </div>
              ) : (
                <>
                  <div className="cart-items-list-responsive">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="cart-summary-responsive">
                    <div className="summary-row-responsive">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row-responsive">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="summary-row-responsive total-responsive">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {currentStep === 2 && <UserInfoForm />}
          {currentStep === 3 && <AddressForm />}
          {currentStep === 4 && <PaymentOptions />}
          {currentStep === 5 && (
            <div className="order-confirmation-responsive">
              <div className="confirmation-icon-responsive">
                <i className="fas fa-check-circle confirmation-icon"></i>
              </div>
              <h3 className="confirmation-title">Order Confirmed!</h3>
              <p className="confirmation-message">Thank you for your purchase. You will receive an email confirmation shortly.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="cart-modal-footer-responsive">
          <div className="footer-actions-responsive">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="btn-secondary-responsive"
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary-responsive"
            >
              {currentStep === 5 ? 'Place Order' : 'Continue'}
              {currentStep < 5 && <i className="fas fa-arrow-right ml-1"></i>}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .cart-modal-responsive {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 500px;
          width: 100%;
          max-height: 60vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-out .cart-modal-responsive {
          animation: modalSlideOut 0.3s ease-in;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes modalSlideOut {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
        }

        .cart-modal-header-responsive {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cart-modal-title-responsive {
          flex: 1;
        }

        .cart-modal-title-text {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .cart-modal-description {
          margin: 0.25rem 0 0 0;
          font-size: 0.75rem;
          opacity: 0.9;
        }

        .cart-modal-close-responsive {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cart-modal-close-responsive:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .cart-modal-progress-responsive {
          padding: 0.75rem 1.5rem;
          background: #f8fafc;
        }

        .progress-bar-responsive {
          width: 100%;
          height: 3px;
          background: #e5e7eb;
          border-radius: 2px;
          margin-bottom: 0.75rem;
          overflow: hidden;
        }

        .progress-fill-responsive {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .progress-steps-responsive {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .progress-step-responsive {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .progress-step-responsive.active {
          opacity: 1;
        }

        .progress-step-responsive.completed {
          opacity: 1;
        }

        .step-number-responsive {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.625rem;
          font-weight: 600;
          margin-bottom: 0.125rem;
          transition: all 0.3s ease;
        }

        .progress-step-responsive.active .step-number-responsive {
          background: #667eea;
          color: white;
        }

        .progress-step-responsive.completed .step-number-responsive {
          background: #10b981;
          color: white;
        }

        .step-label-responsive {
          font-size: 0.625rem;
          font-weight: 500;
          color: #6b7280;
        }

        .progress-step-responsive.active .step-label-responsive {
          color: #667eea;
        }

        .cart-modal-content-responsive {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          min-height: 200px;
        }

        .cart-items-section-responsive {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .empty-cart-responsive {
          text-align: center;
          padding: 2rem 0.5rem;
          color: #9ca3af;
        }

        .empty-cart-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-cart-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-cart-message {
          font-size: 0.875rem;
        }

        .cart-items-list-responsive {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .cart-summary-responsive {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }

        .summary-row-responsive {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.25rem 0;
          font-size: 0.875rem;
        }

        .summary-row-responsive.total-responsive {
          border-top: 1px solid #e5e7eb;
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .order-confirmation-responsive {
          text-align: center;
          padding: 1rem 0.5rem;
        }

        .confirmation-icon-responsive {
          margin-bottom: 0.5rem;
        }

        .confirmation-icon {
          font-size: 3rem;
          color: #10b981;
        }

        .confirmation-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .confirmation-message {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .cart-modal-footer-responsive {
          padding: 1rem 1.5rem;
          border-top: 1px solid #e5e7eb;
          background: #f8fafc;
        }

        .footer-actions-responsive {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .btn-primary-responsive {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.875rem;
        }

        .btn-primary-responsive:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-primary-responsive:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary-responsive {
          background: white;
          color: #6b7280;
          border: 1px solid #d1d5db;
          padding: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.875rem;
        }

        .btn-secondary-responsive:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        /* Mobile First Responsive Design */

        /* Small screens (up to 480px) */
        @media (max-width: 480px) {
          .cart-modal-overlay {
            padding: 0.5rem;
          }

          .cart-modal-responsive {
            border-radius: 0;
            max-height: 100vh;
            max-width: 100%;
            width: 100%;
            height: 100vh;
          }

          .cart-modal-header-responsive {
            padding: 0.75rem 1rem;
          }

          .cart-modal-title-text {
            font-size: 1rem;
          }

          .cart-modal-description {
            font-size: 0.625rem;
          }

          .cart-modal-content-responsive {
            padding: 0.75rem;
            min-height: 120px;
          }

          .cart-modal-footer-responsive {
            padding: 0.75rem 1rem;
          }

          .footer-actions-responsive {
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn-primary-responsive,
          .btn-secondary-responsive {
            width: 100%;
            justify-content: center;
            padding: 0.75rem 1rem;
            font-size: 0.75rem;
          }

          .progress-steps-responsive {
            gap: 0.25rem;
          }

          .step-number-responsive {
            width: 1.25rem;
            height: 1.25rem;
            font-size: 0.5rem;
          }

          .step-label-responsive {
            font-size: 0.5rem;
          }

          .cart-items-section-responsive {
            gap: 0.75rem;
          }

          .cart-items-list-responsive {
            gap: 0.5rem;
          }

          .cart-summary-responsive {
            padding: 0.75rem;
          }

          .empty-cart-icon {
            font-size: 2.5rem;
          }

          .empty-cart-title {
            font-size: 1rem;
          }

          .empty-cart-message {
            font-size: 0.75rem;
          }

          .confirmation-icon {
            font-size: 2.5rem;
          }

          .confirmation-title {
            font-size: 1rem;
          }

          .confirmation-message {
            font-size: 0.75rem;
          }
        }

        /* Medium screens (481px to 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .cart-modal-overlay {
            padding: 1rem;
          }

          .cart-modal-responsive {
            border-radius: 0;
            max-height: 100vh;
            max-width: 100%;
            width: 100%;
          }

          .cart-modal-header-responsive {
            padding: 1rem 1.25rem;
          }

          .cart-modal-title-text {
            font-size: 1.125rem;
          }

          .cart-modal-content-responsive {
            padding: 1rem;
            min-height: 150px;
          }

          .cart-modal-footer-responsive {
            padding: 1rem 1.25rem;
          }

          .footer-actions-responsive {
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn-primary-responsive,
          .btn-secondary-responsive {
            width: 100%;
            justify-content: center;
            padding: 0.75rem 1.25rem;
          }

          .progress-steps-responsive {
            gap: 0.5rem;
          }

          .step-number-responsive {
            width: 1.25rem;
            height: 1.25rem;
            font-size: 0.5rem;
          }

          .step-label-responsive {
            font-size: 0.5rem;
          }
        }

        /* Large screens (769px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .cart-modal-overlay {
            padding: 1.5rem;
          }

          .cart-modal-responsive {
            max-width: 700px;
            max-height: 75vh;
            border-radius: 0.75rem;
          }

          .cart-modal-header-responsive,
          .cart-modal-content-responsive,
          .cart-modal-footer-responsive {
            padding: 1.25rem 1.75rem;
          }

          .cart-modal-title-text {
            font-size: 1.25rem;
          }

          .footer-actions-responsive {
            flex-direction: row;
            gap: 1rem;
          }

          .btn-primary-responsive,
          .btn-secondary-responsive {
            width: auto;
            padding: 0.625rem 1.5rem;
          }
        }

        /* Extra large screens (1025px and up) */
        @media (min-width: 1025px) {
          .cart-modal-overlay {
            padding: 2rem;
          }

          .cart-modal-responsive {
            max-width: 600px;
            max-height: 70vh;
            border-radius: 0.75rem;
          }

          .cart-modal-header-responsive,
          .cart-modal-content-responsive,
          .cart-modal-footer-responsive {
            padding: 1.5rem 2rem;
          }

          .cart-modal-title-text {
            font-size: 1.375rem;
          }

          .footer-actions-responsive {
            flex-direction: row;
            gap: 1rem;
          }

          .btn-primary-responsive,
          .btn-secondary-responsive {
            width: auto;
            padding: 0.5rem 1.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CartModalResponsive;
