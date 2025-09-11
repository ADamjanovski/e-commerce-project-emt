// src/pages/CartDetailsPage.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartApi } from '../api/endpoints';
import type { ShoppingCartDto } from '../types/api';

export default function CartDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const cartId = Number(id);
  const cartQ = useQuery<ShoppingCartDto | null>({
    queryKey: ['cart', cartId],
    queryFn: async () => (await CartApi.details(cartId)).data,
    enabled: !Number.isNaN(cartId),
  });

  if (Number.isNaN(cartId)) return <p>Invalid cart.</p>;
  if (cartQ.isLoading) return <p>Loading…</p>;
  if (!cartQ.data) return <p>Not found.</p>;

  const cart = cartQ.data;
  const total = (cart.items ?? []).reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <div className="cart">
      <div>
        <h2>Cart #{cart.id}</h2>
        <div className="cart-items">
          {(cart.items ?? []).map(({ product: p, quantity }) => (
            <div key={p.id} className="cart-item">
              <img src={p.image_url} alt={p.name} />
              <div>
                <strong>{p.name}</strong>
                <div style={{ opacity: 0.8 }}>{(p.price * quantity).toFixed(2)} ден.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>x{quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="summary">
        <h3>Summary</h3>
        <p>Items: {(cart.items ?? []).reduce((s, i) => s + i.quantity, 0)}</p>
        <p>Total: {total.toFixed(2)} ден.</p>
        {/* No checkout button here for finished carts */}
      </aside>
    </div>
  );
}

