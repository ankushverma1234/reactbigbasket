import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './veg.css';

function Veg() {
  const vegProducts = useSelector(state => state.products.veg);
  const dispatch = useDispatch();

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const priceRanges = [
    { value: 'Rs 1 to Rs 50', min: 1, max: 50 },
    { value: 'Rs 51 to Rs 100', min: 51, max: 100 },
    { value: 'Rs 101 to Rs 200', min: 101, max: 200 },
    { value: 'Rs 201 to Rs 500', min: 201, max: 500 },
    { value: 'More than Rs 500', min: 501, max: Infinity },
  ];

  const handleCheckboxChange = (rangeValue) => {
    setSelectedRanges((prev) =>
      prev.includes(rangeValue)
        ? prev.filter((val) => val !== rangeValue)
        : [...prev, rangeValue]
    );
    setCurrentPage(1); // reset to first page when filter changes
  };

  const handleClearFilters = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const activeRanges = priceRanges.filter(range =>
    selectedRanges.includes(range.value)
  );

  const filteredProducts =
    selectedRanges.length === 0
      ? vegProducts
      : vegProducts.filter(product =>
          activeRanges.some(
            range => product.price >= range.min && product.price <= range.max
          )
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
    <div className="veg-page">
      <h2 className="veg-headings">Vegetable Products</h2>
      <p className="veg-description">
        Welcome to the Vegetable section. Discover a healthy selection of fresh and organic vegetables.
      </p>

      <div className="veg-layout">
        {/* Left Filter */}
        <div className="veg-filter">
          <div className="filter-card">
            <h3 className="filter-title">Filter by Price:</h3>
            {priceRanges.map((range) => (
              <label key={range.value} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedRanges.includes(range.value)}
                  onChange={() => handleCheckboxChange(range.value)}
                />
                {range.value}
              </label>
            ))}

            {/* Clear Filters Button */}
            <button className="clear-button" onClick={handleClearFilters}>
              Clear All Filters ❌
            </button>
          </div>
        </div>

        {/* Right Products */}
        <div className="veg-product-area">
          <div className="veg-container">
            {currentProducts.map((product, index) => (
              <div className="veg-card" key={index}>
                <img src={product.image} alt={product.name} className="veg-image" />
                <h3>{product.name}</h3>
                <p>₹{product.price.toFixed(2)}</p>
                <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
              </div>
            ))}
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
    </div>
  );


  
}

export default Veg;
