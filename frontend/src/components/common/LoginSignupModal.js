import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

const LoginSignupModal = () => {
  const { modal, hideModal, login, showToast } = useUser();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [animationStage, setAnimationStage] = useState('entering');

  useEffect(() => {
    if (modal.isOpen) {
      setAnimationStage('entering');
      const timer = setTimeout(() => setAnimationStage('entered'), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimationStage('exiting');
      const timer = setTimeout(() => setAnimationStage('exited'), 300);
      return () => clearTimeout(timer);
    }
  }, [modal.isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (activeTab === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (activeTab === 'login') {
        // Login logic
        login({
          name: 'Rudra',
          email: formData.email,
          avatar: '/images/icons/user.svg'
        });
        showToast(`Welcome back, ${formData.email}!`, 'success');
        hideModal();
      } else {
        // Signup logic
        login({
          name: formData.name,
          email: formData.email,
          avatar: '/images/icons/user.svg'
        });
        showToast(`Welcome, ${formData.name}! Your account has been created successfully.`, 'success');
        hideModal();
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setActiveTab(activeTab === 'login' ? 'signup' : 'login');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  if (!modal.isOpen && animationStage === 'exited') return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${animationStage === 'entering' || animationStage === 'entered' ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
      {/* Backdrop with blur effect */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ${animationStage === 'entering' || animationStage === 'entered' ? 'opacity-100' : 'opacity-0'}`}
        onClick={hideModal}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-sm transform transition-all duration-300 ${animationStage === 'entering' || animationStage === 'entered' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        {/* Glass morphism effect */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 animate-pulse" />

          {/* Header with animated icons */}
          <div className="relative px-6 pt-6 pb-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-3 animate-bounce">
              <i className={`fas ${activeTab === 'login' ? 'fa-sign-in-alt' : 'fa-user-plus'} text-white text-lg`}></i>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
              {activeTab === 'login' ? 'Welcome Back!' : 'Join Us Today!'}
            </h2>
            <p className="text-gray-600 text-xs">
              {activeTab === 'login' ? 'Sign in to your account' : 'Create your new account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative px-6 pb-6">
            {/* Name field (only for signup) */}
            {activeTab === 'signup' && (
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pl-10 bg-white/80 border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm text-sm ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Full Name"
                    disabled={isLoading}
                  />
                  <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><i className="fas fa-exclamation-circle mr-1"></i>{errors.name}</p>}
              </div>
            )}

            {/* Email field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-10 bg-white/80 border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm text-sm ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Email Address"
                  disabled={isLoading}
                />
                <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><i className="fas fa-exclamation-circle mr-1"></i>{errors.email}</p>}
            </div>

            {/* Password field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pl-10 pr-10 bg-white/80 border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm text-sm ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Password"
                  disabled={isLoading}
                />
                <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <i className="fas fa-eye text-sm"></i>
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center"><i className="fas fa-exclamation-circle mr-1"></i>{errors.password}</p>}
            </div>

            {/* Confirm Password field (only for signup) */}
            {activeTab === 'signup' && (
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pl-10 pr-10 bg-white/80 border-2 rounded-lg focus:outline-none focus:border-purple-500 transition-all duration-300 backdrop-blur-sm text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Confirm Password"
                    disabled={isLoading}
                  />
                  <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <i className="fas fa-eye text-sm"></i>
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 flex items-center"><i className="fas fa-exclamation-circle mr-1"></i>{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2 text-sm"></i>
                  {activeTab === 'login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <i className={`fas ${activeTab === 'login' ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2 text-sm`}></i>
                  {activeTab === 'login' ? 'Sign In' : 'Sign Up'}
                </div>
              )}
            </button>

            {/* Toggle between login/signup */}
            <div className="text-center mt-4">
              <p className="text-gray-600 text-xs">
                {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-1 text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
                >
                  {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Close button */}
        <button
          onClick={hideModal}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
        >
          <i className="fas fa-times text-gray-600"></i>
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
