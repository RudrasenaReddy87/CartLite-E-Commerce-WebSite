import React, { useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';

const SearchTest = () => {
  const { updateFilters, getFilteredProducts } = useProducts();

  useEffect(() => {
    // Test search functionality with sample queries
    const testSearches = ['shirt', 'watch', 'electronics'];

    testSearches.forEach((searchTerm, index) => {
      setTimeout(() => {
        console.log(`Testing search for: "${searchTerm}"`);
        updateFilters({ search: searchTerm });
        const filteredProducts = getFilteredProducts();
        console.log(`Found ${filteredProducts.length} products for "${searchTerm}":`, filteredProducts.map(p => p.name));
      }, (index + 1) * 2000);
    });

    // Clear search after tests
    setTimeout(() => {
      updateFilters({ search: '' });
      console.log('Search cleared - showing all products');
    }, 8000);
  }, [updateFilters, getFilteredProducts]);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="text-sm font-bold mb-2">Search Test Running...</h3>
      <p className="text-xs text-gray-600">Check console for results</p>
    </div>
  );
};

export default SearchTest;
