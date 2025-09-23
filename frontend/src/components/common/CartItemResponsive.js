import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

const CartItemResponsive = ({ item }) => {
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
    <div className="cart-item-responsive">
      <div className="cart-item-image-responsive">
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`product-image-responsive ${imageLoaded ? 'loaded' : ''}`}
        />
        {!imageLoaded && (
          <div className="image-placeholder-responsive">
            <i className="fas fa-image"></i>
          </div>
        )}
      </div>

      <div className="cart-item-details-responsive">
        <div className="item-info-responsive">
          <h4 className="item-name-responsive">{product.name}</h4>
          <div className="item-price-responsive">
            <span className="current-price-responsive">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price-responsive">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="quantity-controls-responsive">
          <button
            onClick={decrementQuantity}
            disabled={item.quantity <= 1 || isUpdating}
            className="quantity-btn-responsive"
          >
            <i className="fas fa-minus"></i>
          </button>

          <div className="quantity-display-responsive">
            <span className={`quantity-number-responsive ${isUpdating ? 'updating' : ''}`}>
              {item.quantity}
            </span>
          </div>

          <button
            onClick={incrementQuantity}
            disabled={isUpdating}
            className="quantity-btn-responsive"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="item-total-responsive">
          <span className="total-price-responsive">${(product.price * item.quantity).toFixed(2)}</span>
        </div>

        <div className="item-actions-responsive">
          <button
            onClick={handleRemove}
            className="remove-btn-responsive"
            title="Remove item"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .cart-item-responsive {
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

        .cart-item-responsive:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .cart-item-image-responsive {
          width: 60px;
          height: 60px;
          border-radius: 0.375rem;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }

        .product-image-responsive {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          opacity: 0;
          transform: scale(0.8);
        }

        .product-image-responsive.loaded {
          opacity: 1;
          transform: scale(1);
        }

        .image-placeholder-responsive {
          width: 100%;
          height: 100%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .cart-item-details-responsive {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .item-info-responsive {
          flex: 1;
          min-width: 0;
        }

        .item-name-responsive {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 0.25rem 0;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .item-price-responsive {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .current-price-responsive {
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
        }

        .original-price-responsive {
          font-size: 0.75rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .quantity-controls-responsive {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          background: #f8fafc;
          border-radius: 0.375rem;
          padding: 0.1875rem;
        }

        .quantity-btn-responsive {
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

        .quantity-btn-responsive:hover:not(:disabled) {
          background: #e5e7eb;
          color: #374151;
        }

        .quantity-btn-responsive:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-display-responsive {
          min-width: 2rem;
          text-align: center;
        }

        .quantity-number-responsive {
          font-size: 0.75rem;
          font-weight: 600;
          color: #1f2937;
          transition: all 0.2s ease;
        }

        .quantity-number-responsive.updating {
          color: #667eea;
          transform: scale(1.1);
        }

        .item-total-responsive {
          min-width: 3rem;
          text-align: right;
        }

        .total-price-responsive {
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
        }

        .item-actions-responsive {
          display: flex;
          align-items: center;
        }

        .remove-btn-responsive {
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

        .remove-btn-responsive:hover {
          background: #fee2e2;
          transform: scale(1.1);
        }

        /* Mobile First Responsive Design */

        /* Small screens (up to 480px) */
        @media (max-width: 480px) {
          .cart-item-responsive {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
            padding: 0.625rem;
          }

          .cart-item-image-responsive {
            width: 50px;
            height: 50px;
            align-self: center;
          }

          .cart-item-details-responsive {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .item-info-responsive {
            text-align: center;
            min-width: 0;
          }

          .item-name-responsive {
            font-size: 0.75rem;
            white-space: normal;
            overflow: visible;
          }

          .item-price-responsive {
            justify-content: center;
            gap: 0.25rem;
          }

          .current-price-responsive {
            font-size: 0.875rem;
          }

          .original-price-responsive {
            font-size: 0.625rem;
          }

          .quantity-controls-responsive {
            justify-content: center;
            padding: 0.125rem;
            gap: 0.25rem;
          }

          .quantity-btn-responsive {
            width: 1.25rem;
            height: 1.25rem;
            font-size: 0.625rem;
          }

          .quantity-display-responsive {
            min-width: 1.5rem;
          }

          .quantity-number-responsive {
            font-size: 0.625rem;
          }

          .item-total-responsive {
            text-align: center;
            min-width: auto;
          }

          .total-price-responsive {
            font-size: 0.875rem;
          }

          .item-actions-responsive {
            align-self: center;
          }

          .remove-btn-responsive {
            width: 1.25rem;
            height: 1.25rem;
            font-size: 0.625rem;
          }
        }

        /* Medium screens (481px to 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .cart-item-responsive {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
            padding: 0.75rem;
          }

          .cart-item-image-responsive {
            width: 55px;
            height: 55px;
            align-self: center;
          }

          .cart-item-details-responsive {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .item-info-responsive {
            text-align: center;
          }

          .quantity-controls-responsive {
            justify-content: center;
          }

          .item-total-responsive {
            text-align: center;
          }
        }

        /* Large screens (769px and up) */
        @media (min-width: 769px) {
          .cart-item-responsive {
            flex-direction: row;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
          }

          .cart-item-details-responsive {
            flex-direction: row;
            align-items: center;
            gap: 0.75rem;
          }

          .item-info-responsive {
            text-align: left;
          }

          .quantity-controls-responsive {
            flex-shrink: 0;
          }

          .item-total-responsive {
            text-align: right;
            min-width: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CartItemResponsive;
