import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

const CartItemCompact = ({ item }) => {
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
    } else {
      // Remove item when quantity reaches 0
      handleRemove();
    }
  };

  return (
    <div className="cart-item-compact">
      <div className="cart-item-image-compact">
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`product-image-compact ${imageLoaded ? 'loaded' : ''}`}
        />
        {!imageLoaded && (
          <div className="image-placeholder-compact">
            <i className="fas fa-image"></i>
          </div>
        )}
      </div>

      <div className="cart-item-details-compact">
        <div className="item-info-compact">
          <h4 className="item-name-compact">{product.name}</h4>
          <div className="item-price-compact">
            <span className="current-price-compact">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price-compact">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="quantity-controls-compact">
          <button
            onClick={decrementQuantity}
            disabled={item.quantity <= 1 || isUpdating}
            className="quantity-btn-compact"
          >
            <i className="fas fa-minus"></i>
          </button>

          <div className="quantity-display-compact">
            <span className={`quantity-number-compact ${isUpdating ? 'updating' : ''}`}>
              {item.quantity}
            </span>
          </div>

          <button
            onClick={incrementQuantity}
            disabled={isUpdating}
            className="quantity-btn-compact"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="item-total-compact">
          <span className="total-price-compact">${(product.price * item.quantity).toFixed(2)}</span>
        </div>

        <div className="item-actions-compact">
          <button
            onClick={handleRemove}
            className="remove-btn-compact"
            title="Remove item"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .cart-item-compact {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cart-item-compact:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .cart-item-image-compact {
          width: 60px;
          height: 60px;
          border-radius: 0.375rem;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }

        .product-image-compact {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          opacity: 0;
          transform: scale(0.8);
        }

        .product-image-compact.loaded {
          opacity: 1;
          transform: scale(1);
        }

        .image-placeholder-compact {
          width: 100%;
          height: 100%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .cart-item-details-compact {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .item-info-compact {
          flex: 1;
          min-width: 0;
        }

        .item-name-compact {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .item-price-compact {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .current-price-compact {
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
        }

        .original-price-compact {
          font-size: 0.75rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .quantity-controls-compact {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          background: #f8fafc;
          border-radius: 0.375rem;
          padding: 0.1875rem;
        }

        .quantity-btn-compact {
          width: 1.5rem;
          height: 1.5rem;
          border: none;
          background: white;
          border-radius: 0.1875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
          font-size: 0.75rem;
        }

        .quantity-btn-compact:hover:not(:disabled) {
          background: #e5e7eb;
          color: #374151;
        }

        .quantity-btn-compact:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-display-compact {
          min-width: 2rem;
          text-align: center;
        }

        .quantity-number-compact {
          font-size: 0.75rem;
          font-weight: 600;
          color: #1f2937;
          transition: all 0.2s ease;
        }

        .quantity-number-compact.updating {
          color: #667eea;
          transform: scale(1.1);
        }

        .item-total-compact {
          min-width: 3rem;
          text-align: right;
        }

        .total-price-compact {
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
        }

        .item-actions-compact {
          display: flex;
          align-items: center;
        }

        .remove-btn-compact {
          width: 1.5rem;
          height: 1.5rem;
          border: none;
          background: transparent;
          color: #ef4444;
          cursor: pointer;
          border-radius: 0.1875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 0.75rem;
        }

        .remove-btn-compact:hover {
          background: #fee2e2;
          transform: scale(1.1);
        }

        @media (max-width: 640px) {
          .cart-item-compact {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .cart-item-details-compact {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .item-info-compact {
            text-align: center;
          }

          .quantity-controls-compact {
            justify-content: center;
          }

          .item-total-compact {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItemCompact;
