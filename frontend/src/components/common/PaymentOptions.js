import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const PaymentOptions = () => {
  const { paymentMethod, setPaymentMethod, total } = useCart();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod || 'cod');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: 'fas fa-money-bill-wave',
      fees: 'Free'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using any UPI app',
      icon: 'fas fa-mobile-alt',
      fees: 'Free'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, MasterCard, American Express',
      icon: 'fas fa-credit-card',
      fees: '2.9% + $0.30'
    }
  ];

  useEffect(() => {
    setSelectedMethod(paymentMethod || 'cod');
  }, [paymentMethod]);

  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
    setErrors({});
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Format card number
    if (name === 'number') {
      processedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (processedValue.length > 19) processedValue = processedValue.substring(0, 19);
    }

    // Format expiry date
    if (name === 'expiry') {
      processedValue = value.replace(/\D/g, '');
      if (processedValue.length >= 2) {
        processedValue = processedValue.substring(0, 2) + '/' + processedValue.substring(2, 4);
      }
      if (processedValue.length > 5) processedValue = processedValue.substring(0, 5);
    }

    // Limit CVV
    if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setCardData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
    if (errors.upiId) {
      setErrors(prev => ({
        ...prev,
        upiId: ''
      }));
    }
  };

  const validatePayment = () => {
    const newErrors = {};

    if (selectedMethod === 'card') {
      if (!cardData.number.replace(/\s/g, '')) {
        newErrors.number = 'Card number is required';
      } else if (cardData.number.replace(/\s/g, '').length < 13) {
        newErrors.number = 'Please enter a valid card number';
      }

      if (!cardData.expiry) {
        newErrors.expiry = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
        newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
      }

      if (!cardData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (cardData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }

      if (!cardData.name.trim()) {
        newErrors.name = 'Cardholder name is required';
      }
    }

    if (selectedMethod === 'upi') {
      if (!upiId.trim()) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+$/.test(upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePayment()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentMethod(selectedMethod);
      setIsProcessing(false);
    }, 1000);
  };

  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'unknown';
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa': return 'fab fa-cc-visa';
      case 'mastercard': return 'fab fa-cc-mastercard';
      case 'amex': return 'fab fa-cc-amex';
      default: return 'fas fa-credit-card';
    }
  };

  return (
    <div className="payment-options">
      <div className="payment-header">
        <h3 className="payment-title">Choose Payment Method</h3>
        <p className="payment-description">
          Select your preferred payment method to complete your order.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => handleMethodChange(method.id)}
            >
              <div className="method-header">
                <div className="method-icon">
                  <i className={method.icon}></i>
                </div>
                <div className="method-info">
                  <h4 className="method-name">{method.name}</h4>
                  <p className="method-description">{method.description}</p>
                </div>
                <div className="method-fees">
                  <span className="fees-text">{method.fees}</span>
                </div>
              </div>
              {selectedMethod === method.id && (
                <div className="method-expanded">
                  {method.id === 'cod' && (
                    <div className="cod-info">
                      <i className="fas fa-info-circle info-icon"></i>
                      <span>You'll pay ${total.toFixed(2)} when your order arrives.</span>
                    </div>
                  )}

                  {method.id === 'upi' && (
                    <div className="upi-form">
                      <div className="form-group">
                        <label htmlFor="upiId" className="form-label">
                          UPI ID *
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="upiId"
                            value={upiId}
                            onChange={handleUpiChange}
                            className={`form-input ${errors.upiId ? 'error' : ''}`}
                            placeholder="username@paytm"
                            disabled={isProcessing}
                          />
                          <i className="fas fa-at input-icon"></i>
                        </div>
                        {errors.upiId && <span className="error-message">{errors.upiId}</span>}
                      </div>
                    </div>
                  )}

                  {method.id === 'card' && (
                    <div className="card-form">
                      <div className="form-group">
                        <label htmlFor="cardNumber" className="form-label">
                          Card Number *
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="cardNumber"
                            name="number"
                            value={cardData.number}
                            onChange={handleCardInputChange}
                            className={`form-input ${errors.number ? 'error' : ''}`}
                            placeholder="1234 5678 9012 3456"
                            disabled={isProcessing}
                          />
                          <i className={`${getCardIcon(getCardType(cardData.number))} input-icon`}></i>
                        </div>
                        {errors.number && <span className="error-message">{errors.number}</span>}
                      </div>

                      <div className="form-row two-columns">
                        <div className="form-group">
                          <label htmlFor="expiry" className="form-label">
                            Expiry Date *
                          </label>
                          <div className="input-wrapper">
                            <input
                              type="text"
                              id="expiry"
                              name="expiry"
                              value={cardData.expiry}
                              onChange={handleCardInputChange}
                              className={`form-input ${errors.expiry ? 'error' : ''}`}
                              placeholder="MM/YY"
                              disabled={isProcessing}
                            />
                            <i className="fas fa-calendar input-icon"></i>
                          </div>
                          {errors.expiry && <span className="error-message">{errors.expiry}</span>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="cvv" className="form-label">
                            CVV *
                          </label>
                          <div className="input-wrapper">
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={cardData.cvv}
                              onChange={handleCardInputChange}
                              className={`form-input ${errors.cvv ? 'error' : ''}`}
                              placeholder="123"
                              disabled={isProcessing}
                            />
                            <i className="fas fa-lock input-icon"></i>
                          </div>
                          {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="cardName" className="form-label">
                          Cardholder Name *
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="cardName"
                            name="name"
                            value={cardData.name}
                            onChange={handleCardInputChange}
                            className={`form-input ${errors.name ? 'error' : ''}`}
                            placeholder="John Doe"
                            disabled={isProcessing}
                          />
                          <i className="fas fa-user input-icon"></i>
                        </div>
                        {errors.name && <span className="error-message">{errors.name}</span>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="payment-summary">
          <div className="summary-row">
            <span>Order Total:</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>
          {selectedMethod === 'card' && (
            <div className="summary-row">
              <span>Processing Fee:</span>
              <span className="fee-amount">${((total * 0.029) + 0.30).toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row final-total">
            <span>Total Payment:</span>
            <span>${(total + (selectedMethod === 'card' ? (total * 0.029) + 0.30 : 0)).toFixed(2)}</span>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isProcessing}
            className="submit-btn"
          >
            {isProcessing ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Processing Payment...
              </>
            ) : (
              <>
                <i className="fas fa-lock mr-2"></i>
                Complete Payment
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .payment-options {
          max-width: 600px;
          margin: 0 auto;
        }

        .payment-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .payment-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
        }

        .payment-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .payment-method {
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .payment-method:hover {
          border-color: #d1d5db;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .payment-method.selected {
          border-color: #667eea;
          background: #f0f4ff;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .method-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .method-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.5rem;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 1.25rem;
        }

        .payment-method.selected .method-icon {
          background: #667eea;
          color: white;
        }

        .method-info {
          flex: 1;
        }

        .method-name {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
        }

        .method-description {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .method-fees {
          text-align: right;
        }

        .fees-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: #10b981;
        }

        .method-expanded {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cod-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 0.5rem;
          color: #166534;
        }

        .info-icon {
          color: #16a34a;
        }

        .upi-form, .card-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row.two-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input.error {
          border-color: #ef4444;
        }

        .form-input:disabled {
          background: #f9fafb;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          color: #9ca3af;
          font-size: 0.875rem;
          transition: color 0.3s ease;
          pointer-events: none;
        }

        .form-input:focus + .input-icon {
          color: #667eea;
        }

        .error-message {
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 0.25rem;
        }

        .payment-summary {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          margin-bottom: 2rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
        }

        .summary-row.final-total {
          border-top: 2px solid #e5e7eb;
          margin-top: 1rem;
          padding-top: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
        }

        .total-amount, .fee-amount {
          font-weight: 600;
          color: #1f2937;
        }

        .form-actions {
          margin-top: 1rem;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 640px) {
          .payment-options {
            padding: 0 1rem;
          }

          .payment-title {
            font-size: 1.25rem;
          }

          .form-row.two-columns {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentOptions;
