// Order.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import './order.css';

function Order() {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="orders-container" aria-label="User Orders">
      <h1>📦 Your Orders</h1>
      {orders.length === 0 ? (
        <p className="empty-message">No orders placed yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index} className="order-card">
              <div className="order-header">
                <span>🆔 <strong>{order.orderId}</strong></span>
                <span>📅 {order.purchaseDateTime ? new Date(order.purchaseDateTime).toLocaleString() : 'Date Not Available'}</span>
              </div>
              <div className="order-body">
                <p><strong>Total:</strong> ₹{order.finalPrice?.toFixed(2) ?? '0.00'}</p>
                <ul className="order-items">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      🍽️ {item.name} × {item.quantity} = ₹{(item.quantity * item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;
