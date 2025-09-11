// src/pages/AccountInfoPage.tsx
import { useQuery } from '@tanstack/react-query';
import { AuthApi, CartApi } from '../api/endpoints';
import type { DisplayUserDto, ShoppingCartDto } from '../types/api';
import { Link } from 'react-router-dom';

export default function AccountInfoPage() {
  const userQ = useQuery({ queryKey: ['me'], queryFn: () => AuthApi.info().then(r => r.data as DisplayUserDto) });
  const pastQ = useQuery({ queryKey: ['past-carts'], queryFn: () => CartApi.past().then(r => r.data as ShoppingCartDto[]) });

  if (userQ.isLoading || pastQ.isLoading) return <p>Loading…</p>;

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <section>
        <h2>Account</h2>
        <p><strong>Username:</strong> {userQ.data?.username}</p>
        <p><strong>Name:</strong> {userQ.data?.name} {userQ.data?.surname}</p>
      </section>

      <section>
        <h2>Past carts</h2>
        <div className="cart-items">
          {pastQ.data?.map((c) => (
            <div key={c.id} className="cart-item">
              <div>
                <strong>Cart #{c.id}</strong>
                <div style={{ opacity: 0.8 }}>Status: {c.status}</div>
                <div style={{ opacity: 0.8 }}>Items: {c.items?.reduce((s, i) => s + i.quantity, 0) ?? 0}</div>
              </div>
              <Link to={`/carts/${c.id}`}>View</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

