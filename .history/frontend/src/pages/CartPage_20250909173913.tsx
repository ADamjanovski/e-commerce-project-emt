import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, add, remove } = useCart();
  if (!cart) return <p>Your cart is empty.</p>;
  
  // Handle both old format (products) and new format (items)
  const items = cart.items || (cart.products ? cart.products.map(p => ({ product: p, quantity: 1 })) : []);
  
  return (
    <div className="cart">
      <div>
        <h2>Shopping Cart</h2>
        <div className="cart-items">
          {items.map(({ product: p, quantity }) => (
            <div key={p.id} className="cart-item">
              <img src={p.image_url} alt={p.name} />
              <div>
                <strong>{p.name}</strong>
                <div style={{ opacity: 0.8 }}>{(p.price * quantity).toFixed(2)} €</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => remove(p.id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => add(p.id)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="summary">
        <h3>Summary</h3>
        <p>Items: {items.reduce((s, i) => s + i.quantity, 0)}</p>
        <p>
          Total:{' '}
          {items.reduce((s, i) => s + i.product.price * i.quantity, 0).toFixed(2)} €
        </p>
        <button>Checkout</button>
      </aside>
    </div>
  );
}