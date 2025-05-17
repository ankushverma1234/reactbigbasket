import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  addOrder,
} from './store';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';

function CartComponent() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discountPercent, setDiscountPercent] = useState(0);
  const couponCodeRef = useRef();
  const [couponCodeDiscountPer, setCouponCodeDiscountPer] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    setOrderId('ORD-' + new Date().getTime());
  }, []);

  const handleCouponApply = () => {
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();

    switch (couponCode) {
      case 'ANKUSH10':
        setCouponCodeDiscountPer(10);
        setCouponMessage('✅ Coupon ANKUSH10 Applied (10% Off)');
        break;
      case 'ANKUSH20':
        setCouponCodeDiscountPer(20);
        setCouponMessage('✅ Coupon ANKUSH20 Applied (20% Off)');
        break;
      case 'ANKUSH30':
        setCouponCodeDiscountPer(30);
        setCouponMessage('✅ Coupon ANKUSH30 Applied (30% Off)');
        break;
      default:
        alert('❌ Invalid Coupon Code');
        setCouponCodeDiscountPer(0);
        setCouponMessage('');
    }

    couponCodeRef.current.value = '';
    setShowThankYou(true);
  };

  let totalItems = 0;
  let totalPrice = 0;
  for (const item of cart) {
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price;
  }

  const baseDiscountAmount = (totalPrice * discountPercent) / 100;
  const couponDiscountAmount = (totalPrice * couponCodeDiscountPer) / 100;
  const totalDiscount = baseDiscountAmount + couponDiscountAmount;
  const priceAfterDiscount = totalPrice - totalDiscount;
  const taxPrice = (priceAfterDiscount * 5) / 100;
  const finalPrice = priceAfterDiscount + taxPrice;

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCompletePurchase = () => {
    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !cardHolder || !expiry || !cvv) {
        alert('Please fill in all card details');
        return;
      }
    }

    const PurchageDateTime = new Date().toLocaleString();
    const cartObjects = cart.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const OrderDetailsObject = {
      orderId: orderId,
      PurchageDateTime: PurchageDateTime,
      items: [...cartObjects],
      finalPrice: finalPrice,
      paymentMethod: paymentMethod,
    };

    dispatch(clearCart());
    dispatch(addOrder(OrderDetailsObject));

    const templateParams = {
      order_Id: orderId,
      PurchageDateTime: PurchageDateTime,
      payment_method: paymentMethod,
      finalPrice: finalPrice.toFixed(2),
      orders: cartObjects.map(item =>
        `🔸 ${item.name} × ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`
      ).join('<br>'),
      shipping: '50',
      tax: taxPrice.toFixed(2),
      total: finalPrice.toFixed(2),
      customerEmail: customerEmail,
      totalItems: totalItems.toString(),
      totalPriceBeforeDiscount: totalPrice.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      couponDiscount: couponDiscountAmount.toFixed(2),
    };

    emailjs.send('service_titng56', 'template_eu1jilb', templateParams, 'Qf2_7EuCnXJFthQca')
      .then((response) => {
        console.log("Email sent successfully", response);
      })
      .catch((error) => {
        console.error("Error sending email", error);
      });

    navigate('/orders');
  };

  return (
    <>
      <div className="cart-page"></div>
      <div className="cart-container">
        <header>
          <h1>🛒 Your Cart</h1>
          <span className="cart-count">Items in Cart: {cartCount}</span>
        </header>

        {cart.length > 0 ? (
          <>
            <div className="cart-items">
              <ol>
                {cart.map((item, index) => (
                  <li key={`${item.id}-${index}`}>
                    {item.name} ₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                    <button onClick={() => dispatch(incrementQuantity(item))} style={{ color: 'green' }}>+</button>
                    <button onClick={() => dispatch(decrementQuantity(item))} style={{ color: 'red' }}>-</button>
                    <button onClick={() => dispatch(removeFromCart(item))} style={{ color: 'orange' }}>Remove</button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="discount-buttons">
              <span>Select Discount:</span>
              <button onClick={() => setDiscountPercent(10)} disabled={discountPercent === 10}>10%</button>
              <button onClick={() => setDiscountPercent(20)} disabled={discountPercent === 20}>20%</button>
              <button onClick={() => setDiscountPercent(30)} disabled={discountPercent === 30}>30%</button>
            </div>

            <div className="coupon-section">
              <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
              <button onClick={handleCouponApply}>Apply Coupon</button>
              {couponMessage && <p>{couponMessage}</p>}
            </div>

            <div className="cart-summary">
              <h3>Total Items: {totalItems}</h3>
              <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
              <h3>Manual Discount: ₹{baseDiscountAmount.toFixed(2)}</h3>
              <h3>Coupon Discount: ₹{couponDiscountAmount.toFixed(2)}</h3>
              <h3>Total Discount: ₹{totalDiscount.toFixed(2)}</h3>
              <h3>Tax (5%): ₹{taxPrice.toFixed(2)}</h3>
              <h3><strong>Final Amount to Pay: ₹{finalPrice.toFixed(2)}</strong></h3>

              <input
                type="email"
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />

              <div className="payment-method">
                <h3>Select Payment Method:</h3>
                <button onClick={() => setPaymentMethod('qr')}>QR Code</button>
                <button onClick={() => setPaymentMethod('card')}>Card</button>
              </div>

              {paymentMethod === 'qr' && (
                <div className="qr-section">
                  <h4>Scan UPI QR to pay ₹{finalPrice.toFixed(2)}</h4>
                  <QRCode value={`upi://pay?pa=6392391177@ptyes&pn=Ankush&am=${finalPrice.toFixed(2)}&cu=INR`} />
                  <p><b>UPI ID: Ankush@ybl</b></p>
                  <button onClick={handleCompletePurchase}>Mark as Paid & Complete</button>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-section">
                  <p>💳 Card Payment Selected</p>
                  <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                  <input type="text" placeholder="Card Holder Name" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
                  <input type="text" placeholder="Expiry (MM/YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                  <input type="password" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                  <button onClick={handleCompletePurchase}>Pay & Complete</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}

        {showThankYou && (
          <h2 style={{ color: 'green' }}>
            Thank you for your purchase......
          </h2>
        )}
      </div>
    </>
  );
}

export default CartComponent;
