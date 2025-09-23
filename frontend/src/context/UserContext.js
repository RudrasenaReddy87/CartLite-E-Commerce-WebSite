import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

// User reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        modal: {
          isOpen: true,
          type: action.payload.type,
          data: action.payload.data || null
        }
      };
    case 'HIDE_MODAL':
      return {
        ...state,
        modal: {
          isOpen: false,
          type: null,
          data: null
        }
      };
    case 'SHOW_TOAST':
      return {
        ...state,
        toast: {
          isOpen: true,
          message: action.payload.message,
          type: action.payload.type || 'info'
        }
      };
    case 'HIDE_TOAST':
      return {
        ...state,
        toast: {
          isOpen: false,
          message: '',
          type: 'info'
        }
      };
    case 'TOGGLE_MOBILE_MENU':
      return {
        ...state,
        mobileMenu: {
          isOpen: !state.mobileMenu.isOpen
        }
      };
    case 'CLOSE_MOBILE_MENU':
      return {
        ...state,
        mobileMenu: {
          isOpen: false
        }
      };
    case 'SHOW_NEWSLETTER_POPUP':
      return {
        ...state,
        newsletterPopup: {
          isOpen: true
        },
        animationReset: 0
      };
    case 'HIDE_NEWSLETTER_POPUP':
      return {
        ...state,
        newsletterPopup: {
          isOpen: false
        }
      };
    case 'RESET_ANIMATION':
      return {
        ...state,
        animationReset: state.animationReset + 1
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  modal: {
    isOpen: false,
    type: null,
    data: null
  },
  toast: {
    isOpen: false,
    message: '',
    type: 'info'
  },
  mobileMenu: {
    isOpen: false
  },
  newsletterPopup: {
    isOpen: false
  },
  animationReset: 0
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = (userData) => {
    dispatch({ type: 'SET_USER', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const showModal = (type, data = null) => {
    dispatch({ type: 'SHOW_MODAL', payload: { type, data } });
  };

  const hideModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
  };

  const showToast = (message, type = 'info') => {
    dispatch({ type: 'SHOW_TOAST', payload: { message, type } });
  };

  const hideToast = () => {
    dispatch({ type: 'HIDE_TOAST' });
  };

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  };

  const closeMobileMenu = () => {
    dispatch({ type: 'CLOSE_MOBILE_MENU' });
  };

  const showNewsletterPopup = () => {
    dispatch({ type: 'SHOW_NEWSLETTER_POPUP' });
  };

  const hideNewsletterPopup = () => {
    dispatch({ type: 'HIDE_NEWSLETTER_POPUP' });
  };

  const resetAnimation = () => {
    dispatch({ type: 'RESET_ANIMATION' });
  };

  const value = {
    ...state,
    login,
    logout,
    showModal,
    hideModal,
    showToast,
    hideToast,
    toggleMobileMenu,
    closeMobileMenu,
    showNewsletterPopup,
    hideNewsletterPopup,
    resetAnimation
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
