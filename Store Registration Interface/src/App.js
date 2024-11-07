// src/App.js
import React from 'react';
import { ShopProvider } from './ShopContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CreateAccount from './components/CreateAccount';
import ShopLink from './components/ShopLink';
import ShopsList from './components/ShopsList';
import ShopPage from './components/ShopPage';  // Import ShopPage
import './App.css';

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/shop-link" element={<ShopLink />} />
          <Route path="/shops-list" element={<ShopsList />} />
          <Route path="/shop/:id" element={<ShopPage />} />  {/* Add this route */}
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
