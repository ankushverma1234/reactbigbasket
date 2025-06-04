import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './chocolate.css';

function ChocolateComponent() {
  const chocolateProducts = useSelector(state => state.products.chocolate);
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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} Product added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      theme: 'dark',
    });
  };

  const filteredProducts = chocolateProducts.filter(product =>
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

  const getPageRange = () => {
    const range = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i >= 1 && i <= totalPages) {
        range.push(i);
      }
    }
    return range;
  };

  return (
    <div className="chocolate-page">
      <h2 className="chocolate-heading">🍫 Chocolate Products</h2>
      <p className="chocolate-description">
        Indulge in our sweet collection of premium chocolate treats.
      </p>

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

      <div className="chocolate-content">
        <div className="chocolate-container">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <div className="chocolate-card" key={index}>
                <img src={product.image} alt={product.name} className="chocolate-image" />
                <h3>{product.name}</h3>
                <p>₹{product.price.toFixed(2)}</p>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="no-products">No products found for selected price range.</p>
          )}
        </div>

        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            ⬅ Previous
          </button>

          {getPageRange().map(page => (
            <button
              key={page}
              aria-label={`Go to page ${page}`}
              className={`page-button ${currentPage === page ? 'active' : ''}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next ➡
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default ChocolateComponent;
