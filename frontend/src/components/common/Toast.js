import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';

const Toast = () => {
  const { toast, hideToast } = useUser();

  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.isOpen, hideToast]);

  if (!toast.isOpen) return null;

  return (
    <div className="notification-toast fixed top-8 right-8 z-50">
      <button
        onClick={hideToast}
        className="toast-close-btn absolute top-2 right-2 text-white text-sm p-1 z-10"
      >
        <i className="fas fa-times"></i>
      </button>

      <div className="toast-banner bg-white border border-cultured rounded-border-radius-md shadow-lg p-4 flex items-center gap-4">
        <img
          src="/images/products/jewellery-1.jpg"
          alt="Rose Gold Earrings"
          width="80"
          height="70"
          className="rounded-border-radius-sm"
        />
        <div className="toast-detail">
          <p className="toast-message text-sonic-silver text-fs-8 font-weight-500 mb-1">
            Someone in new just bought
          </p>
          <p className="toast-title text-onyx text-fs-7 font-weight-600 mb-1">
            Rose Gold Earrings
          </p>
          <p className="toast-meta text-sonic-silver text-fs-9">
            <time dateTime="PT2M">2 Minutes</time> ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
