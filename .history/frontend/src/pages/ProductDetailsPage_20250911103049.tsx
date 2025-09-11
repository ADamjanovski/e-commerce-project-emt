// src/pages/ProductDetailsPage.tsx
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProductApi } from '../api/endpoints';
import type { DisplayProductDto } from '../types/api';
import { useCart } from '../context/CartContext';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { add } = useCart();

  const { data, isLoading } = useQuery<DisplayProductDto | null>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const r = await ProductApi.findOne(productId);
      return r.data;
    },
    enabled: !Number.isNaN(productId),
  });

  if (Number.isNaN(productId)) return <p>Invalid product.</p>;
  if (isLoading) return <p>Loading…</p>;
  if (!data) return <p>Not found.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <img src={data.image_url} alt={data.name} style={{ maxWidth: '100%' }} />
      <div>
        <h2>{data.name}</h2>
        <p>{data.price.toFixed(2)} ден.</p>
        <ul>
          {data.characteristics.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <button onClick={() => add(data.id)}>Add to cart</button>
      </div>
    </div>
  );
}

