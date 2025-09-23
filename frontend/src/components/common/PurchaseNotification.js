import React, { useState, useEffect } from 'react';

const PurchaseNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [lastShownTime, setLastShownTime] = useState(0);

  // Sample purchase data
  const purchaseData = [
    {
      id: 1,
      product: "Rose Gold Earrings",
      location: "New York",
      timeAgo: "2 minutes"
    },
    {
      id: 2,
      product: "Wireless Bluetooth Headphones",
      location: "Los Angeles",
      timeAgo: "5 minutes"
    },
    {
      id: 3,
      product: "Smart Fitness Watch",
      location: "Chicago",
      timeAgo: "8 minutes"
    },
    {
      id: 4,
      product: "Leather Crossbody Bag",
      location: "Miami",
      timeAgo: "12 minutes"
    },
    {
      id: 5,
      product: "Stainless Steel Water Bottle",
      location: "Seattle",
      timeAgo: "15 minutes"
    },
    {
      id: 6,
      product: "Organic Cotton T-Shirt",
      location: "Austin",
      timeAgo: "18 minutes"
    },
    {
      id: 7,
      product: "Minimalist Desk Lamp",
      location: "Denver",
      timeAgo: "22 minutes"
    },
    {
      id: 8,
      product: "Ceramic Coffee Mug Set",
      location: "Boston",
      timeAgo: "25 minutes"
    }
  ];

  useEffect(() => {
    const showNotification = () => {
      const currentTime = Date.now();
      const timeSinceLastShow = currentTime - lastShownTime;

      // Show notification if it's been more than 40 seconds since last show
      if (timeSinceLastShow >= 40000) {
        const randomPurchase = purchaseData[Math.floor(Math.random() * purchaseData.length)];
        setCurrentNotification(randomPurchase);
        setIsVisible(true);
        setLastShownTime(currentTime);

        // Auto-hide after 6 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 6000);
      }
    };

    // Check immediately on mount
    showNotification();

    // Set up interval to check every 20 seconds
    const interval = setInterval(showNotification, 20000);

    return () => clearInterval(interval);
  }, [lastShownTime]);

  if (!isVisible || !currentNotification) return null;

  return (
    <div className="purchase-notification fixed bottom-6 left-6 z-50 animate-slideInLeft">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 max-w-sm animate-fadeInUp">
        {/* Header */}
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
          <span className="text-gray-600 text-xs font-medium">Recent Purchase</span>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <p className="text-gray-500 text-xs">
            Someone in <span className="font-semibold text-purple-600">{currentNotification.location}</span> just bought
          </p>
          <p className="text-gray-800 font-bold text-sm leading-tight">
            {currentNotification.product}
          </p>
          <p className="text-gray-400 text-xs">
            {currentNotification.timeAgo} ago
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-6000 ease-linear"
            style={{
              width: '100%',
              animation: 'progressShrink 6s linear forwards'
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
          animation: slideInLeft 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .purchase-notification {
            left: 4px;
            bottom: 4px;
            max-width: calc(100vw - 8px);
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseNotification;
