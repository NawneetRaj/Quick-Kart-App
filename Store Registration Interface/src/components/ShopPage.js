// src/components/ShopPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ShopPage() {
  const { id } = useParams(); // Get the shop ID from the URL
  const navigate = useNavigate();

  // State to store products for the current shop
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  // Handle adding a product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      alert('Please fill all fields');
      return;
    }
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ name: '', price: '', description: '' });
  };

  // Handle deleting a product
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="shop-page">
      <h1>Manage Products for Shop {id}</h1>

      {/* Product Form */}
      <div className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Display Products */}
      <h2>Products:</h2>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id} className="product-item">
              <p><strong>{product.name}</strong> - ${product.price}</p>
              <p>{product.description}</p>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products added yet.</p>
      )}

      {/* Back Button */}
      <button onClick={() => navigate('/shops-list')}>Back to Shops List</button>
    </div>
  );
}

export default ShopPage;
