import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const PurchaseNotificationEnhanced = () => {
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  // Enhanced notification types
  const notificationTypes = {
    cart: {
      icon: 'fas fa-shopping-cart',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      title: 'Added to Cart'
    },
    favorite: {
      icon: 'fas fa-heart',
      color: 'red',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: 'Added to Favorites'
    },
    purchase: {
      icon: 'fas fa-shopping-bag',
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      title: 'Recent Purchase'
    }
  };

  // Sample purchase data for social proof
  const purchaseData = [
    { product: "Rose Gold Earrings", location: "New York", timeAgo: "2 minutes" },
    { product: "Wireless Bluetooth Headphones", location: "Los Angeles", timeAgo: "5 minutes" },
    { product: "Smart Fitness Watch", location: "Chicago", timeAgo: "8 minutes" },
    { product: "Leather Crossbody Bag", location: "Miami", timeAgo: "12 minutes" },
    { product: "Stainless Steel Water Bottle", location: "Seattle", timeAgo: "15 minutes" },
    { product: "Organic Cotton T-Shirt", location: "Austin", timeAgo: "18 minutes" },
    { product: "Minimalist Desk Lamp", location: "Denver", timeAgo: "22 minutes" },
    { product: "Ceramic Coffee Mug Set", location: "Boston", timeAgo: "25 minutes" }
  ];

  // Listen for cart and favorites changes
  useEffect(() => {
    const handleCartChange = () => {
      if (cartItems.length > 0) {
        const lastItem = cartItems[cartItems.length - 1];
        addNotification({
          id: Date.now(),
          type: 'cart',
          product: lastItem.name || lastItem.title,
          message: `Added to your cart!`,
          timestamp: new Date(),
          item: lastItem
        });
      }
    };

    const handleFavoritesChange = () => {
      if (favoriteItems.length > 0) {
        const lastItem = favoriteItems[favoriteItems.length - 1];
        addNotification({
          id: Date.now() + 1,
          type: 'favorite',
          product: lastItem.name || lastItem.title,
          message: `Added to favorites!`,
          timestamp: new Date(),
          item: lastItem
        });
      }
    };

    // Add event listeners for custom events
    window.addEventListener('cartItemAdded', handleCartChange);
    window.addEventListener('favoriteItemAdded', handleFavoritesChange);

    return () => {
      window.removeEventListener('cartItemAdded', handleCartChange);
      window.removeEventListener('favoriteItemAdded', handleFavoritesChange);
    };
  }, [cartItems, favoriteItems]);

  // Show social proof notifications occasionally
  useEffect(() => {
    const showSocialProof = () => {
      const randomPurchase = purchaseData[Math.floor(Math.random() * purchaseData.length)];
      addNotification({
        id: Date.now() + Math.random(),
        type: 'purchase',
        product: randomPurchase.product,
        location: randomPurchase.location,
        timeAgo: randomPurchase.timeAgo,
        message: `Someone in ${randomPurchase.location} just bought this!`,
        timestamp: new Date()
      });
    };

    // Show social proof every 3-5 minutes (less frequently)
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        showSocialProof();
      }
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      config: notificationTypes[notification.type] || notificationTypes.cart
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep max 5 notifications
    setIsVisible(true);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notifications.length <= 1) {
      setIsVisible(false);
    }
  };



  const handleNotificationClick = (notification) => {
    // Handle different actions based on notification type
    if (notification.type === 'cart') {
      // Scroll to cart or open cart modal
      window.dispatchEvent(new CustomEvent('openCart'));
    } else if (notification.type === 'favorite') {
      // Navigate to favorites page
      window.location.href = '/favorites';
    }
    removeNotification(notification.id);
  };

  if (notifications.length === 0) return null;

  return (
    <div className="purchase-notification fixed bottom-6 right-6 z-50 space-y-3">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`notification-item ${notification.config.bgColor} ${notification.config.borderColor} border-2 rounded-xl shadow-lg p-4 max-w-sm cursor-pointer transform transition-all duration-300 hover:scale-105 animate-slideInRight`}
          style={{
            animationDelay: `${index * 0.1}s`,
            borderLeft: `4px solid var(--${notification.config.color}-500)`
          }}
          onClick={() => handleNotificationClick(notification)}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <i className={`${notification.config.icon} text-${notification.config.color}-500 mr-2 text-sm`}></i>
              <span className="text-gray-700 text-xs font-semibold">{notification.config.title}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-1">
            {notification.type === 'purchase' ? (
              <>
                <p className="text-gray-600 text-xs">
                  Someone in <span className="font-semibold text-purple-600">{notification.location}</span> just bought
                </p>
                <p className="text-gray-800 font-bold text-sm leading-tight">
                  {notification.product}
                </p>
                <p className="text-gray-400 text-xs">
                  {notification.timeAgo} ago
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-800 font-semibold text-sm">
                  {notification.product}
                </p>
                <p className="text-gray-600 text-xs">
                  {notification.message}
                </p>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-${notification.config.color}-400 to-${notification.config.color}-500 rounded-full transition-all duration-4000 ease-linear`}
              style={{
                width: '100%',
                animation: `progressShrink 4s linear forwards`
              }}
            ></div>
          </div>

          {/* Action hint */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            {notification.type === 'cart' && 'Click to view cart'}
            {notification.type === 'favorite' && 'Click to view favorites'}
            {notification.type === 'purchase' && 'Click to view product'}
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes progressShrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .purchase-notification {
          animation: slideInRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .notification-item {
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .notification-item:hover {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .purchase-notification {
            right: 4px;
            bottom: 4px;
            left: 4px;
            max-width: calc(100vw - 8px);
          }

          .notification-item {
            max-width: 100%;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .notification-item {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseNotificationEnhanced;
