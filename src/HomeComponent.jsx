import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Vegetables',
    description: 'Fresh, organic vegetables straight from the farm.',
    image: 'https://i.imgur.com/IhNckHk.jpg',
    path: '/veg',
  },
  {
    title: 'Non-Veg Items',
    description: 'Premium quality meat and seafood at your doorstep.',
    image: 'https://i.imgur.com/6oZgkaK.jpg',
    path: '/nonveg',
  },
  {
    title: 'Dairy & Milk',
    description: 'Milk, paneer, cheese, and more from trusted brands.',
    image: 'https://i.imgur.com/KF4TY3u.jpg',
    path: '/milk',
  },
  {
    title: 'Chocolates',
    description: 'Delicious chocolates for all your sweet cravings.',
    image: 'https://i.imgur.com/zSnE0Io.jpg',
    path: '/chocolate',
  }
];

// ✅ Component name matches file name (optional but cleaner)
const HomeComponent = () => {
  return (
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
    </div>
  );
};

export default HomeComponent;
