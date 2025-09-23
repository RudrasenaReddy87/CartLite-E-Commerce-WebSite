import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

const CartItemMinimal = ({ item }) => {
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
    <div className="cart-item-minimal">
      <div className="cart-item-image-minimal">
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`product-image-minimal ${imageLoaded ? 'loaded' : ''}`}
        />
        {!imageLoaded && (
          <div className="image-placeholder-minimal">
            <i className="fas fa-image"></i>
          </div>
        )}
      </div>

      <div className="cart-item-details-minimal">
        <div className="item-info-minimal">
          <h4 className="item-name-minimal">{product.name}</h4>
          <div className="item-price-minimal">
            <span className="current-price-minimal">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price-minimal">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="quantity-controls-minimal">
          <button
            onClick={decrementQuantity}
            disabled={item.quantity <= 1 || isUpdating}
            className="quantity-btn-minimal"
          >
            <i className="fas fa-minus"></i>
          </button>

          <div className="quantity-display-minimal">
            <span className={`quantity-number-minimal ${isUpdating ? 'updating' : ''}`}>
              {item.quantity}
            </span>
          </div>

          <button
            onClick={incrementQuantity}
            disabled={isUpdating}
            className="quantity-btn-minimal"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="item-total-minimal">
          <span className="total-price-minimal">${(product.price * item.quantity).toFixed(2)}</span>
        </div>

        <div className="item-actions-minimal">
          <button
            onClick={handleRemove}
            className="remove-btn-minimal"
            title="Remove item"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .cart-item-minimal {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.25rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cart-item-minimal:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .cart-item-image-minimal {
          width: 40px;
          height: 40px;
          border-radius: 0.1875rem;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }

        .product-image-minimal {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          opacity: 0;
          transform: scale(0.8);
        }

        .product-image-minimal.loaded {
          opacity: 1;
          transform: scale(1);
        }

        .image-placeholder-minimal {
          width: 100%;
          height: 100%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .cart-item-details-minimal {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.375rem;
        }

        .item-info-minimal {
          flex: 1;
          min-width: 0;
        }

        .item-name-minimal {
          font-size: 0.625rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.125rem 0;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .item-price-minimal {
          display: flex;
          align-items: center;
          gap: 0.1875rem;
        }

        .current-price-minimal {
          font-size: 0.75rem;
          font-weight: 700;
          color: #1f2937;
        }

        .original-price-minimal {
          font-size: 0.5rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .quantity-controls-minimal {
          display: flex;
          align-items: center;
          gap: 0.1875rem;
          background: #f8fafc;
          border-radius: 0.1875rem;
          padding: 0.125rem;
        }

        .quantity-btn-minimal {
          width: 1rem;
          height: 1rem;
          border: none;
          background: white;
          border-radius: 0.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
          font-size: 0.5rem;
        }

        .quantity-btn-minimal:hover:not(:disabled) {
          background: #e5e7eb;
          color: #374151;
        }

        .quantity-btn-minimal:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-display-minimal {
          min-width: 1.25rem;
          text-align: center;
        }

        .quantity-number-minimal {
          font-size: 0.5rem;
          font-weight: 600;
          color: #1f2937;
          transition: all 0.2s ease;
        }

        .quantity-number-minimal.updating {
          color: #667eea;
          transform: scale(1.1);
        }

        .item-total-minimal {
          min-width: 2rem;
          text-align: right;
        }

        .total-price-minimal {
          font-size: 0.75rem;
          font-weight: 700;
          color: #1f2937;
        }

        .item-actions-minimal {
          display: flex;
          align-items: center;
        }

        .remove-btn-minimal {
          width: 1rem;
          height: 1rem;
          border: none;
          background: transparent;
          color: #ef4444;
          cursor: pointer;
          border-radius: 0.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 0.5rem;
        }

        .remove-btn-minimal:hover {
          background: #fee2e2;
          transform: scale(1.1);
        }

        @media (max-width: 640px) {
          .cart-item-minimal {
            flex-direction: column;
            align-items: stretch;
            gap: 0.375rem;
          }

          .cart-item-details-minimal {
            flex-direction: column;
            align-items: stretch;
            gap: 0.375rem;
          }

          .item-info-minimal {
            text-align: center;
          }

          .quantity-controls-minimal {
            justify-content: center;
          }

          .item-total-minimal {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItemMinimal;
