// src/pages/ProductListPage.tsx
import { useQuery } from '@tanstack/react-query';
import { ProductApi, CategoryApi } from '../api/endpoints';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

export default function ProductListPage() {
  const [cat, setCat] = useState<number | null>(null);

  const { data: categories } = useQuery(['cats'], () =>
    CategoryApi.findAll().then((r) => r.data)
  );

  const { data: products, isLoading } = useQuery(
    ['products', cat],
    () =>
      cat === null
        ? ProductApi.findAll().then((r) => r.data)
        : ProductApi.findByCategory(cat).then((r) => r.data.content),
    { keepPreviousData: true }
  );

  if (isLoading) return <p>Loading…</p>;

  return (
    <>
      <select onChange={(e) => setCat(Number(e.target.value) || null)}>
        <option value="">All</option>
        {categories?.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <div className="grid">
        {products?.map((p) => (
          <ProductCard p={p} key={p.id} />
        ))}
      </div>
    </>
  );
}