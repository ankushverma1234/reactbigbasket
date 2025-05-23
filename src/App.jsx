import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './home.css';
import './veg.css';
import './nonveg.css';
import './milk.css';

import NonVeg from './NonVeg';
import Veg from './Veg';
 

import Signing from './Signing';
import Order from './Order';
import AboutUs from './AboutUs';
import ChocolateComponent from './ChocolateComponent';
import ContactUsComponent from './ContactUsComponent';
import HomeComponent from './HomeComponent';
import CartComponent from './CartComponent';
import MilkComponent from './MilkComponent';


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
          <Link to="/orders">Order</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/ContactUs">Contact Us</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/milk" element={<MilkComponent />} />
          <Route path="/chocolate" element={<ChocolateComponent />} />
          <Route path="/signing" element={<Signing />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/aboutus" element={<AboutUs />} /> {/* ✅ Correct usage */}
          <Route path="/contactus" element={<ContactUsComponent />} />
        </Routes>
      </main>

      <footer>© 2025 BigBasket | All Rights Reserved</footer>
    </BrowserRouter>
  );
}

export default App;
