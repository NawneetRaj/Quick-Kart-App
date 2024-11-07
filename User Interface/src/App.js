import React, { useState } from 'react';
import { ShoppingCart, ChevronLeft, Plus, Minus } from 'lucide-react';


const QuickKartApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    paymentMethod: '',
  });
  const [orderSummary, setOrderSummary] = useState({ deliveryDetails: {}, cart: [] });
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const categories = [
    { id: 1, name: 'Grocery', icon: '🛒' },
    { id: 2, name: 'Stationery', icon: '📚' },
    { id: 3, name: 'Medical', icon: '💊' },
    { id: 4, name: 'Grooming', icon: '💇' }
  ];

  const stores = {
    Grocery: [
      { id: 1, name: 'Fresh Mart', rating: 4.5 },
      { id: 2, name: 'Food World', rating: 4.2 },
      { id: 3, name: 'Grocery Hub', rating: 4.0 },
      { id: 4, name: 'The Organic Store', rating: 4.8 },
      { id: 5, name: 'Daily Needs', rating: 4.3 },
    ],
    Stationery: [
      { id: 1, name: 'Office Supplies Co.', rating: 4.7 },
      { id: 2, name: 'The Paper Stop', rating: 4.1 },
      { id: 3, name: 'Artisan Stationery', rating: 4.6 },
      { id: 4, name: 'Creative Corner', rating: 4.4 },
      { id: 5, name: 'Bookworm Supplies', rating: 4.2 },
    ],
    Medical: [
      { id: 1, name: 'HealthPlus Pharmacy', rating: 4.5 },
      { id: 2, name: 'Wellness Pharmacy', rating: 4.6 },
      { id: 3, name: 'Care Pharmacy', rating: 4.3 },
      { id: 4, name: 'Medicare', rating: 4.4 },
      { id: 5, name: 'Your Local Pharmacy', rating: 4.2 },
    ],
    Grooming: [
      { id: 1, name: 'Beauty Essentials', rating: 4.8 },
      { id: 2, name: 'Grooming Supplies', rating: 4.5 },
      { id: 3, name: 'Self-Care Haven', rating: 4.6 },
      { id: 4, name: 'The Groom Room', rating: 4.7 },
      { id: 5, name: 'Glow & Go', rating: 4.4 },
    ],
  };

  const products = {
    1: [ // Products for Fresh Mart
      { id: 1, name: 'Apple', price: 0.99, description: 'Fresh apples per lb' },
      { id: 2, name: 'Banana', price: 0.59, description: 'Bananas per bunch' },
      { id: 3, name: 'Orange', price: 0.79, description: 'Oranges per lb' },
      { id: 4, name: 'Bread', price: 2.49, description: 'Whole grain bread' },
      { id: 5, name: 'Milk', price: 3.49, description: '1 gallon of milk' },
      { id: 6, name: 'Eggs', price: 2.99, description: 'Dozen eggs' },
      { id: 7, name: 'Cheese', price: 3.99, description: 'Block of cheese' },
      { id: 8, name: 'Butter', price: 2.99, description: 'Butter per lb' },
      { id: 9, name: 'Yogurt', price: 1.99, description: 'Yogurt cup' },
      { id: 10, name: 'Chicken', price: 5.99, description: 'Chicken breast per lb' },
    ],
    // Add products for other stores in a similar format
    2: [ // Products for Food World
      { id: 11, name: 'Pasta', price: 1.99, description: 'Pasta per box' },
      { id: 12, name: 'Rice', price: 0.89, description: 'Rice per lb' },
      { id: 13, name: 'Tomato Sauce', price: 2.49, description: 'Tomato sauce jar' },
      { id: 14, name: 'Olive Oil', price: 4.99, description: 'Olive oil bottle' },
      { id: 15, name: 'Honey', price: 5.49, description: 'Honey jar' },
      { id: 16, name: 'Cereal', price: 3.99, description: 'Box of cereal' },
      { id: 17, name: 'Peanut Butter', price: 2.99, description: 'Peanut butter jar' },
      { id: 18, name: 'Jelly', price: 2.49, description: 'Jelly per jar' },
      { id: 19, name: 'Dried Fruits', price: 4.99, description: 'Pack of dried fruits' },
      { id: 20, name: 'Chips', price: 1.99, description: 'Pack of chips' },
    ],
    // Add additional products for other stores...
    // For example, add products for Grocery Hub, The Organic Store, Daily Needs, etc.
    // Repeat this structure for each store
    3: [ // Products for Grocery Hub
      { id: 21, name: 'Snack Bars', price: 3.99, description: 'Pack of snack bars' },
      { id: 22, name: 'Popcorn', price: 1.49, description: 'Pack of popcorn' },
      { id: 23, name: 'Ice Cream', price: 4.49, description: 'Ice cream tub' },
      { id: 24, name: 'Frozen Vegetables', price: 3.49, description: 'Pack of frozen vegetables' },
      { id: 25, name: 'Salad Mix', price: 2.99, description: 'Pack of salad mix' },
      { id: 26, name: 'Pasta Sauce', price: 3.49, description: 'Pasta sauce jar' },
      { id: 27, name: 'Granola', price: 2.49, description: 'Granola pack' },
      { id: 28, name: 'Rice Cakes', price: 1.99, description: 'Pack of rice cakes' },
      { id: 29, name: 'Frozen Pizza', price: 4.99, description: 'Frozen pizza' },
      { id: 30, name: 'Spices', price: 1.99, description: 'Various spices pack' },
    ],
    // Repeat for other stores...
    // Stationery, Medical, and Grooming categories will have similar structures
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('main');
  };

  const handleChatSubmit = () => {
    const botResponse = getBotResponse(userMessage);
    setChatHistory([
      ...chatHistory,
      { sender: 'user', message: userMessage },
      { sender: 'bot', message: botResponse },
    ]);
    setUserMessage('');
  };

  const getBotResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('product')) {
      return 'I can help you with products. Please specify the category.';
    } else if (lowerQuery.includes('cart')) {
      return 'You can check your cart anytime. Just click the cart icon.';
    } else if (lowerQuery.includes('store')) {
      return 'Let me know which store you want to visit!';
    } else {
      return 'I\'m sorry, I didn\'t understand that. Can you please rephrase?';
    }
  };

  const HomePage = () => (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Welcome to Quick Kart</h2>
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
          <button
            className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );

  const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
  
    // Simulate chatbot response logic
    const getBotResponse = (userInput) => {
      const lowerCaseInput = userInput.toLowerCase();
  
      if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi")) {
        return "Hi! How can I help you today? You can ask about our products, prices, or anything else!";
      } else if (lowerCaseInput.includes("store") || lowerCaseInput.includes("location")) {
        return "We have stores in your area! Please specify which category you're looking for (Grocery, Stationery, Medical, Grooming).";
      } else if (lowerCaseInput.includes("price") || lowerCaseInput.includes("cost")) {
        return "You can check the latest prices on the product page. Please provide the product name for more details.";
      } else if (lowerCaseInput.includes("support") || lowerCaseInput.includes("help")) {
        return "You can reach our support team at support@quickkart.com. We are here to assist you!";
      } else if (lowerCaseInput.includes("order status") || lowerCaseInput.includes("track order")) {
        return "Please provide your order ID to track the status of your order.";
      } else if (lowerCaseInput.includes("categories") || lowerCaseInput.includes("what do you sell")) {
        return "We offer the following categories: Grocery, Stationery, Medical, and Grooming. Let me know what you're interested in!";
      } else {
        return "I'm sorry, I didn't understand that. Can you please rephrase or ask something else? You can try asking about our categories, prices, or support.";
      }
    };
  
    const handleChatSubmit = () => {
      if (userMessage.trim()) {
        // Add user message to chat history
        const userChat = { sender: 'user', message: userMessage };
        
        // Get bot response based on user input
        const botResponse = getBotResponse(userMessage);
        const botChat = { sender: 'bot', message: botResponse };
  
        // Update the chat history
        setChatHistory([
          ...chatHistory,
          userChat,
          botChat,
        ]);
  
        // Clear the input field
        setUserMessage('');
      }
    };
  
    // Toggle chat window visibility
    const toggleChatWindow = () => {
      setIsChatOpen(!isChatOpen);
      if (!isChatOpen) {
        // Add initial greeting when chat window is opened
        setChatHistory([
          ...chatHistory,
          { sender: 'bot', message: "Hi! How can I help you today?" },
        ]);
      }
    };
  
    return (
      <div>
        {/* Chatbot Icon */}
        {!isChatOpen && (
          <div
            className="fixed bottom-4 right-4 w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={toggleChatWindow}
          >
            <span className="text-2xl">💬</span>
          </div>
        )}
  
        {/* Chatbot Window */}
        {isChatOpen && (
          <div className="fixed bottom-4 right-4 w-96 bg-white p-6 rounded-xl shadow-xl border border-gray-200 z-50 transition-transform duration-300 transform hover:scale-105">
            <div className="flex flex-col space-y-4">
              <div className="overflow-y-auto max-h-72 p-2 space-y-2 bg-gray-50 rounded-lg shadow-inner">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : ''}`}>
                    <div
                      className={`p-3 rounded-lg ${chat.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                      style={{ maxWidth: '70%' }}
                    >
                      {chat.message}
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Message Input Area */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="flex-1 p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Ask me anything..."
                />
                <button
                  onClick={handleChatSubmit}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Send
                </button>
              </div>
            </div>
  
            {/* Close Chat Button */}
            <div
              className="absolute top-2 right-2 text-xl cursor-pointer"
              onClick={toggleChatWindow}
            >
              ✖️
            </div>
          </div>
        )}
      </div>
    );
  };
  


  const MainPage = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Categories</h2>
        <button onClick={() => setCurrentPage('cart')}>
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </div>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.name);
              setCurrentPage('category');
            }}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2 hover:bg-blue-50"
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const CategoryPage = () => (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button 
          className="mr-2"
          onClick={() => {
            setSelectedCategory(null);
            setCurrentPage('main');
          }}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold">{selectedCategory}</h2>
        <button className="ml-auto" onClick={() => setCurrentPage('cart')}>
          <ShoppingCart className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4">
        {stores[selectedCategory]?.map(store => (
          <button
            key={store.id}
            onClick={() => {
              setSelectedStore(store);
              setCurrentPage('store');
            }}
            className="w-full bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{store.name}</h3>
              <div className="text-sm text-gray-600">⭐ {store.rating}</div>
            </div>
            <ChevronLeft className="h-5 w-5 transform rotate-180" />
          </button>
        ))}
      </div>
    </div>
  );

  const StorePage = () => (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <button
          className="mr-2"
          onClick={() => {
            setSelectedStore(null);
            setCurrentPage('category');
          }}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold">{selectedStore?.name}</h2>
        <button className="ml-auto" onClick={() => setCurrentPage('cart')}>
          <ShoppingCart className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4">
        {products[selectedStore?.id]?.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <div className="text-sm text-gray-600">${product.price}</div>
                <div className="text-sm text-gray-500">{product.description}</div>
              </div>
              <button
                onClick={() => setCart([...cart, product])}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CartPage = () => {
    const [quantities, setQuantities] = useState({});

    const updateQuantity = (productId, delta) => {
      setQuantities(prev => ({
        ...prev,
        [productId]: (prev[productId] || 1) + delta
      }));
    };

    const getQuantity = (productId) => quantities[productId] || 1;

    const total = cart.reduce((sum, item) => sum + item.price * getQuantity(item.id), 0);

    return (
      <div className="p-4">
        <div className="flex items-center mb-6">
          <button
            className="mr-2"
            onClick={() => setCurrentPage('store')}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">Shopping Cart</h2>
        </div>
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="text-sm text-gray-600">${item.price}</div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={getQuantity(item.id) === 1}
                    className="p-1 bg-gray-300 rounded-full"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="mx-2">{getQuantity(item.id)}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 bg-gray-300 rounded-full"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              setCurrentPage('checkout');
            }}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    );
  };

  const CheckoutPage = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          alert('Order Confirmed!');
          setCart([]); // Clear the cart after confirming the order
          setCurrentPage('main'); // Redirect to main page
        }}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={deliveryDetails.name}
            onChange={e => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
            className="w-full border-2 border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={deliveryDetails.address}
            onChange={e => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
            className="w-full border-2 border-gray-300 p-2 rounded"
            required
          />
          <select
            value={deliveryDetails.paymentMethod}
            onChange={e => setDeliveryDetails({ ...deliveryDetails, paymentMethod: e.target.value })}
            className="w-full border-2 border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Confirm Order
          </button>
          <button
        onClick={() => setCurrentPage('cart')}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Back to Cart
      </button>
        </div>
      </form>
    </div>
  );

  const OrderSummaryPage = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      <h2 className="font-bold">Delivery Details:</h2>
      <p>Name: {orderSummary.deliveryDetails.name}</p>
      <p>Address: {orderSummary.deliveryDetails.address}</p>
      <p>Payment Method: {orderSummary.deliveryDetails.paymentMethod}</p>
      <h2 className="font-bold mt-4">Items:</h2>
      <div>
        {orderSummary.cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <span>{item.name} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>${orderSummary.cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
      </div>
      <button
        onClick={() => setCurrentPage('main')}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
    );

    
  return (
    <div>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'main' && <MainPage />}
      {currentPage === 'category' && <CategoryPage />}
      {currentPage === 'store' && <StorePage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'checkout' && <CheckoutPage />}
      {currentPage === 'orderSummary' && <OrderSummaryPage />}
      {isLoggedIn && <ChatBot />}
    </div>
  );
};

export default QuickKartApp;