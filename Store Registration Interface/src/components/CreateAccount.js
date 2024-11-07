// src/components/CreateAccount.js
import React from 'react';

function CreateAccount() {
  return (
    <div className="page">
      <img src="logo.png" alt="QuickKart Logo" className="logo" />
      <h2>Create Your Account here</h2>
      <input type="email" placeholder="Enter Email address" />
      <input type="password" placeholder="Enter Password" />
      <input type="password" placeholder="Confirm Password" />
      <button className="btn">Create Account</button>
      <p>Or Sign in With -</p>
      <button className="google-btn">Sign in with Google</button>
      <button className="facebook-btn">Sign in with Facebook</button>
    </div>
  );
}

export default CreateAccount;
