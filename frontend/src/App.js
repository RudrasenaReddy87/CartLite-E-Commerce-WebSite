import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Categories from './components/Categories/Categories';
import Sidebar from './components/Sidebar/Sidebar';
import ProductGrid from './components/Products/ProductGrid';
import Footer from './components/Footer/Footer';
import Modal from './components/common/Modal';
import Toast from './components/common/Toast';
import MobileMenu from './components/common/MobileMenu';
import NewsletterPopup from './components/common/NewsletterPopup';
import LoginSignupModal from './components/common/LoginSignupModal';
import PurchaseNotificationEnhanced from './components/common/PurchaseNotificationEnhanced';
import Favorites from './components/common/Favorites';
import SearchResults from './components/common/SearchResults';

// Context
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
import { FavoritesProvider } from './context/FavoritesContext';

function HomePage() {
  return (
    <>
      <Banner />
      <SearchResults />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar />
          <div className="flex-1">
            <Categories />
            <ProductGrid />
          </div>
        </div>
      </div>
    </>
  );
}

function FavoritesPage() {
  return <Favorites />;
}

function App() {
  return (
    <Router>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <FavoritesProvider>
              <div className="App">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                  </Routes>
                </main>
                <Footer />
                <Modal />
                <Toast />
                <MobileMenu />
                <NewsletterPopup />
                <LoginSignupModal />
                <PurchaseNotificationEnhanced />
              </div>
            </FavoritesProvider>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
