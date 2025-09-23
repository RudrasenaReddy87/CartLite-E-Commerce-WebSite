import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useProducts } from './ProductContext';

const CartContext = createContext();

// Simple cart reducer - stores price with each item
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0)
      };
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.productId === action.payload.productId);

      if (existingItem) {
        // Update existing item quantity
        const updatedItems = state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + (action.payload.price * action.payload.quantity),
          itemCount: state.itemCount + action.payload.quantity
        };
      } else {
        // Add new item with price
        const newItem = {
          id: Date.now().toString(),
          productId: action.payload.productId,
          price: action.payload.price,
          quantity: action.payload.quantity,
          addedAt: new Date().toISOString()
        };
        return {
          ...state,
          items: [...state.items, newItem],
          total: state.total + (action.payload.price * action.payload.quantity),
          itemCount: state.itemCount + action.payload.quantity
        };
      }
    case 'UPDATE_ITEM':
      const itemToUpdate = state.items.find(item => item.id === action.payload.id);
      if (!itemToUpdate) return state;

      const quantityDiff = action.payload.quantity - itemToUpdate.quantity;
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        total: state.total + (itemToUpdate.price * quantityDiff),
        itemCount: state.itemCount + quantityDiff
      };
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload.id);
      if (!itemToRemove) return state;

      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: filteredItems,
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity
      };
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload }
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: { ...state.address, ...action.payload }
      };
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload
      };
    case 'SET_CHECKOUT_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
    case 'SET_CHECKOUT_OPEN':
      return {
        ...state,
        isCheckoutOpen: action.payload
      };
    case 'RESET_CHECKOUT':
      return {
        ...state,
        userInfo: {},
        address: {},
        paymentMethod: null,
        currentStep: 1,
        isCheckoutOpen: false
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  userInfo: {},
  address: {},
  paymentMethod: null,
  currentStep: 1,
  isCheckoutOpen: false
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { products } = useProducts();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Enhanced addToCart that includes price
  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (product && product.price) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          productId,
          price: product.price,
          quantity
        }
      });
    }
  };

  const updateCartItem = (id, quantity) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Checkout related functions
  const setUserInfo = (userInfo) => {
    dispatch({ type: 'SET_USER_INFO', payload: userInfo });
  };

  const setAddress = (address) => {
    dispatch({ type: 'SET_ADDRESS', payload: address });
  };

  const setPaymentMethod = (paymentMethod) => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: paymentMethod });
  };

  const setCheckoutStep = (step) => {
    dispatch({ type: 'SET_CHECKOUT_STEP', payload: step });
  };

  const openCheckout = () => {
    dispatch({ type: 'SET_CHECKOUT_OPEN', payload: true });
  };

  const closeCheckout = () => {
    dispatch({ type: 'SET_CHECKOUT_OPEN', payload: false });
  };

  const resetCheckout = () => {
    dispatch({ type: 'RESET_CHECKOUT' });
  };

  const nextStep = () => {
    dispatch({ type: 'SET_CHECKOUT_STEP', payload: state.currentStep + 1 });
  };

  const prevStep = () => {
    dispatch({ type: 'SET_CHECKOUT_STEP', payload: state.currentStep - 1 });
  };

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    setUserInfo,
    setAddress,
    setPaymentMethod,
    setCheckoutStep,
    openCheckout,
    closeCheckout,
    resetCheckout,
    nextStep,
    prevStep
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
