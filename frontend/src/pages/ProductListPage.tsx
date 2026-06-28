// src/pages/ProductListPage.tsx
import { useMemo, useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { ProductApi, CategoryApi } from '../api/endpoints';
import ProductCard from '../components/ProductCard';
import type { Category, DisplayProductDto } from '../types/api';

interface Page<T> {
  content: T[];
  totalPages: number;
}

interface SpringPageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

const PAGE_SIZE = 10;

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

  const recommendedQ = useQuery<DisplayProductDto[]>({
    queryKey: ['recommended'],
    queryFn: () => ProductApi.findRecommended().then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const pageQuery = useQuery<Page<DisplayProductDto>>({
    queryKey,
    queryFn: async () => {
      if (categoryId === null) {
        const r = await ProductApi.findPaginated(page - 1, PAGE_SIZE);
        const data = r.data as SpringPageResponse<DisplayProductDto>;
        console.log('Paginated response:', data); // Debug log
        return { 
          content: data.content, 
          totalPages: data.totalPages 
        };
      }
      const r = await ProductApi.findByCategory(categoryId, page - 1, PAGE_SIZE);
      const data = r.data as SpringPageResponse<DisplayProductDto>;
      console.log('Category response:', data); // Debug log
      return { 
        content: data.content, 
        totalPages: data.totalPages 
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

  if (catsLoading) return <p>Loading categories…</p>;

  console.log('Page data:', pageQuery.data); // Debug log
  console.log('Current page:', page); // Debug log

  return (
    <>
      {recommendedQ.data && recommendedQ.data.length > 0 && (
        <section style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h2 style={{ margin: 0 }}>Recommended</h2>
            <SliderControls count={recommendedQ.data.length} targetId="rec-track" />
          </div>
          <div id="rec-track" className="slider-track">
            {recommendedQ.data.map((p) => (
              <div key={p.id} style={{ minWidth: 220 }}>
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <select className="select" value={categoryId ?? ''} onChange={(e) => onCategoryChange(e.target.value)}>
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

      <div style={{ position: 'relative' }}>
        {pageQuery.isFetching && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.6)',
            zIndex: 10,
          }}>
            <span>Loading products…</span>
          </div>
        )}

        <div className="grid" style={{ opacity: pageQuery.isFetching ? 0.5 : 1 }}>
          {pageQuery.data?.content.map((p: DisplayProductDto) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
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

function SliderControls({ count, targetId }: { count: number; targetId: string }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    trackRef.current = document.getElementById(targetId) as HTMLDivElement | null;
  }, [targetId]);
  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = dir === 'left' ? -300 : 300;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };
  if (count <= 0) return null;
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => scroll('left')}>{'<'}</button>
      <button onClick={() => scroll('right')}>{'>'}</button>
    </div>
  );
}
