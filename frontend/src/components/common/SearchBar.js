import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';

const SearchBar = () => {
  const { updateFilters, getFilteredProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update search filters in ProductContext
      updateFilters({ search: searchQuery.trim() });

      // Add to search history (keep only last 5 searches)
      const newHistory = [searchQuery.trim(), ...searchHistory.filter(item => item !== searchQuery.trim())].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

      // Hide search history after search
      setShowSearchHistory(false);
    }
  };

  const handleHistorySearch = (historyItem) => {
    setSearchQuery(historyItem);
    updateFilters({ search: historyItem });
    setShowSearchHistory(false);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Load search history on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Show search history when input is focused and has content
  useEffect(() => {
    setShowSearchHistory(isSearchFocused && searchQuery.length === 0 && searchHistory.length > 0);
  }, [isSearchFocused, searchQuery, searchHistory]);

  return (
    <div className="flex-1 max-w-lg relative">
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              // Delay hiding to allow clicking on history items
              setTimeout(() => setIsSearchFocused(false), 200);
            }}
            placeholder="Search products..."
            className={`w-full py-3 px-5 pr-14 text-onyx text-fs-7 border-2 rounded-full transition-all duration-300 bg-gray-50 focus:bg-white ${
              isSearchFocused
                ? 'border-purple-500 shadow-lg ring-4 ring-purple-100'
                : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
            }`}
          />
          <button
            type="submit"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl p-2 rounded-full transition-all duration-300 ${
              isSearchFocused
                ? 'text-purple-600 bg-purple-100 scale-110'
                : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <i className="fas fa-search transition-transform duration-300 hover:scale-110"></i>
          </button>
        </div>

        {/* Search History Dropdown */}
        {showSearchHistory && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700">Recent Searches</h4>
                <button
                  onClick={clearSearchHistory}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="p-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistorySearch(item)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors flex items-center gap-3 group"
                >
                  <i className="fas fa-history text-gray-400 group-hover:text-purple-500"></i>
                  <span className="truncate">{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
