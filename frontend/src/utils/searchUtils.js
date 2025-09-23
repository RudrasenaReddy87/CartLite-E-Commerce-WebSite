/**
 * Advanced Search Utilities for E-commerce
 * Features: Fuzzy search, debouncing, relevance scoring, suggestions
 */

// Fuzzy search algorithm using Levenshtein distance
export const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  const len1 = str1.length;
  const len2 = str2.length;

  if (len1 === 0) return len2;
  if (len2 === 0) return len1;

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
};

// Calculate search relevance score
export const calculateRelevanceScore = (product, searchTerm) => {
  const term = searchTerm.toLowerCase();
  let score = 0;

  // Exact name match gets highest score
  if (product.name.toLowerCase() === term) {
    score += 100;
  }

  // Name starts with search term
  if (product.name.toLowerCase().startsWith(term)) {
    score += 80;
  }

  // Name contains search term
  if (product.name.toLowerCase().includes(term)) {
    score += 60;
  }

  // Description contains search term
  if (product.description.toLowerCase().includes(term)) {
    score += 40;
  }

  // Category match bonus
  if (product.category.toLowerCase().includes(term)) {
    score += 30;
  }

  // Fuzzy matching for typos (allow 1-2 character differences)
  const nameWords = product.name.toLowerCase().split(' ');
  const descWords = product.description.toLowerCase().split(' ');

  nameWords.forEach(word => {
    if (word.length >= 4) { // Only for longer words
      const distance = levenshteinDistance(word, term);
      if (distance <= 2) {
        score += Math.max(0, 20 - distance * 5);
      }
    }
  });

  descWords.forEach(word => {
    if (word.length >= 4) {
      const distance = levenshteinDistance(word, term);
      if (distance <= 2) {
        score += Math.max(0, 10 - distance * 3);
      }
    }
  });

  return score;
};

// Debounce function for search input
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get search suggestions based on partial input
export const getSearchSuggestions = (products, searchTerm, maxSuggestions = 5) => {
  if (!searchTerm || searchTerm.length < 2) return [];

  const term = searchTerm.toLowerCase();
  const suggestions = new Map();

  products.forEach(product => {
    // Check product name
    const nameWords = product.name.toLowerCase().split(' ');
    nameWords.forEach(word => {
      if (word.startsWith(term) && word !== term) {
        if (!suggestions.has(word)) {
          suggestions.set(word, {
            text: word,
            type: 'product',
            product: product
          });
        }
      }
    });

    // Check categories
    if (product.category.toLowerCase().startsWith(term)) {
      if (!suggestions.has(product.category)) {
        suggestions.set(product.category, {
          text: product.category,
          type: 'category',
          product: product
        });
      }
    }
  });

  return Array.from(suggestions.values()).slice(0, maxSuggestions);
};

// Enhanced search function with fuzzy matching and scoring
export const searchProducts = (products, searchTerm, options = {}) => {
  const {
    fuzzy = true,
    minScore = 10,
    maxResults = 50,
    sortByRelevance = true
  } = options;

  if (!searchTerm || searchTerm.trim().length === 0) {
    return products;
  }

  const term = searchTerm.toLowerCase().trim();

  // Filter products based on search criteria
  let filteredProducts = products.filter(product => {
    const score = calculateRelevanceScore(product, term);
    return score >= minScore;
  });

  // Sort by relevance score if enabled
  if (sortByRelevance) {
    filteredProducts.sort((a, b) => {
      const scoreA = calculateRelevanceScore(a, term);
      const scoreB = calculateRelevanceScore(b, term);
      return scoreB - scoreA;
    });
  }

  return filteredProducts.slice(0, maxResults);
};

// Search history management
export const searchHistoryUtils = {
  getHistory: () => {
    try {
      const history = localStorage.getItem('searchHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading search history:', error);
      return [];
    }
  },

  addToHistory: (searchTerm) => {
    try {
      const history = searchHistoryUtils.getHistory();
      const filteredHistory = history.filter(term => term !== searchTerm);
      const updatedHistory = [searchTerm, ...filteredHistory].slice(0, 10); // Keep last 10 searches
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    } catch (error) {
      console.error('Error saving search history:', error);
      return [];
    }
  },

  clearHistory: () => {
    try {
      localStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }
};

// Highlight search terms in text
export const highlightSearchTerm = (text, searchTerm) => {
  if (!searchTerm || !text) return text;

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
};

// Get popular search terms (mock data for demo)
export const getPopularSearches = () => {
  return [
    'wireless headphones',
    'smart watch',
    'running shoes',
    'casual shirt',
    'gaming mouse',
    'yoga mat',
    'designer handbag',
    'rose gold earrings'
  ];
};
