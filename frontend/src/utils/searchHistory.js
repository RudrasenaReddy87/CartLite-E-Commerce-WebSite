// Initialize search history with sample data
export const initializeSearchHistory = () => {
  const existingHistory = localStorage.getItem('searchHistory');
  if (!existingHistory) {
    const sampleHistory = ['wireless headphones', 'smart watch'];
    localStorage.setItem('searchHistory', JSON.stringify(sampleHistory));
    console.log('Sample search history initialized:', sampleHistory);
  }
};

// Call this when the app starts
initializeSearchHistory();
