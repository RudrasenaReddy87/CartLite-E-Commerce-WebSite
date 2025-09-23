import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import CartItem from './CartItem';
import UserInfoForm from './UserInfoForm';
import AddressForm from './AddressForm';
import PaymentOptions from './PaymentOptions';

const CartModalUltraCompact = () => {
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
      <div className="cart-modal-ultra-compact">
        {/* Header */}
        <div className="cart-modal-header-ultra-compact">
          <div className="cart-modal-title-ultra-compact">
            <h2 className="text-base font-bold text-gray-800">{getStepTitle()}</h2>
            <p className="text-gray-600 text-xs mt-0.5">{getStepDescription()}</p>
          </div>
          <button
            onClick={handleClose}
            className="cart-modal-close-ultra-compact"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="cart-modal-progress-ultra-compact">
          <div className="progress-bar-ultra-compact">
            <div
              className="progress-fill-ultra-compact"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
          <div className="progress-steps-ultra-compact">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`progress-step-ultra-compact ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
              >
                <span className="step-number-ultra-compact">{step}</span>
                <span className="step-label-ultra-compact">
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
        <div className="cart-modal-content-ultra-compact">
          {currentStep === 1 && (
            <div className="cart-items-section-ultra-compact">
              {items.length === 0 ? (
                <div className="empty-cart-ultra-compact">
                  <i className="fas fa-shopping-cart text-3xl text-gray-300 mb-1"></i>
                  <h3 className="text-base font-semibold text-gray-600 mb-0.5">Your cart is empty</h3>
                  <p className="text-gray-500 text-xs">Add some items to get started!</p>
                </div>
              ) : (
                <>
                  <div className="cart-items-list-ultra-compact">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="cart-summary-ultra-compact">
                    <div className="summary-row-ultra-compact">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row-ultra-compact">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="summary-row-ultra-compact total-ultra-compact">
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
            <div className="order-confirmation-ultra-compact">
              <div className="confirmation-icon-ultra-compact">
                <i className="fas fa-check-circle text-3xl text-green-500"></i>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-0.5">Order Confirmed!</h3>
              <p className="text-gray-600 text-xs">Thank you for your purchase. You will receive an email confirmation shortly.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="cart-modal-footer-ultra-compact">
          <div className="footer-actions-ultra-compact">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="btn-secondary-ultra-compact"
              >
                <i className="fas fa-arrow-left mr-0.5"></i>
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary-ultra-compact"
            >
              {currentStep === 5 ? 'Place Order' : 'Continue'}
              {currentStep < 5 && <i className="fas fa-arrow-right ml-0.5"></i>}
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

        .cart-modal-ultra-compact {
          background: white;
          border-radius: 0.375rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 336px;
          width: 100%;
          max-height: 40vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-out .cart-modal-ultra-compact {
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

        .cart-modal-header-ultra-compact {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cart-modal-title-ultra-compact h2 {
          margin: 0;
          font-size: 1rem;
        }

        .cart-modal-close-ultra-compact {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cart-modal-close-ultra-compact:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .cart-modal-progress-ultra-compact {
          padding: 0.5rem 1rem;
          background: #f8fafc;
        }

        .progress-bar-ultra-compact {
          width: 100%;
          height: 2px;
          background: #e5e7eb;
          border-radius: 1px;
          margin-bottom: 0.5rem;
          overflow: hidden;
        }

        .progress-fill-ultra-compact {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 1px;
          transition: width 0.3s ease;
        }

        .progress-steps-ultra-compact {
          display: flex;
          justify-content: space-between;
        }

        .progress-step-ultra-compact {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .progress-step-ultra-compact.active {
          opacity: 1;
        }

        .progress-step-ultra-compact.completed {
          opacity: 1;
        }

        .step-number-ultra-compact {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.125rem;
          transition: all 0.3s ease;
        }

        .progress-step-ultra-compact.active .step-number-ultra-compact {
          background: #667eea;
          color: white;
        }

        .progress-step-ultra-compact.completed .step-number-ultra-compact {
          background: #10b981;
          color: white;
        }

        .step-label-ultra-compact {
          font-size: 0.5rem;
          font-weight: 500;
          color: #6b7280;
        }

        .progress-step-ultra-compact.active .step-label-ultra-compact {
          color: #667eea;
        }

        .cart-modal-content-ultra-compact {
          flex: 1;
          overflow-y: auto;
          padding: 0.75rem;
          min-height: 150px;
        }

        .cart-items-section-ultra-compact {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .empty-cart-ultra-compact {
          text-align: center;
          padding: 1.5rem 0.25rem;
          color: #9ca3af;
        }

        .cart-items-list-ultra-compact {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .cart-summary-ultra-compact {
          background: #f8fafc;
          padding: 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid #e5e7eb;
        }

        .summary-row-ultra-compact {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.125rem 0;
          font-size: 0.75rem;
        }

        .summary-row-ultra-compact.total-ultra-compact {
          border-top: 1px solid #e5e7eb;
          margin-top: 0.25rem;
          padding-top: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
        }

        .order-confirmation-ultra-compact {
          text-align: center;
          padding: 0.75rem 0.25rem;
        }

        .confirmation-icon-ultra-compact {
          margin-bottom: 0.25rem;
        }

        .cart-modal-footer-ultra-compact {
          padding: 0.75rem 1rem;
          border-top: 1px solid #e5e7eb;
          background: #f8fafc;
        }

        .footer-actions-ultra-compact {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-primary-ultra-compact {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.375rem 1rem;
          border-radius: 0.25rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.75rem;
        }

        .btn-primary-ultra-compact:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-primary-ultra-compact:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary-ultra-compact {
          background: white;
          color: #6b7280;
          border: 1px solid #d1d5db;
          padding: 0.375rem 1rem;
          border-radius: 0.25rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.75rem;
        }

        .btn-secondary-ultra-compact:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        @media (max-width: 768px) {
          .cart-modal-ultra-compact {
            margin: 0;
            border-radius: 0;
            max-height: 100vh;
            max-width: 100%;
          }

          .cart-modal-header-ultra-compact,
          .cart-modal-content-ultra-compact,
          .cart-modal-footer-ultra-compact {
            padding: 0.5rem;
          }

          .footer-actions-ultra-compact {
            flex-direction: column;
            gap: 0.5rem;
          }

          .btn-primary-ultra-compact,
          .btn-secondary-ultra-compact {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CartModalUltraCompact;
