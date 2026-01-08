import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();
  const totalPrice = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart!</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="item-quantity">
                    <label htmlFor={`qty-${item.id}`}>Qty:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = parseInt(e.target.value) || 0;
                          updateQuantity(item.id, qty);
                        }}
                        min="1"
                        className="qty-input"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    <span className="total-label">Total:</span>
                    <span className="total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                    title="Remove from cart"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span className="shipping-free">FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total:</span>
              <span>${(totalPrice * 1.1).toFixed(2)}</span>
            </div>

            <div className="cart-actions">
              <button className="checkout-btn">Proceed to Checkout</button>
              <Link to="/" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>

            <button
              onClick={clearCart}
              className="clear-cart-btn"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
