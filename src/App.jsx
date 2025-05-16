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
import Chocolate from './chocolate';
import Signing from './signing';
import Order from './order';
import AboutUs from './aboutUs';
import ContactUs from './contactUs';
import Milk from './milk';
 
import NonVeg from './nonVeg';
import Cart from './cart';
import Veg from './Veg';


function App() {

  const cart = useSelector((state) => state.cart); // 👈 GET cart from Redux
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // 👈 Count total items


  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>🛒 BigBasket</h1>
        <nav className="nav-links">
          <Link to="/Home">Home</Link>
          <Link to="/Nonveg">NonVeg</Link>
          <Link to="/Veg">Veg</Link>
          <Link to="/Milk">Milk</Link>
          <Link to="/Chocolate">Chocolate</Link>
          <Link to="/Signing">Sign In</Link>
          <Link to="/Cart">Cart ({cartCount})</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/AboutUs">About Us</Link>
          <Link to="/ContactUs">Contact Us</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/NonVeg" element={<NonVeg />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/Milk" element={<Milk />} />
          <Route path="/Chocolate" element={<Chocolate />} />
          <Route path="/Signing" element={<Signing />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Orders" element={<Order />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <footer>© 2025 BigBasket | All Rights Reserved</footer>
    </BrowserRouter>
  );
}

export default App;
