import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { searchProducts } from '../utils/searchUtils';

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

// Mock data - fallback when API is not available
const mockProducts = [
  {
    id: 1,
    name: "Men's Casual Shirt",
    price: 29.99,
    originalPrice: 39.99,
    category: "fashion",
    rating: 4.5,
    reviews: 128,
    image: "/images/products/shirt-1.jpg",
    hoverImage: "/images/products/shirt-2.jpg",
    badge: "Sale",
    badgeType: "pink",
    description: "Comfortable cotton shirt perfect for casual wear",
    inStock: true,
    discount: 25
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 89.99,
    originalPrice: 129.99,
    category: "electronics",
    rating: 4.8,
    reviews: 256,
    image: "/images/products/watch-1.jpg",
    hoverImage: "/images/products/watch-2.jpg",
    badge: "New",
    badgeType: "ocean-green",
    description: "High-quality wireless headphones with noise cancellation",
    inStock: true,
    discount: 31
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 249.99,
    category: "electronics",
    rating: 4.6,
    reviews: 89,
    image: "/images/products/watch-3.jpg",
    hoverImage: "/images/products/watch-4.jpg",
    badge: "Hot",
    badgeType: "bittersweet",
    description: "Feature-rich smartwatch with health monitoring",
    inStock: true,
    discount: 20
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 79.99,
    originalPrice: 99.99,
    category: "sports",
    rating: 4.7,
    reviews: 167,
    image: "/images/products/shoe-1.jpg",
    hoverImage: "/images/products/shoe-2.jpg",
    badge: "Sale",
    badgeType: "pink",
    description: "Lightweight running shoes with superior comfort",
    inStock: true,
    discount: 20
  },
  {
    id: 5,
    name: "Rose Gold Earrings",
    price: 45.99,
    originalPrice: 59.99,
    category: "jewelry",
    rating: 4.9,
    reviews: 203,
    image: "/images/products/jewellery-1.jpg",
    hoverImage: "/images/products/jewellery-2.jpg",
    badge: "Popular",
    badgeType: "ocean-green",
    description: "Elegant rose gold earrings perfect for any occasion",
    inStock: true,
    discount: 23
  },
  {
    id: 6,
    name: "Designer Handbag",
    price: 129.99,
    originalPrice: 179.99,
    category: "fashion",
    rating: 4.4,
    reviews: 95,
    image: "/images/products/clothes-1.jpg",
    hoverImage: "/images/products/clothes-2.jpg",
    badge: "New",
    badgeType: "ocean-green",
    description: "Stylish designer handbag with premium leather",
    inStock: true,
    discount: 28
  },
  {
    id: 7,
    name: "Gaming Mouse",
    price: 39.99,
    originalPrice: 59.99,
    category: "electronics",
    rating: 4.7,
    reviews: 312,
    image: "/images/products/1.jpg",
    hoverImage: "/images/products/2.jpg",
    badge: "Hot",
    badgeType: "bittersweet",
    description: "High-precision gaming mouse with RGB lighting",
    inStock: true,
    discount: 33
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 24.99,
    originalPrice: 34.99,
    category: "sports",
    rating: 4.6,
    reviews: 178,
    image: "/images/products/sports-1.jpg",
    hoverImage: "/images/products/sports-2.jpg",
    badge: "Sale",
    badgeType: "pink",
    description: "Non-slip yoga mat perfect for all fitness levels",
    inStock: true,
    discount: 29
  }
];

const mockCategories = [
  { id: 'fashion', name: 'Fashion', icon: 'fas fa-tshirt' },
  { id: 'electronics', name: 'Electronics', icon: 'fas fa-laptop' },
  { id: 'sports', name: 'Sports', icon: 'fas fa-running' },
  { id: 'jewelry', name: 'Jewelry', icon: 'fas fa-gem' }
];

// Initial state
const initialState = {
  products: mockProducts,
  categories: mockCategories,
  loading: false,
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
      const response = await fetch('https://cartlite-ecommerce.netlify.app/.netlify/functions/products');
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
      const response = await fetch('https://cartlite-ecommerce.netlify.app/.netlify/functions/categories');
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
      // Use advanced search utilities for better results
      filtered = searchProducts(filtered, state.filters.search, {
        fuzzy: true,
        minScore: 5,
        maxResults: 100,
        sortByRelevance: true
      });
    }

    return filtered;
  };

  // Get product by ID
  const getProductById = (id) => {
    return state.products.find(product => product.id === id);
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
    clearFilters,
    getProductById
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
