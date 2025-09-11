// src/pages/ProductListPage.tsx
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductApi, CategoryApi } from '../api/endpoints';
import ProductCard from '../components/ProductCard';
import type { Category, DisplayProductDto } from '../types/api';

interface Page<T> {
  content: T[];
  totalPages: number;
}

const PAGE_SIZE = 12;

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialPage = Number(searchParams.get('page') || '1');

  const [categoryId, setCategoryId] = useState<number | null>(
    initialCategory ? Number(initialCategory) : null,
  );
  const [page, setPage] = useState<number>(initialPage);

  // Sync page state with URL params
  useEffect(() => {
    const currentPageFromUrl = Number(searchParams.get('page') || '1');
    const currentCategoryFromUrl = searchParams.get('category');
    const nextCategory = currentCategoryFromUrl ? Number(currentCategoryFromUrl) : null;
    
    if (currentPageFromUrl !== page) {
      setPage(currentPageFromUrl);
    }
    if (nextCategory !== categoryId) {
      setCategoryId(nextCategory);
    }
  }, [searchParams, page, categoryId]);

  const queryKey = useMemo(() => ['products', { categoryId, page }], [categoryId, page]);

  const { data: categories = [], isLoading: catsLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => CategoryApi.findAll().then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const pageQuery = useQuery<Page<DisplayProductDto>>({
    queryKey,
    queryFn: async () => {
      if (categoryId === null) {
        const r = await ProductApi.findPaginated(page - 1, PAGE_SIZE);
        console.log('Paginated response:', r.data); // Debug log
        return { 
          content: r.data.content || r.data, 
          totalPages: r.data.totalPages || r.data.totalElements || 1 
        };
      }
      const r = await ProductApi.findByCategory(categoryId, page - 1, PAGE_SIZE);
      console.log('Category response:', r.data); // Debug log
      return { 
        content: r.data.content || r.data, 
        totalPages: r.data.totalPages || r.data.totalElements || 1 
      };
    },
  });

  const onCategoryChange = (value: string) => {
    const nextCategory = value ? Number(value) : null;
    setCategoryId(nextCategory);
    setPage(1);
    const next = new URLSearchParams();
    if (nextCategory) next.set('category', String(nextCategory));
    next.set('page', '1');
    setSearchParams(next);
  };

  const onPageChange = (nextPage: number) => {
    setPage(nextPage);
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  if (catsLoading || pageQuery.isLoading) return <p>Loading…</p>;

  console.log('Page data:', pageQuery.data); // Debug log
  console.log('Current page:', page); // Debug log

  return (
    <>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <select value={categoryId ?? ''} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <span>{pageQuery.data?.content.length ?? 0} results</span>
        <span>Total pages: {pageQuery.data?.totalPages ?? 'unknown'}</span>
      </div>

      <div className="grid">
        {pageQuery.data?.content.map((p: DisplayProductDto) => (
          <Link key={p.id} to={`/products/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProductCard p={p} />
          </Link>
        ))}
      </div>

      {pageQuery.data && (
        <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center', alignItems: 'center' }}>
          <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {pageQuery.data.totalPages || 1}
          </span>
          <button
            disabled={page >= (pageQuery.data.totalPages || 1)}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}