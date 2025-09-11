import { type DisplayProductDto } from '../types/api';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ p }: { p: DisplayProductDto }) {
  const { add } = useCart();
  return (
    <div className="card flex flex-col ju
    ">
      <Link key={p.id} to={`/products/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
        <img src={p.image_url} alt={p.name} />
        <h3>{p.name}</h3>
        <p>{p.price.toFixed(2)} €</p>
      </Link>
      <button onClick={() => add(p.id)}>Add to cart</button>
    </div>
  );
}