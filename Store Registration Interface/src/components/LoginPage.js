// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const validEmail = "user@example.com"; // Example email
    const validPassword = "password123";   // Example password

    if (email === validEmail && password === validPassword) {
      alert("Login successful!");
      navigate('/shop-link'); // Redirect to ShopLink page after login
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="page">
      <img src="WhatsApp Image 2024-11-07 at 11.38.11_6362f99d.jpg" alt="QuickKart Logo" className="logo" />
      <h2>Login to continue further</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={handleLogin}>Login</button>
      <p>Don't have an account?</p>
      <button className="btn" onClick={() => navigate('/create-account')}>
        Create Account
      </button>
    </div>
  );
}

export default LoginPage;
