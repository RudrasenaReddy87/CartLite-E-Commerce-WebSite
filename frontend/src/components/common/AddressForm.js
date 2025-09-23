import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const AddressForm = () => {
  const { address, setAddress } = useCart();
  const [formData, setFormData] = useState({
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      street: address.street || '',
      apartment: address.apartment || '',
      city: address.city || '',
      state: address.state || '',
      zipCode: address.zipCode || '',
      country: address.country || 'United States'
    });
  }, [address]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setAddress(formData);
      setIsSubmitting(false);
    }, 500);
  };

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  return (
    <div className="address-form">
      <div className="form-header">
        <h3 className="form-title">Delivery Address</h3>
        <p className="form-description">
          Where should we deliver your order? We'll use this address for shipping.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="address-form-content">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="street" className="form-label">
              Street Address *
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className={`form-input ${errors.street ? 'error' : ''}`}
                placeholder="123 Main Street"
                disabled={isSubmitting}
              />
              <i className="fas fa-map-marker-alt input-icon"></i>
            </div>
            {errors.street && <span className="error-message">{errors.street}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="apartment" className="form-label">
              Apartment, Suite, etc. (Optional)
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Apt 4B, Suite 200, etc."
                disabled={isSubmitting}
              />
              <i className="fas fa-building input-icon"></i>
            </div>
          </div>
        </div>

        <div className="form-row two-columns">
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City *
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`form-input ${errors.city ? 'error' : ''}`}
                placeholder="Enter city"
                disabled={isSubmitting}
              />
              <i className="fas fa-city input-icon"></i>
            </div>
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="state" className="form-label">
              State *
            </label>
            <div className="input-wrapper">
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`form-input ${errors.state ? 'error' : ''}`}
                disabled={isSubmitting}
              >
                <option value="">Select State</option>
                {usStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <i className="fas fa-map input-icon"></i>
            </div>
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>
        </div>

        <div className="form-row two-columns">
          <div className="form-group">
            <label htmlFor="zipCode" className="form-label">
              ZIP Code *
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`form-input ${errors.zipCode ? 'error' : ''}`}
                placeholder="12345"
                disabled={isSubmitting}
              />
              <i className="fas fa-mail-bulk input-icon"></i>
            </div>
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country *
            </label>
            <div className="input-wrapper">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`form-input ${errors.country ? 'error' : ''}`}
                disabled={isSubmitting}
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="Other">Other</option>
              </select>
              <i className="fas fa-globe input-icon"></i>
            </div>
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Saving Address...
              </>
            ) : (
              <>
                <i className="fas fa-check mr-2"></i>
                Save Address
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .address-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.5rem 0;
        }

        .form-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .address-form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
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

        .form-input.error:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .error-message::before {
          content: '⚠';
          font-size: 0.625rem;
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
          .address-form {
            padding: 0 1rem;
          }

          .form-title {
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

export default AddressForm;
