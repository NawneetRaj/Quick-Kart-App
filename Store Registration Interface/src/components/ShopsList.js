// src/components/ShopsList.js
import React, { useContext } from 'react';
import { ShopContext } from '../ShopContext';
import { Link } from 'react-router-dom';

function ShopsList() {
  const { shop } = useContext(ShopContext);

  return (
    <div className="page">
      <h2>Shops List</h2>
      {shop ? (
        <div>
          <h3>{shop.shopName}</h3>
          <p>Owner: {shop.ownerName}</p>
          <p>Contact: {shop.shopNumber}</p>
          <p>Address: {shop.shopAddress}</p>
          <Link to={`/shop/${shop.id}`}>
            <button>View</button>
          </Link>
        </div>
      ) : (
        <p>No shop registered yet.</p>
      )}
    </div>
  );
}

export default ShopsList;
