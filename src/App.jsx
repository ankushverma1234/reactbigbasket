import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
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

// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux action
import { logoutUser } from './store';

// FontAwesome Icons
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

function App() {
  const dispatch = useDispatch();

  // Redux state
  const cart = useSelector((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const reduxUser = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem('user'));
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
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>

        <h1 className="logo">🛒 BigBasket</h1>

        {/* Nav Links */}
        <nav className="nav-links">
          <Link to="/"> 🏠 Home</Link>
          <Link to="/veg">🥦 Veg</Link>
          <Link to="/nonveg">🍗 NonVeg</Link>
          <Link to="/milk">🥛 Milk</Link>
          <Link to="/chocolate">🍫 Chocolate</Link>
          <Link to="/cart">🛒 Cart ({cartCount})</Link>
          <Link to="/orders">📦 Orders</Link>
          <Link to="/aboutus">👥 About Us</Link>
          <Link to="/contactus">✉️ Contact Us</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/milk" element={<MilkComponent />} />
          <Route path="/chocolate" element={<ChocolateComponent />} />

          <Route
            path="/cart"
            element={<CartComponent user={user} isAuthenticated={isAuthenticated} />}
          />

          <Route
            path="/orders"
            element={
              isAuthenticated ? (
                <Order />
              ) : (
                <Navigate to="/signin" replace state={{ from: '/orders' }} />
              )
            }
          />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUsComponent />} />

          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/cart" replace /> : <Signin />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/veg" replace /> : <Register />}
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer>© 2025 BigBasket | All Rights Reserved</footer>

    
    </BrowserRouter>
  );
}

export default App;
