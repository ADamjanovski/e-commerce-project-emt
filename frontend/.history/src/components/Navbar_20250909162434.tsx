// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isAuth, logout, role } = useAuth();
  const { cart } = useCart();
  return (
    <header className="nav">
      <Link to="/">Shop</Link>
      <nav>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          Cart ({cart?.products.length ?? 0})
        </Link>
        {role === 'ROLE_ADMIN' && <Link to="/admin">Admin</Link>}
        {isAuth ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}