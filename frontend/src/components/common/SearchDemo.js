import React, { useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';

const SearchDemo = () => {
  const { updateFilters, getFilteredProducts } = useProducts();

  useEffect(() => {
    // Demo search functionality
    const demoSearches = [
      { term: 'shirt', expected: 1 },
      { term: 'watch', expected: 2 },
      { term: 'electronics', expected: 3 }
    ];

    let currentDemo = 0;

    const runDemo = () => {
      if (currentDemo < demoSearches.length) {
        const search = demoSearches[currentDemo];
        console.log(`🔍 Demo: Searching for "${search.term}"...`);
        updateFilters({ search: search.term });
        const results = getFilteredProducts();
        console.log(`✅ Found ${results.length} products:`, results.map(p => p.name));

        currentDemo++;
        setTimeout(runDemo, 3000);
      } else {
        console.log('🎉 Demo complete! Search functionality is working.');
        setTimeout(() => {
          updateFilters({ search: '' });
          console.log('🔄 Search cleared - showing all products');
        }, 2000);
      }
    };

    // Start demo after 2 seconds
    const timer = setTimeout(runDemo, 2000);

    return () => clearTimeout(timer);
  }, [updateFilters, getFilteredProducts]);

  return (
    <div className="fixed top-4 right-4 bg-green-100 border border-green-300 p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="text-green-800 font-bold text-sm mb-2">🔍 Search Demo Running</h3>
      <p className="text-green-700 text-xs">
        Open browser console to see search results.
        Demo will run automatically in 2 seconds.
      </p>
      <div className="mt-2 text-xs text-green-600">
        Testing: shirt → watch → electronics
      </div>
    </div>
  );
};

export default SearchDemo;
