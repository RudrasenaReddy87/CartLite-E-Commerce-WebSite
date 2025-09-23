import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

const NewsletterPopup = () => {
  const { showNewsletterPopup, hideNewsletterPopup, showToast } = useUser();
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastShownTime, setLastShownTime] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Check if we should show the popup (every 30 seconds)
    const checkAndShowPopup = () => {
      const currentTime = Date.now();
      const timeSinceLastShow = currentTime - lastShownTime;

      // Show popup if it's been more than 30 seconds since last show
      if (timeSinceLastShow >= 30000) {
        setIsVisible(true);
        showNewsletterPopup();
        setLastShownTime(currentTime);
        localStorage.setItem('newsletterLastShown', currentTime.toString());
        createParticles();
      }
    };

    // Get last shown time from localStorage
    const storedTime = localStorage.getItem('newsletterLastShown');
    if (storedTime) {
      setLastShownTime(parseInt(storedTime));
    }

    // Check immediately on mount
    checkAndShowPopup();

    // Set up interval to check every 10 seconds
    const interval = setInterval(checkAndShowPopup, 10000);

    return () => clearInterval(interval);
  }, [showNewsletterPopup, lastShownTime]);

  useEffect(() => {
    let countdownInterval;
    if (isVisible && timeLeft > 0) {
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [isVisible, timeLeft]);

  const handleClose = () => {
    setIsVisible(false);
    hideNewsletterPopup();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Show success message
    setShowSuccess(true);

    // Show toast notification
    showToast('Successfully subscribed to newsletter!', 'success');

    // Create confetti effect
    createConfetti();

    // Reset form
    setEmail('');

    // Hide popup after 2 seconds
    setTimeout(() => {
      handleClose();
      setShowSuccess(false);
    }, 2000);
  };

  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) { // Reduced particle count
      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 8 + 8;

      newParticles.push({
        id: i,
        size,
        posX,
        delay,
        duration,
        color: ['#6c5ce7', '#a363d9', '#fd79a8', '#fdcb6e', '#00b894'][Math.floor(Math.random() * 5)]
      });
    }
    setParticles(newParticles);
  };

  const createConfetti = () => {
    const container = document.querySelector('.popup-content');
    const colors = ['#6c5ce7', '#00b894', '#fd79a8', '#fdcb6e', '#00cec9', '#ff7675'];

    if (!container) return;

    for (let i = 0; i < 50; i++) { // Reduced confetti count
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.width = (Math.random() * 8 + 4) + 'px';
      confetti.style.height = (Math.random() * 8 + 4) + 'px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.opacity = '0';
      confetti.style.position = 'absolute';
      confetti.style.zIndex = '1000';

      container.appendChild(confetti);

      const animationDuration = Math.random() * 2 + 1.5;

      confetti.style.animation = `confettiFall ${animationDuration}s linear forwards`;

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, animationDuration * 1000);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="newsletter-popup fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85 backdrop-blur-md animate-fadeIn p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="popup-content relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden animate-slideUp">
        {/* Floating Shapes - Smaller */}
        <div className="floating-shapes absolute inset-0 overflow-hidden pointer-events-none">
          <div className="shape shape-1 absolute w-16 h-16 bg-purple-500 rounded-full opacity-30 animate-float" style={{animationDelay: '0s', animationDuration: '25s'}}></div>
          <div className="shape shape-2 absolute w-12 h-12 bg-green-500 rounded-full opacity-30 animate-float" style={{animationDelay: '3s', animationDuration: '20s'}}></div>
          <div className="shape shape-3 absolute w-8 h-8 bg-pink-500 rounded-full opacity-30 animate-float" style={{animationDelay: '6s', animationDuration: '22s'}}></div>
          <div className="shape shape-4 absolute w-10 h-10 bg-yellow-500 rounded-full opacity-30 animate-float" style={{animationDelay: '2s', animationDuration: '28s'}}></div>
        </div>

        {/* Particles - Reduced */}
        <div className="particles absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.posX}%`,
                top: '100%',
                backgroundColor: particle.color,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                animation: 'particleFloat 15s linear infinite'
              }}
            />
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="close-btn absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-10"
        >
          <i className="fas fa-times text-sm"></i>
        </button>

        {/* Wave Decoration */}
        <div className="wave absolute bottom-0 left-0 w-full h-16 opacity-15 animate-wave"></div>

        {/* Icon */}
        <div className="newsletter-icon text-5xl text-purple-500 mb-3 mt-6 animate-bounce">
          <i className="fas fa-paper-plane drop-shadow-lg"></i>
        </div>

        {/* Title */}
        <h2 className="text-gray-800 text-xl font-bold mb-2 px-4 font-montserrat bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent animate-textGlow">
          Join Our Newsletter
        </h2>

        {/* Static Text - No Typing Animation */}
        <div className="typing-text min-h-8 mb-3 px-4">
          <span className="text-purple-500 font-semibold text-sm">Get exclusive offers & updates!</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 px-4 text-sm leading-relaxed">
          Subscribe now to receive the latest updates, special offers, and premium content.
        </p>

        {/* Benefits - Compact */}
        <div className="benefits mb-4 px-4">
          <div className="flex items-center mb-2 p-2 rounded-lg bg-gray-50 hover:bg-purple-50 hover:translate-x-1 transition-all duration-300">
            <i className="fas fa-gift text-purple-500 mr-2 text-sm hover:scale-110 transition-transform"></i>
            <span className="text-gray-600 text-xs">Exclusive discounts</span>
          </div>
          <div className="flex items-center mb-2 p-2 rounded-lg bg-gray-50 hover:bg-purple-50 hover:translate-x-1 transition-all duration-300">
            <i className="fas fa-newspaper text-purple-500 mr-2 text-sm hover:scale-110 transition-transform"></i>
            <span className="text-gray-600 text-xs">Weekly insights</span>
          </div>
          <div className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-purple-50 hover:translate-x-1 transition-all duration-300">
            <i className="fas fa-star text-purple-500 mr-2 text-sm hover:scale-110 transition-transform"></i>
            <span className="text-gray-600 text-xs">Premium content</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 pb-4">
          <div className="form-group mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:border-purple-500 focus:bg-white focus:shadow-lg focus:-translate-y-0.5 transition-all duration-300 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="subscribe-btn w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden text-sm"
          >
            <span className="relative z-10">Subscribe Now</span>
          </button>
        </form>

        {/* Countdown */}
        <div className="countdown text-gray-600 text-xs font-medium mb-3 px-4">
          <span className="font-bold text-purple-500 text-sm">{timeLeft}</span> seconds left
        </div>

        {/* Progress Bar */}
        <div className="progress-bar w-full h-1 bg-gray-200 rounded-full mx-4 mb-4 overflow-hidden shadow-inner">
          <div
            className="progress h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
            style={{width: `${((30 - timeLeft) / 30) * 100}%`}}
          ></div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="success-message text-green-500 font-semibold text-sm mb-4 px-4 animate-fadeIn">
            <i className="fas fa-check-circle mr-1"></i>
            Thank you for subscribing!
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(10px, 15px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translate(0, 25px) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translate(-10px, 15px) rotate(270deg) scale(1.1);
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
          }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes confettiFall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }

        @keyframes textGlow {
          from {
            text-shadow: 0 3px 10px rgba(108, 92, 231, 0.2);
          }
          to {
            text-shadow: 0 3px 15px rgba(108, 92, 231, 0.4), 0 0 20px rgba(108, 92, 231, 0.3);
          }
        }

        @keyframes waveAnimation {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 1440px;
          }
        }

        .newsletter-popup {
          animation: fadeIn 0.4s ease-out;
        }

        .popup-content {
          animation: slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          max-height: 85vh;
          overflow-y: auto;
        }

        .close-btn:hover {
          transform: rotate(180deg) scale(1.1);
        }

        .subscribe-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #a363d9 0%, #6c5ce7 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .subscribe-btn:hover::after {
          opacity: 1;
        }

        .subscribe-btn span {
          position: relative;
          z-index: 2;
        }

        .wave {
          background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%236c5ce7" fill-opacity="0.15" d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,122.7C672,128,768,160,864,170.7C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
          background-size: cover;
          animation: waveAnimation 15s linear infinite;
        }

        .animate-float {
          animation: float 20s infinite linear;
        }

        .animate-textGlow {
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        .animate-wave {
          animation: waveAnimation 15s linear infinite;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 640px) {
          .popup-content {
            max-width: 95vw;
            margin: 10px;
            padding: 20px 16px;
            border-radius: 16px;
          }

          .newsletter-icon {
            font-size: 3rem;
            margin-top: 1rem;
          }

          h2 {
            font-size: 1.25rem;
          }

          .typing-text {
            min-height: 2rem;
            margin-bottom: 0.75rem;
          }

          .form-group input {
            padding: 12px 16px;
            font-size: 14px;
          }

          .subscribe-btn {
            padding: 12px 16px;
            font-size: 14px;
          }

          .benefits {
            margin-bottom: 1rem;
          }

          .benefits div {
            padding: 8px 12px;
          }

          .countdown {
            font-size: 12px;
          }

          .countdown span {
            font-size: 14px;
          }

          .close-btn {
            top: 12px;
            right: 12px;
            width: 32px;
            height: 32px;
          }
        }

        @media (max-width: 480px) {
          .popup-content {
            padding: 16px 12px;
            border-radius: 12px;
          }

          .newsletter-icon {
            font-size: 2.5rem;
          }

          h2 {
            font-size: 1.125rem;
          }

          p {
            font-size: 14px;
          }

          .benefits {
            margin-bottom: 0.75rem;
          }

          .benefits div {
            padding: 6px 10px;
            margin-bottom: 6px;
          }

          .form-group input {
            padding: 10px 12px;
            font-size: 13px;
          }

          .subscribe-btn {
            padding: 10px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsletterPopup;
