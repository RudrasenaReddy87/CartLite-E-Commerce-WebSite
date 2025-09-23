import React, { useState, useRef, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import {
  searchProducts,
  getSearchSuggestions,
  searchHistoryUtils,
  highlightSearchTerm,
  getPopularSearches,
  debounce
} from '../../utils/searchUtils';

const SearchDropdown = () => {
  const { products, updateFilters } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(searchHistoryUtils.getHistory());
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search function
  const debouncedSearch = debounce((term) => {
    if (term.trim()) {
      const results = searchProducts(products, term, {
        fuzzy: true,
        minScore: 5,
        maxResults: 8
      });
      console.log('Search results for:', term, results);
    }
  }, 300);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(-1);

    if (value.trim()) {
      setIsOpen(true);
      debouncedSearch(value);
    } else {
      setIsOpen(false);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Add to search history
      const updatedHistory = searchHistoryUtils.addToHistory(searchTerm.trim());
      setSearchHistory(updatedHistory);

      // Update filters
      updateFilters({ search: searchTerm.trim() });
      setIsOpen(false);
      setSelectedIndex(-1);

      console.log('Searching for:', searchTerm.trim());
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.text);
    updateFilters({ search: suggestion.text });
    setIsOpen(false);
    setSelectedIndex(-1);

    // Add to history
    const updatedHistory = searchHistoryUtils.addToHistory(suggestion.text);
    setSearchHistory(updatedHistory);
  };

  // Handle history item click
  const handleHistoryClick = (historyItem) => {
    setSearchTerm(historyItem);
    updateFilters({ search: historyItem });
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < getTotalSuggestions() - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const suggestions = getAllSuggestions();
          if (suggestions[selectedIndex]) {
            handleSuggestionClick(suggestions[selectedIndex]);
          }
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Get all suggestions combined
  const getAllSuggestions = () => {
    const suggestions = [];
    const popularSearches = getPopularSearches();
    const searchSuggestions = getSearchSuggestions(products, searchTerm);

    // Add search suggestions
    suggestions.push(...searchSuggestions);

    // Add popular searches that match
    popularSearches.forEach(popular => {
      if (popular.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm) {
        suggestions.push({
          text: popular,
          type: 'popular',
          product: null
        });
      }
    });

    return suggestions.slice(0, 6);
  };

  const getTotalSuggestions = () => {
    return getAllSuggestions().length;
  };

  const suggestions = getAllSuggestions();

  return (
    <div className="relative flex-1 max-w-lg" ref={dropdownRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative transition-all duration-300 ${isOpen ? 'scale-105' : ''}`}>
          <input
            ref={inputRef}
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className={`w-full py-3 px-5 pr-14 text-onyx text-fs-7 border-2 rounded-full transition-all duration-300 bg-gray-50 focus:bg-white ${
              isOpen
                ? 'border-purple-500 shadow-lg ring-4 ring-purple-100'
                : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
            }`}
          />
          <button
            type="submit"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl p-2 rounded-full transition-all duration-300 ${
              isOpen
                ? 'text-purple-600 bg-purple-100 scale-110'
                : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <i className="fas fa-search transition-transform duration-300 hover:scale-110"></i>
          </button>
        </div>
      </form>

      {/* Search Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>

          {/* Dropdown Content */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-hidden">
            {/* Search History */}
            {searchTerm === '' && searchHistory.length > 0 && (
              <div className="border-b border-gray-100">
                <div className="px-4 py-2 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <i className="fas fa-history"></i>
                    Recent Searches
                  </h3>
                </div>
                <div className="py-2">
                  {searchHistory.slice(0, 3).map((historyItem, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(historyItem)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3"
                    >
                      <i className="fas fa-clock text-gray-400 text-sm"></i>
                      <span className="text-gray-700">{historyItem}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Suggestions */}
            {searchTerm && suggestions.length > 0 && (
              <div className="border-b border-gray-100">
                <div className="px-4 py-2 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <i className="fas fa-search"></i>
                    Suggestions
                  </h3>
                </div>
                <div className="py-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 ${
                        selectedIndex === index ? 'bg-purple-50' : ''
                      }`}
                    >
                      <i className={`text-sm ${
                        suggestion.type === 'category' ? 'fas fa-tag text-blue-500' :
                        suggestion.type === 'popular' ? 'fas fa-fire text-orange-500' :
                        'fas fa-box text-green-500'
                      }`}></i>
                      <span
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(suggestion.text, searchTerm)
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {searchTerm === '' && (
              <div>
                <div className="px-4 py-2 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <i className="fas fa-fire"></i>
                    Popular Searches
                  </h3>
                </div>
                <div className="py-2">
                  {getPopularSearches().slice(0, 4).map((popular, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick({ text: popular, type: 'popular' })}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3"
                    >
                      <i className="fas fa-fire text-orange-500 text-sm"></i>
                      <span className="text-gray-700">{popular}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchTerm && suggestions.length === 0 && (
              <div className="px-4 py-8 text-center">
                <i className="fas fa-search text-3xl text-gray-300 mb-2"></i>
                <p className="text-gray-500">No suggestions found</p>
                <p className="text-sm text-gray-400 mt-1">Try searching for something else</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchDropdown;
