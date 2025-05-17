// Orders.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import './order.css';

function Order() {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="orders-container">
      <h1>📦 Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="order-item">
              <strong>Order ID:</strong> {order.orderId}<br />
              <strong>Date:</strong> {order.PurchageDateTime}<br />
              <strong>Total:</strong> ₹{order.finalPrice.toFixed(2)}
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} = ₹{(item.quantity * item.price).toFixed(2)}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;
