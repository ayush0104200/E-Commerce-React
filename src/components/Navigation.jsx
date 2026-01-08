import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navigation.css';

export default function Navigation() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🛍️ E-Store
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              🛒 Cart
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
