import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, remove } = useCart();
  if (!cart) return <p>Your cart is empty.</p>;
  return (
    <>
      <h2>Shopping Cart</h2>
      {cart.products.map((p) => (
        <div key={p.id}>
          {p.name} – {p.price.toFixed(2)} €
          <button onClick={() => remove(p.id)}>Remove</button>
        </div>
      ))}
      <p>
        Total:{' '}
        {cart.products
          .reduce((s, p) => s + p.price, 0)
          .toFixed(2)}{' '}
        €
      </p>
    </>
  );
}