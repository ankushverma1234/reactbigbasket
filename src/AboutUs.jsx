import React from 'react';
import './aboutus.css'; // optional if using CSS file

function AboutUs() {
  return (
    <div className="aboutus-container">
      <h1 className="aboutus-title">About Us</h1>
      <p className="aboutus-text">
        Welcome to <strong>Big Basket</strong>! We are dedicated to providing you with the freshest fruits, vegetables, and groceries delivered straight to your doorstep. 
        Our mission is to make your shopping experience fast, easy, and enjoyable.
      </p>
    </div>
  );
}

export default AboutUs;
