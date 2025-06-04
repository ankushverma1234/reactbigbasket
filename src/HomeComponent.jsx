import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = [
  {
    title: 'Vegetables',
    description: 'Fresh, organic vegetables straight from the farm.',
    image: '/vegetables/vegetables.jpg',
    path: '/veg',
  },
  {
    title: 'Non-Veg Items',
    description: 'Premium quality meat and seafood at your doorstep.',
    image: '/nonveges/nonveg.jpg',
    path: '/nonveg',
  },
  {
    title: 'Dairy & Milk',
    description: 'Milk, paneer, cheese, and more from trusted brands.',
    image: '/milkProduct/milkproduct.jpg',
    path: '/milk',
  },
  {
    title: 'Chocolates',
    description: 'Delicious chocolates for all your sweet cravings.',
    image: '/chocolate/chocolate.jpg',
    path: '/chocolate',
  }
];

const HomeComponent = () => {
  return (
    <div className="home-page">
    <div className="home-wrapper">
      <section className="hero">
        <h1>Welcome to BigBasket</h1>
        <p>Your daily needs delivered fast and fresh.</p>
      </section>

      <section className="category-list">
        {categories.map((cat, i) => (
          <div className="category-card" key={i}>
            <div
              className="category-img"
              style={{ backgroundImage: `url(${cat.image})` }}
            ></div>
            <div className="category-content">
              <h2>{cat.title}</h2>
              <p>{cat.description}</p>
              <Link to={cat.path} className="shop-btn">
                Shop Now →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ToastContainer added once globally here */}
      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
    </div>
  );
};

export default HomeComponent;
