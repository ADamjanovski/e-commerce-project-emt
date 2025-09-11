import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, remove } = useCart();
  if (!cart) return <p>Your cart is empty.</p>;
  return (
    <div className="cart">
      <div>
        <h2>Shopping Cart</h2>
        <div className="cart-items">
          {cart.products.map((p) => (
            <div key={p.id} className="cart-item">
              <img src={p.image_url} alt={p.name} />
              <div>
                <strong>{p.name}</strong>
                <div style={{ opacity: 0.8 }}>{p.price.toFixed(2)} €</div>
              </div>
              <button onClick={() => remove(p.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      <aside className="summary">
        <h3>Summary</h3>
        <p>Items: {cart.products.length}</p>
        <p>
          Total:{' '}
          {cart.products.reduce((s, p) => s + p.price, 0).toFixed(2)} €
        </p>
        <button>Checkout</button>
      </aside>
    </div>
  );
}