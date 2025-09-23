import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import CartItem from './CartItem';
import UserInfoForm from './UserInfoForm';
import AddressForm from './AddressForm';
import PaymentOptions from './PaymentOptions';

const CartModalMinimal = () => {
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
      <div className="cart-modal-minimal">
        {/* Header */}
        <div className="cart-modal-header-minimal">
          <div className="cart-modal-title-minimal">
            <h2 className="text-sm font-bold text-gray-800">{getStepTitle()}</h2>
            <p className="text-gray-600 text-xs mt-0.5">{getStepDescription()}</p>
          </div>
          <button
            onClick={handleClose}
            className="cart-modal-close-minimal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="cart-modal-progress-minimal">
          <div className="progress-bar-minimal">
            <div
              className="progress-fill-minimal"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
          <div className="progress-steps-minimal">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`progress-step-minimal ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
              >
                <span className="step-number-minimal">{step}</span>
                <span className="step-label-minimal">
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
        <div className="cart-modal-content-minimal">
          {currentStep === 1 && (
            <div className="cart-items-section-minimal">
              {items.length === 0 ? (
                <div className="empty-cart-minimal">
                  <i className="fas fa-shopping-cart text-2xl text-gray-300 mb-1"></i>
                  <h3 className="text-sm font-semibold text-gray-600 mb-0.5">Your cart is empty</h3>
                  <p className="text-gray-500 text-xs">Add some items to get started!</p>
                </div>
              ) : (
                <>
                  <div className="cart-items-list-minimal">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="cart-summary-minimal">
                    <div className="summary-row-minimal">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row-minimal">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="summary-row-minimal total-minimal">
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
            <div className="order-confirmation-minimal">
              <div className="confirmation-icon-minimal">
                <i className="fas fa-check-circle text-2xl text-green-500"></i>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-0.5">Order Confirmed!</h3>
              <p className="text-gray-600 text-xs">Thank you for your purchase. You will receive an email confirmation shortly.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="cart-modal-footer-minimal">
          <div className="footer-actions-minimal">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="btn-secondary-minimal"
              >
                <i className="fas fa-arrow-left mr-0.5"></i>
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary-minimal"
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

        .cart-modal-minimal {
          background: white;
          border-radius: 0.25rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 320px;
          width: 100%;
          max-height: 35vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-out .cart-modal-minimal {
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

        .cart-modal-header-minimal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cart-modal-title-minimal h2 {
          margin: 0;
          font-size: 0.875rem;
        }

        .cart-modal-close-minimal {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cart-modal-close-minimal:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .cart-modal-progress-minimal {
          padding: 0.375rem 0.75rem;
          background: #f8fafc;
        }

        .progress-bar-minimal {
          width: 100%;
          height: 2px;
          background: #e5e7eb;
          border-radius: 1px;
          margin-bottom: 0.375rem;
          overflow: hidden;
        }

        .progress-fill-minimal {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 1px;
          transition: width 0.3s ease;
        }

        .progress-steps-minimal {
          display: flex;
          justify-content: space-between;
        }

        .progress-step-minimal {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .progress-step-minimal.active {
          opacity: 1;
        }

        .progress-step-minimal.completed {
          opacity: 1;
        }

        .step-number-minimal {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.375rem;
          font-weight: 600;
          margin-bottom: 0.125rem;
          transition: all 0.3s ease;
        }

        .progress-step-minimal.active .step-number-minimal {
          background: #667eea;
          color: white;
        }

        .progress-step-minimal.completed .step-number-minimal {
          background: #10b981;
          color: white;
        }

        .step-label-minimal {
          font-size: 0.375rem;
          font-weight: 500;
          color: #6b7280;
        }

        .progress-step-minimal.active .step-label-minimal {
          color: #667eea;
        }

        .cart-modal-content-minimal {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
          min-height: 120px;
        }

        .cart-items-section-minimal {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .empty-cart-minimal {
          text-align: center;
          padding: 1rem 0.25rem;
          color: #9ca3af;
        }

        .cart-items-list-minimal {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .cart-summary-minimal {
          background: #f8fafc;
          padding: 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid #e5e7eb;
        }

        .summary-row-minimal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.125rem 0;
          font-size: 0.625rem;
        }

        .summary-row-minimal.total-minimal {
          border-top: 1px solid #e5e7eb;
          margin-top: 0.25rem;
          padding-top: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #1f2937;
        }

        .order-confirmation-minimal {
          text-align: center;
          padding: 0.5rem 0.25rem;
        }

        .confirmation-icon-minimal {
          margin-bottom: 0.25rem;
        }

        .cart-modal-footer-minimal {
          padding: 0.5rem 0.75rem;
          border-top: 1px solid #e5e7eb;
          background: #f8fafc;
        }

        .footer-actions-minimal {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-primary-minimal {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.25rem 0.75rem;
          border-radius: 0.1875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.625rem;
        }

        .btn-primary-minimal:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-primary-minimal:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary-minimal {
          background: white;
          color: #6b7280;
          border: 1px solid #d1d5db;
          padding: 0.25rem 0.75rem;
          border-radius: 0.1875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-size: 0.625rem;
        }

        .btn-secondary-minimal:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        @media (max-width: 768px) {
          .cart-modal-minimal {
            margin: 0;
            border-radius: 0;
            max-height: 100vh;
            max-width: 100%;
          }

          .cart-modal-header-minimal,
          .cart-modal-content-minimal,
          .cart-modal-footer-minimal {
            padding: 0.375rem;
          }

          .footer-actions-minimal {
            flex-direction: column;
            gap: 0.375rem;
          }

          .btn-primary-minimal,
          .btn-secondary-minimal {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CartModalMinimal;
