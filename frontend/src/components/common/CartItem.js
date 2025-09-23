import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const { getProductById } = useProducts();
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const product = getProductById(item.productId);

  if (!product) {
    return null;
  }

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    // Add a small delay for better UX
    setTimeout(() => {
      updateCartItem(item.id, newQuantity);
      setIsUpdating(false);
    }, 200);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const incrementQuantity = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
        />
        {!imageLoaded && (
          <div className="image-placeholder">
            <i className="fas fa-image"></i>
          </div>
        )}
      </div>

      <div className="cart-item-details">
        <div className="item-info">
          <h4 className="item-name">{product.name}</h4>
          <p className="item-category">{product.category}</p>
          <div className="item-price">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="quantity-controls">
          <button
            onClick={decrementQuantity}
            disabled={item.quantity <= 1 || isUpdating}
            className="quantity-btn"
          >
            <i className="fas fa-minus"></i>
          </button>

          <div className="quantity-display">
            <span className={`quantity-number ${isUpdating ? 'updating' : ''}`}>
              {item.quantity}
            </span>
          </div>

          <button
            onClick={incrementQuantity}
            disabled={isUpdating}
            className="quantity-btn"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="item-total">
          <span className="total-price">${(product.price * item.quantity).toFixed(2)}</span>
        </div>

        <div className="item-actions">
          <button
            onClick={handleRemove}
            className="remove-btn"
            title="Remove item"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cart-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .cart-item-image {
          width: 80px;
          height: 80px;
          border-radius: 0.5rem;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          opacity: 0;
          transform: scale(0.8);
        }

        .product-image.loaded {
          opacity: 1;
          transform: scale(1);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .item-info {
          flex: 1;
        }

        .item-name {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }

        .item-category {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
          font-weight: 500;
        }

        .item-price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .current-price {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1f2937;
        }

        .original-price {
          font-size: 0.875rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f8fafc;
          border-radius: 0.5rem;
          padding: 0.25rem;
        }

        .quantity-btn {
          width: 2rem;
          height: 2rem;
          border: none;
          background: white;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
        }

        .quantity-btn:hover:not(:disabled) {
          background: #e5e7eb;
          color: #374151;
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-display {
          min-width: 3rem;
          text-align: center;
        }

        .quantity-number {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
          transition: all 0.2s ease;
        }

        .quantity-number.updating {
          color: #667eea;
          transform: scale(1.1);
        }

        .item-total {
          min-width: 4rem;
          text-align: right;
        }

        .total-price {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1f2937;
        }

        .item-actions {
          display: flex;
          align-items: center;
        }

        .remove-btn {
          width: 2rem;
          height: 2rem;
          border: none;
          background: transparent;
          color: #ef4444;
          cursor: pointer;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: #fee2e2;
          transform: scale(1.1);
        }

        @media (max-width: 640px) {
          .cart-item {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .cart-item-details {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .item-info {
            text-align: center;
          }

          .quantity-controls {
            justify-content: center;
          }

          .item-total {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItem;
