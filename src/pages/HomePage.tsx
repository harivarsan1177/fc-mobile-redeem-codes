import React, { useMemo } from 'react';
import type { CodeItem, CodeFilterState } from '../types/code';
import { Hero } from '../components/Hero';
import { FeaturedCode } from '../components/FeaturedCode';
import { FilterControls } from '../components/FilterControls';
import { CodeList } from '../components/CodeList';
import { HowToRedeem } from '../components/HowToRedeem';
import { FAQ } from '../components/FAQ';

interface HomePageProps {
  codes: CodeItem[];
  isLoading: boolean;
  error: Error | null;
  filter: CodeFilterState;
  onFilterChange: (updates: Partial<CodeFilterState>) => void;
  onResetFilters: () => void;
  officialRedeemUrl: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  codes,
  isLoading,
  error,
  filter,
  onFilterChange,
  onResetFilters,
  officialRedeemUrl,
}) => {
  // Top Featured Code
  const featuredCode = useMemo(() => {
    return codes.find((c) => c.featured && c.status === 'ACTIVE') || codes.find((c) => c.status === 'ACTIVE');
  }, [codes]);

  // Filtered and sorted codes
  const filteredCodes = useMemo(() => {
    return codes
      .filter((item) => {
        // Status filter
        if (filter.status === 'ACTIVE' && item.status !== 'ACTIVE') return false;
        if (filter.status === 'EXPIRING_SOON' && item.status !== 'EXPIRING_SOON') return false;
        if (filter.status === 'EXPIRED' && item.status !== 'EXPIRED' && item.status !== 'LIMIT_REACHED') return false;

        // Search filter
        if (filter.search.trim()) {
          const q = filter.search.toLowerCase().trim();
          const matchesCode = item.code.toLowerCase().includes(q);
          const matchesReward = item.reward.toLowerCase().includes(q);
          const matchesNotes = item.notes ? item.notes.toLowerCase().includes(q) : false;
          const matchesSource = item.source ? item.source.toLowerCase().includes(q) : false;
          if (!matchesCode && !matchesReward && !matchesNotes && !matchesSource) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'newest') {
          return new Date(b.releaseDate || b.createdAt).getTime() - new Date(a.releaseDate || a.createdAt).getTime();
        }
        if (filter.sortBy === 'expiring') {
          if (!a.expirationDate) return 1;
          if (!b.expirationDate) return -1;
          return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
        }
        if (filter.sortBy === 'reward') {
          return a.reward.localeCompare(b.reward);
        }
        return 0;
      });
  }, [codes, filter]);

  return (
    <main className="flex-1">
      {/* 1. Hero Section */}
      <Hero
        searchQuery={filter.search}
        onSearchChange={(q) => onFilterChange({ search: q })}
      />

      {/* 2. Featured Code Banner */}
      {featuredCode && (
        <FeaturedCode
          code={featuredCode}
          officialRedeemUrl={officialRedeemUrl}
        />
      )}

      {/* 3. Active Codes Section */}
      <section id="active-codes" className="container-custom pb-16">
        <div className="mb-4">
          <div className="text-xs font-black tracking-widest text-[#00ff87] uppercase flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00ff87]" />
            LIVE REWARD VAULT
          </div>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-black text-white tracking-tight">
            {filter.status === 'ALL'
              ? 'All Redeem Codes'
              : filter.status === 'ACTIVE'
              ? 'Active & Verified Codes'
              : filter.status === 'EXPIRING_SOON'
              ? 'Codes Expiring Soon'
              : 'Expired & Exhausted Codes'}
          </h2>
        </div>

        {/* Filter Tabs & Sort Controls */}
        <FilterControls
          filter={filter}
          onFilterChange={onFilterChange}
          codes={codes}
        />

        {/* Code Cards Grid with all states */}
        <CodeList
          codes={filteredCodes}
          isLoading={isLoading}
          error={error}
          officialRedeemUrl={officialRedeemUrl}
          onResetFilters={onResetFilters}
        />
      </section>

      {/* 4. How to Redeem Guide */}
      <HowToRedeem officialRedeemUrl={officialRedeemUrl} />

      {/* 5. Frequently Asked Questions */}
      <FAQ />
    </main>
  );
};

