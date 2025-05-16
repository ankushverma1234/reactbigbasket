import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './home.css';
import './veg.css';
import './nonveg.css';
import './milk.css';
import './chocolate.css';

import Home from './Home';
import AboutUs from './aboutUs';
import ContactUs from './contactUs';
import Milk from './milk';
import NonVeg from './nonVeg';
import Cart from './cart';
import Veg from './Veg';
import Chocolate from './chocolate';
import Signing from './signing';
import Order from './order';

function App() {
  const cart = useSelector((state) => state.cart); // get cart from Redux
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // total items count

  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>🛒 BigBasket</h1>
        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/nonveg">NonVeg</Link>
          <Link to="/veg">Veg</Link>
          <Link to="/milk">Milk</Link>
          <Link to="/chocolate">Chocolate</Link>
          <Link to="/signing">Sign In</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/contactus">Contact Us</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chocolate" element={<Chocolate />} />
          <Route path="/signing" element={<Signing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <footer>© 2025 BigBasket | All Rights Reserved</footer>
    </BrowserRouter>
  );
}

export default App;
