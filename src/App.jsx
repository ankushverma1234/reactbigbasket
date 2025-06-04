import React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  FaHome,
  FaDrumstickBite,
  FaLeaf,
  FaShoppingCart,
  FaBoxOpen,
  FaInfoCircle,
  FaEnvelope,
  FaIceCream,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';

import NonVeg from './NonVeg';
import Veg from './Veg';
import Order from './Order';
import AboutUs from './AboutUs';
import ChocolateComponent from './ChocolateComponent';
import ContactUsComponent from './ContactUsComponent';
import HomeComponent from './HomeComponent';
import CartComponent from './CartComponent';
import MilkComponent from './MilkComponent';
import Register from './Register';
import Signin from './Signin';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { logoutUser } from './store';

function App() {
  const dispatch = useDispatch();

  // Redux store cart and user state
  const cart = useSelector((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Check user state from redux and also localStorage for persistence
  const reduxUser = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem('user'));
  
  // Determine authentication status prioritizing redux state, fallback to localStorage
  const isAuthenticated = reduxUser?.isAuthenticated || localUser?.isAuthenticated || false;

  const user = reduxUser.isAuthenticated ? reduxUser : localUser || {};

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
  };

  return (
    <BrowserRouter>
      {/* Header */}
      <header className="app-header">
        <div className="auth-links">
          {!isAuthenticated ? (
            <Link to="/signin"><FaSignInAlt /> Signin</Link>
          ) : (
            <button
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem' }}
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>

        <h1 className="logo">🛒 BigBasket</h1>

        <nav className="nav-links">
          <Link to="/"><FaHome /> Home</Link>
          <Link to="/veg"><FaLeaf /> Veg</Link>
          <Link to="/nonveg"><FaDrumstickBite /> NonVeg</Link>
          <Link to="/milk"><FaIceCream /> Milk</Link>
          <Link to="/chocolate">🍫 Chocolate</Link>
          <Link to="/cart"><FaShoppingCart /> Cart ({cartCount})</Link>
          <Link to="/orders"><FaBoxOpen /> Order</Link>
          <Link to="/aboutus"><FaInfoCircle /> About Us</Link>
          <Link to="/contactus"><FaEnvelope /> Contact Us</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<HomeComponent />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* Protected routes */}
          <Route path="/veg" element={isAuthenticated ? <Veg /> : <Navigate to="/signin" />} />
          <Route path="/nonveg" element={isAuthenticated ? <NonVeg /> : <Navigate to="/signin" />} />
          <Route path="/milk" element={isAuthenticated ? <MilkComponent /> : <Navigate to="/signin" />} />
          <Route path="/chocolate" element={isAuthenticated ? <ChocolateComponent /> : <Navigate to="/signin" />} />
          <Route path="/cart" element={isAuthenticated ? <CartComponent user={user} /> : <Navigate to="/signin" />} />
          <Route path="/orders" element={isAuthenticated ? <Order /> : <Navigate to="/signin" />} />

          {/* Public routes */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUsComponent />} />
          <Route path="/signin" element={isAuthenticated ? <Navigate to="/veg" /> : <Signin />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/veg" /> : <Register />} />
        </Routes>
      </main>

      <footer>© 2025 BigBasket | All Rights Reserved</footer>

      {/* Toast Notifications */}
      
    </BrowserRouter>
  );
}

export default App;
