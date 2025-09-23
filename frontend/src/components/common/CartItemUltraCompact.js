import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

const CartItemUltraCompact = ({ item }) => {
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
    <div className="cart-item-ultra-compact">
      <div className="cart-item-image-ultra-compact">
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`product-image-ultra-compact ${imageLoaded ? 'loaded' : ''}`}
        />
        {!imageLoaded && (
          <div className="image-placeholder-ultra-compact">
            <i className="fas fa-image"></i>
          </div>
        )}
      </div>

      <div className="cart-item-details-ultra-compact">
        <div className="item-info-ultra-compact">
          <h4 className="item-name-ultra-compact">{product.name}</h4>
          <div className="item-price-ultra-compact">
            <span className="current-price-ultra-compact">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price-ultra-compact">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="quantity-controls-ultra-compact">
          <button
            onClick={decrementQuantity}
            disabled={item.quantity <= 1 || isUpdating}
            className="quantity-btn-ultra-compact"
          >
            <i className="fas fa-minus"></i>
          </button>

          <div className="quantity-display-ultra-compact">
            <span className={`quantity-number-ultra-compact ${isUpdating ? 'updating' : ''}`}>
              {item.quantity}
            </span>
          </div>

          <button
            onClick={incrementQuantity}
            disabled={isUpdating}
            className="quantity-btn-ultra-compact"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="item-total-ultra-compact">
          <span className="total-price-ultra-compact">${(product.price * item.quantity).toFixed(2)}</span>
        </div>

        <div className="item-actions-ultra-compact">
          <button
            onClick={handleRemove}
            className="remove-btn-ultra-compact"
            title="Remove item"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .cart-item-ultra-compact {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cart-item-ultra-compact:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .cart-item-image-ultra-compact {
          width: 48px;
          height: 48px;
          border-radius: 0.25rem;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }

        .product-image-ultra-compact {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          opacity: 0;
          transform: scale(0.8);
        }

        .product-image-ultra-compact.loaded {
          opacity: 1;
          transform: scale(1);
        }

        .image-placeholder-ultra-compact {
          width: 100%;
          height: 100%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .cart-item-details-ultra-compact {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .item-info-ultra-compact {
          flex: 1;
          min-width: 0;
        }

        .item-name-ultra-compact {
          font-size: 0.75rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.125rem 0;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .item-price-ultra-compact {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .current-price-ultra-compact {
          font-size: 0.875rem;
          font-weight: 700;
          color: #1f2937;
        }

        .original-price-ultra-compact {
          font-size: 0.625rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .quantity-controls-ultra-compact {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: #f8fafc;
          border-radius: 0.25rem;
          padding: 0.125rem;
        }

        .quantity-btn-ultra-compact {
          width: 1.25rem;
          height: 1.25rem;
          border: none;
          background: white;
          border-radius: 0.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
          font-size: 0.625rem;
        }

        .quantity-btn-ultra-compact:hover:not(:disabled) {
          background: #e5e7eb;
          color: #374151;
        }

        .quantity-btn-ultra-compact:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-display-ultra-compact {
          min-width: 1.5rem;
          text-align: center;
        }

        .quantity-number-ultra-compact {
          font-size: 0.625rem;
          font-weight: 600;
          color: #1f2937;
          transition: all 0.2s ease;
        }

        .quantity-number-ultra-compact.updating {
          color: #667eea;
          transform: scale(1.1);
        }

        .item-total-ultra-compact {
          min-width: 2.5rem;
          text-align: right;
        }

        .total-price-ultra-compact {
          font-size: 0.875rem;
          font-weight: 700;
          color: #1f2937;
        }

        .item-actions-ultra-compact {
          display: flex;
          align-items: center;
        }

        .remove-btn-ultra-compact {
          width: 1.25rem;
          height: 1.25rem;
          border: none;
          background: transparent;
          color: #ef4444;
          cursor: pointer;
          border-radius: 0.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 0.625rem;
        }

        .remove-btn-ultra-compact:hover {
          background: #fee2e2;
          transform: scale(1.1);
        }

        @media (max-width: 640px) {
          .cart-item-ultra-compact {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .cart-item-details-ultra-compact {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }

          .item-info-ultra-compact {
            text-align: center;
          }

          .quantity-controls-ultra-compact {
            justify-content: center;
          }

          .item-total-ultra-compact {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItemUltraCompact;
