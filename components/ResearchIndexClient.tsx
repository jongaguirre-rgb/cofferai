'use client';

import { useState, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';
import { ResearchPost } from '@/types/content';
import ResearchCard from '@/components/ResearchCard';
import SearchInput from '@/components/SearchInput';
import FilterDropdown from '@/components/FilterDropdown';

interface ResearchIndexClientProps {
  posts: ResearchPost[];
}

type AnalysisFilter = 'all' | 'deep-dive' | 'earnings-update' | 'method-note';
type SortOption = 'newest' | 'oldest' | 'company-az';

export default function ResearchIndexClient({ posts }: ResearchIndexClientProps) {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('all');
  const [typeFilter, setTypeFilter] = useState<AnalysisFilter>('all');
  const [sort, setSort] = useState<SortOption>('newest');

  const sectors = useMemo(
    () => Array.from(new Set(posts.map((p) => p.sector))).sort(),
    [posts]
  );

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: 'title', weight: 0.3 },
          { name: 'company', weight: 0.25 },
          { name: 'ticker', weight: 0.2 },
          { name: 'tags', weight: 0.15 },
          { name: 'sector', weight: 0.1 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts]
  );

  const filtered = useMemo(() => {
    let result = query.trim()
      ? fuse.search(query.trim()).map((r) => r.item)
      : [...posts];

    if (sector !== 'all') {
      result = result.filter((p) => p.sector === sector);
    }

    if (typeFilter !== 'all') {
      result = result.filter((p) => p.analysisType === typeFilter);
    }

    if (sort === 'newest') {
      result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === 'oldest') {
      result = result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      result = result.sort((a, b) => a.company.localeCompare(b.company));
    }

    return result;
  }, [query, sector, typeFilter, sort, posts, fuse]);

  const clearFilters = useCallback(() => {
    setQuery('');
    setSector('all');
    setTypeFilter('all');
    setSort('newest');
  }, []);

  const hasFilters = query || sector !== 'all' || typeFilter !== 'all' || sort !== 'newest';

  const typeButtons: { value: AnalysisFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'deep-dive', label: 'Deep Dives' },
    { value: 'earnings-update', label: 'Earnings Updates' },
    { value: 'method-note', label: 'Method Notes' },
  ];

  const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
    ...sectors.map((s) => ({ value: s, label: s })),
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'company-az', label: 'Company A–Z' },
  ];

  return (
    <div className="pt-20 pb-20">
      {/* Header */}
      <div className="container mb-10">
        <h1 className="font-garamond text-5xl font-bold mb-4">Research</h1>
        <p className="text-text-secondary max-w-2xl">
          Deep dives, earnings updates, and methodology notes on public companies. Every claim sourced to filings.
        </p>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-bg-primary border-b border-border-light mb-10">
        <div className="container py-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="w-full md:w-80">
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="Search by company, ticker, or keyword..."
              />
            </div>

            {/* Sector Dropdown */}
            <FilterDropdown
              label="Sector"
              value={sector}
              options={sectorOptions}
              onChange={setSector}
            />

            {/* Sort */}
            <FilterDropdown
              label="Sort"
              value={sort}
              options={sortOptions}
              onChange={(v) => setSort(v as SortOption)}
            />

            {/* Analysis Type Pills */}
            <div className="flex gap-2 flex-wrap">
              {typeButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setTypeFilter(btn.value)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-none ${
                    typeFilter === btn.value
                      ? 'bg-bg-dark text-text-inverse'
                      : 'bg-bg-secondary text-text-secondary border border-border-light hover:border-border-dark'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-muted text-sm">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-accent-blue text-sm hover:text-accent-blue-light"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-border-light bg-bg-secondary">
            <p className="text-text-muted mb-4">No analyses match your filters.</p>
            <button
              onClick={clearFilters}
              className="btn-secondary px-6 py-2 text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post) => (
              <ResearchCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
