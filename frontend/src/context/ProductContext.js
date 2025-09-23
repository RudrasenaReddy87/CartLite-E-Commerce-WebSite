import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ProductContext = createContext();

// Product reducer
const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'FILTER_PRODUCTS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {
          category: '',
          priceRange: '',
          rating: '',
          search: ''
        }
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  products: [],
  categories: [],
  loading: true,
  error: null,
  filters: {
    category: '',
    priceRange: '',
    rating: '',
    search: ''
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      dispatch({ type: 'SET_PRODUCTS', payload: data.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('http://localhost:5000/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      dispatch({ type: 'SET_CATEGORIES', payload: data.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Apply filters to products
  const getFilteredProducts = () => {
    let filtered = [...state.products];

    if (state.filters.category) {
      filtered = filtered.filter(product => product.category === state.filters.category);
    }

    if (state.filters.priceRange) {
      const [min, max] = state.filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    if (state.filters.rating) {
      filtered = filtered.filter(product => product.rating >= parseInt(state.filters.rating));
    }

    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  // Update filters
  const updateFilters = (filters) => {
    dispatch({ type: 'FILTER_PRODUCTS', payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  // Load data on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const value = {
    ...state,
    fetchProducts,
    fetchCategories,
    getFilteredProducts,
    updateFilters,
    clearFilters
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
