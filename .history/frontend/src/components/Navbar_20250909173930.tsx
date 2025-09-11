// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isAuth, logout, role } = useAuth();
  const { cart } = useCart();
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">Shop</Link>
        <nav className="links">
          <Link to="/products">Products</Link>
          <Link to="/cart" className="badge">
            <span>Cart</span>
            <span className="count">{cart?.items.length ?? 0}</span>
          </Link>
          {role === 'ROLE_ADMIN' && <Link to="/admin">Admin</Link>}
        </nav>
        <div className="spacer" />
        {isAuth ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <nav className="links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        )}
      </div>
    </header>
  );
}