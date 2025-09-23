import React from 'react';
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

// Context
import { CartProvider } from './context/CartContextFixed';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <div className="App">
              <Header />
              <main>
                <Banner />
                <div className="container mx-auto px-4">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <Sidebar />
                    <div className="flex-1">
                      <Categories />
                      <ProductGrid />
                    </div>
                  </div>
                </div>
              </main>
              <Footer />
              <Modal />
              <Toast />
              <MobileMenu />
              <NewsletterPopup />
            </div>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
