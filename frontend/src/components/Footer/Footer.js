import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-purple-500/20 rounded-full animate-spin animation-delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-blue-500/20 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-pink-500/20 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-2xl font-bold mb-4">
                  CartLite E-commerce
                </h3>
                <p className="text-gray-300 text-base mb-6 leading-relaxed">
                  Your trusted online shopping destination offering quality products at affordable prices with exceptional customer service.
                </p>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                {[
                  { name: 'Facebook', icon: 'fab fa-facebook-f', color: 'hover:text-blue-400', href: '#' },
                  { name: 'Twitter', icon: 'fab fa-twitter', color: 'hover:text-sky-400', href: '#' },
                  { name: 'Instagram', icon: 'fab fa-instagram', color: 'hover:text-pink-400', href: '#' },
                  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', color: 'hover:text-blue-300', href: '#' },
                  { name: 'YouTube', icon: 'fab fa-youtube', color: 'hover:text-red-400', href: '#' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-700/50 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25`}
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', icon: 'fas fa-info-circle', href: '/about' },
                  { name: 'Contact Us', icon: 'fas fa-phone', href: '/contact' },
                  { name: 'FAQ', icon: 'fas fa-question-circle', href: '/faq' },
                  { name: 'Shipping Info', icon: 'fas fa-truck', href: '/shipping' },
                  { name: 'Returns', icon: 'fas fa-undo', href: '/returns' },
                  { name: 'Size Guide', icon: 'fas fa-ruler', href: '/size-guide' }
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 py-1"
                    >
                      <i className={`${link.icon} text-sm transition-transform duration-300 group-hover:translate-x-1`}></i>
                      <span className="relative">
                        {link.name}
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-6 relative">
                Customer Service
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'My Account', icon: 'fas fa-user', href: '/account' },
                  { name: 'Order Tracking', icon: 'fas fa-search', href: '/orders' },
                  { name: 'Wishlist', icon: 'fas fa-heart', href: '/wishlist' },
                  { name: 'Customer Support', icon: 'fas fa-headset', href: '/support' },
                  { name: 'Live Chat', icon: 'fas fa-comment', href: '/chat' },
                  { name: 'Store Locator', icon: 'fas fa-map-marker-alt', href: '/stores' }
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 py-1"
                    >
                      <i className={`${link.icon} text-sm transition-transform duration-300 group-hover:translate-x-1`}></i>
                      <span className="relative">
                        {link.name}
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-6 relative">
                Newsletter
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </h4>
              <p className="text-gray-300 text-base mb-6 leading-relaxed">
                Subscribe to our newsletter for updates, exclusive offers, and new product launches.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-5 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">
                    {isSubscribed ? 'Subscribed!' : 'Subscribe Now'}
                  </span>
                  <i className={`fas ${isSubscribed ? 'fa-check' : 'fa-paper-plane'} transition-transform duration-300 group-hover:translate-x-1`}></i>
                </button>

                {isSubscribed && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <i className="fas fa-check-circle animate-pulse"></i>
                    Successfully subscribed to our newsletter!
                  </div>
                )}
              </form>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap gap-3">
                {['SSL Secure', '24/7 Support', 'Free Shipping', 'Money Back'].map((badge) => (
                  <span
                    key={badge}
                    className="bg-gray-800/50 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700/50 backdrop-blur-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Payment Methods */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm font-medium">We Accept:</span>
                  <div className="flex gap-2">
                    {['fab fa-cc-visa', 'fab fa-cc-mastercard', 'fab fa-cc-paypal', 'fab fa-cc-amex'].map((icon) => (
                      <div
                        key={icon}
                        className="w-10 h-6 bg-gray-800/50 rounded border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
                      >
                        <i className={`${icon} text-sm`}></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm font-medium">
                © 2024 CartLite E-commerce. All rights reserved. |
                <a href="/privacy" className="hover:text-purple-400 transition-colors duration-300 ml-1">Privacy Policy</a> |
                <a href="/terms" className="hover:text-purple-400 transition-colors duration-300 ml-1">Terms of Service</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
