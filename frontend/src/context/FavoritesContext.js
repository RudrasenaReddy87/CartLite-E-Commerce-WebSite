import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FavoritesContext = createContext();

// Favorites reducer - now stores full product objects
const favoritesReducer = (state, action) => {
  console.log('Reducer called with action:', action.type, 'payload:', action.payload);
  console.log('Current state:', state);

  switch (action.type) {
    case 'SET_FAVORITES':
      console.log('Setting favorites to:', action.payload);
      return {
        ...state,
        items: action.payload
      };
    case 'ADD_TO_FAVORITES':
      const existingProduct = state.items.find(item => item.id === action.payload.id);
      if (existingProduct) {
        console.log('Product already exists, not adding:', action.payload.id);
        return state; // Product already exists
      }
      console.log('Adding product to favorites:', action.payload.name, 'ID:', action.payload.id);
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_FROM_FAVORITES':
      console.log('Removing product from favorites:', action.payload);
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      console.log('Filtered items count:', filteredItems.length);
      return {
        ...state,
        items: filteredItems
      };
    case 'CLEAR_FAVORITES':
      console.log('Clearing all favorites');
      return {
        items: []
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: []
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    console.log('Loading favorites from localStorage:', savedFavorites);
    if (savedFavorites) {
      try {
        const favoritesData = JSON.parse(savedFavorites);
        console.log('Parsed favorites data:', favoritesData);
        dispatch({ type: 'SET_FAVORITES', payload: favoritesData });
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    } else {
      console.log('No saved favorites found in localStorage');
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    console.log('Saving favorites to localStorage:', state.items);
    localStorage.setItem('favorites', JSON.stringify(state.items));
    console.log('Saved to localStorage successfully');
  }, [state.items]);

  const addToFavorites = (product) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };

  const removeFromFavorites = (productId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
  };

  const removeFromFavoritesByProduct = (product) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product.id });
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const isFavorite = (productId) => {
    const result = state.items.some(item => item.id === productId);
    console.log('isFavorite check for ID:', productId, 'Result:', result, 'Current items:', state.items);
    return result;
  };

  const toggleFavorite = (product) => {
    console.log('toggleFavorite called with:', product);
    console.log('Current favorites:', state.items);

    if (isFavorite(product.id)) {
      console.log('Removing from favorites:', product.id);
      removeFromFavorites(product.id);
    } else {
      console.log('Adding to favorites:', product.name, 'ID:', product.id);
      addToFavorites(product);
    }

    console.log('Updated favorites after toggle:', state.items);
  };

  const value = {
    ...state,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
