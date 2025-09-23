import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContextFixed2';
import { useUser } from '../../context/UserContext';
import CartItem from './CartItem';
import UserInfoForm from './UserInfoForm';
import AddressForm from './AddressForm';
import PaymentOptions from './PaymentOptions';

const CartModal = () => {
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
      <div className="cart-modal">
        {/* Header */}
        <div className="cart-modal-header">
          <div className="cart-modal-title">
            <h2 className="text-2xl font-bold text-gray-800">{getStepTitle()}</h2>
            <p className="text-gray-600 text-sm mt-1">{getStepDescription()}</p>
          </div>
          <button
            onClick={handleClose}
            className="cart-modal-close"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="cart-modal-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
          <div className="progress-steps">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`progress-step ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
              >
                <span className="step-number">{step}</span>
                <span className="step-label">
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
        <div className="cart-modal-content">
          {currentStep === 1 && (
            <div className="cart-items-section">
              {items.length === 0 ? (
                <div className="empty-cart">
                  <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500">Add some items to get started!</p>
                </div>
              ) : (
                <>
                  <div className="cart-items-list">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="summary-row total">
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
            <div className="order-confirmation">
              <div className="confirmation-icon">
                <i className="fas fa-check-circle text-6xl text-green-500"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Confirmed!</h3>
              <p className="text-gray-600">Thank you for your purchase. You will receive an email confirmation shortly.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="cart-modal-footer">
          <div className="footer-actions">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="btn-secondary"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary"
            >
              {currentStep === 5 ? 'Place Order' : 'Continue'}
              {currentStep < 5 && <i className="fas fa-arrow-right ml-2"></i>}
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

        .cart-modal {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-out .cart-modal {
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

        .cart-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cart-modal-title h2 {
          margin: 0;
        }

        .cart-modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cart-modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .cart-modal-progress {
          padding: 1rem 2rem;
          background: #f8fafc;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .progress-step.active {
          opacity: 1;
        }

        .progress-step.completed {
          opacity: 1;
        }

        .step-number {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: #667eea;
          color: white;
        }

        .progress-step.completed .step-number {
          background: #10b981;
          color: white;
        }

        .step-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #6b7280;
        }

        .progress-step.active .step-label {
          color: #667eea;
        }

        .cart-modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          min-height: 300px;
        }

        .cart-items-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .empty-cart {
          text-align: center;
          padding: 3rem 1rem;
          color: #9ca3af;
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-summary {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }

        .summary-row.total {
          border-top: 2px solid #e5e7eb;
          margin-top: 1rem;
          padding-top: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
        }

        .order-confirmation {
          text-align: center;
          padding: 2rem 1rem;
        }

        .confirmation-icon {
          margin-bottom: 1rem;
        }

        .cart-modal-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e7eb;
          background: #f8fafc;
        }

        .footer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: white;
          color: #6b7280;
          border: 1px solid #d1d5db;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .btn-secondary:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        @media (max-width: 768px) {
          .cart-modal {
            margin: 0;
            border-radius: 0;
            max-height: 100vh;
          }

          .cart-modal-header,
          .cart-modal-content,
          .cart-modal-footer {
            padding: 1rem;
          }

          .footer-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CartModal;
