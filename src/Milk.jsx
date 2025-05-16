import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './milk.css';

function Milk() {
  const milkProducts = useSelector(state => state.products.milk);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState([1, 500]);

  const minPrice = 1;
  const maxPrice = 500;

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setSelectedPriceRange([minPrice, value]);
    setCurrentPage(1);
  };

  const filteredProducts = milkProducts.filter(product =>
    product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
  );

  const productsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="milk-page">
      <h2 className="milk-headings">Milk Products</h2>
      <p className="milk-description">
        Welcome to the Milk section. Discover a healthy selection of fresh and organic foods.
      </p>

      {/* 🔶 Price Slider Inline Section */}
      <div className="inline-slider">
        <h3>Filter by Price</h3>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedPriceRange[1]}
          step="1"
          onChange={handleSliderChange}
          className="price-slider"
        />
        <div className="price-range">
          ₹{selectedPriceRange[0]} - ₹{selectedPriceRange[1]}
        </div>
      </div>

      {/* 🛒 Products Section */}
      <div className="milk-content">
        <div className="milk-container">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <div className="milk-card" key={index}>
                <img src={product.image} alt={product.name} className="milk-image" />
                <h3>{product.name}</h3>
                <p>₹{product.price.toFixed(2)}</p>
                <button onClick={() => dispatch(addToCart(product))}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="no-products">No products found for selected price range.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            ⬅ Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default Milk;
