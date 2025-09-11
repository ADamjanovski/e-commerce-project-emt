// src/pages/ProductListPage.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductApi, CategoryApi } from '../api/endpoints';
import ProductCard from '../components/ProductCard';
import type { Category, DisplayProductDto } from '../types/api';

export default function ProductListPage() {
  const [cat, setCat] = useState<number | null>(null);

  /* ---------- categories ---------- */
  const {
    data: categories = [],   // default to empty array
    isLoading: catsLoading,
  } = useQuery<Category[]>({
    queryKey: ['cats'],
    queryFn: () => CategoryApi.findAll().then((r) => r.data),
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });

  /* ---------- products ---------- */
  const {
    data: products = [],
    isLoading: prodLoading,
  } = useQuery<DisplayProductDto[]>({
    queryKey: ['products', cat],
    queryFn: () =>
      cat === null
        ? ProductApi.findAll().then((r) => r.data)
        : ProductApi.findByCategory(cat).then((r) => r.data.content),
    keepPreviousData: true,
  });

  if (catsLoading || prodLoading) return <p>Loading…</p>;

  return (
    <>
      <select onChange={(e) => setCat(Number(e.target.value) || null)}>
        <option value="">All</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </>
  );
}