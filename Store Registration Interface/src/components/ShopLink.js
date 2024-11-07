// src/components/ShopLink.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../ShopContext';

function ShopLink() {
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [shopNumber, setShopNumber] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const navigate = useNavigate();
  const { setShop } = useContext(ShopContext);

  const handleShopRegister = () => {
    // Save shop details to context
    setShop({ shopName, ownerName, shopNumber, shopAddress });
    alert("Shop registered successfully!");
    navigate('/shops-list'); // Redirect to ShopsList page after registration
  };

  return (
    <div className="page">
      <img src="logo.png" alt="QuickKart Logo" className="logo" />
      <h2>Link Your Shop</h2>
      <input
        type="text"
        placeholder="Enter Shop Name"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Shop Owner's Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Shop Number"
        value={shopNumber}
        onChange={(e) => setShopNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Shop Address"
        value={shopAddress}
        onChange={(e) => setShopAddress(e.target.value)}
      />
      <button className="btn" onClick={handleShopRegister}>Register Shop</button>
    </div>
  );
}

export default ShopLink;
