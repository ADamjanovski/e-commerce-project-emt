// src/components/ProductCard.tsx
import { type DisplayProductDto } from '../types/api';
import { useCart } from '../context/CartContext';

export default function ProductCard({ p }: { p: DisplayProductDto }) {
  const { add } = useCart();
  return (
    <div className="card">
      <img src={p.image_url} alt={p.name} />
      <h3>{p.name}</h3>
      <p>{p.price.toFixed(2)} €</p>
      <button onClick={() => add(p.id)}>Add to cart</button>
    </div>
  );
}