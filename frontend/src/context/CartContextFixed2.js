import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useProducts } from './ProductContext';

const CartContext = createContext();

// Helper function to calculate total
const calculateTotal = (items, products) => {
  return items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    const price = product ? product.price : 0;
    return sum + (price * item.quantity);
  }, 0);
};

// Helper function to calculate item count
const calculateItemCount = (items) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        total: calculateTotal(action.payload, state.products || []),
        itemCount: calculateItemCount(action.payload)
      };
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      let newItems;

      if (existingItem) {
        newItems = state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, {
          id: Date.now().toString(),
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          addedAt: new Date().toISOString()
        }];
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems, state.products || []),
        itemCount: calculateItemCount(newItems)
      };
    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems, state.products || []),
        itemCount: calculateItemCount(updatedItems)
      };
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems, state.products || []),
        itemCount: calculateItemCount(filteredItems)
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
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        total: calculateTotal(state.items, action.payload)
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
  isCheckoutOpen: false,
  products: []
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { products } = useProducts();

  // Update products in cart state when products change
  useEffect(() => {
    if (products && products.length > 0) {
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    }
  }, [products]);

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

  const addToCart = (productId, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { productId, quantity } });
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
