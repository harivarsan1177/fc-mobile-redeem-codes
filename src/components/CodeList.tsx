import React from 'react';
import { SearchX, AlertCircle, RefreshCw } from 'lucide-react';
import type { CodeItem } from '../types/code';
import { CodeCard } from './CodeCard';

interface CodeListProps {
  codes: CodeItem[];
  isLoading: boolean;
  error: Error | null;
  officialRedeemUrl: string;
  onResetFilters: () => void;
}

export const CodeList: React.FC<CodeListProps> = ({
  codes,
  isLoading,
  error,
  officialRedeemUrl,
  onResetFilters,
}) => {
  // Loading Skeletons State (Dark Gaming Theme)
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="card p-6 animate-pulse bg-[#121928] border-[#1e2b40]">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-[#1e2a3f] rounded" />
                <div className="h-8 w-44 bg-[#1e2a3f] rounded" />
              </div>
              <div className="h-6 w-24 bg-[#1e2a3f] rounded-full" />
            </div>
            <div className="h-5 w-56 bg-[#1e2a3f] rounded mt-4" />
            <div className="h-4 w-40 bg-[#1e2a3f] rounded mt-2" />
            <div className="h-10 w-full bg-[#1e2a3f] rounded-xl mt-6" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="card p-10 text-center bg-[#141b2a] border-[#ef4444]/40">
        <AlertCircle size={40} className="mx-auto text-[#ef4444]" />
        <h3 className="mt-3 text-lg font-black text-white">Unable to Load Codes</h3>
        <p className="mt-1 text-sm text-[#94a3b8]">
          {error.message || 'There was a problem communicating with the database.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-secondary mt-5 mx-auto text-xs font-bold"
        >
          <RefreshCw size={14} /> Retry Connection
        </button>
      </div>
    );
  }

  // Empty Results State
  if (codes.length === 0) {
    return (
      <div className="card p-12 text-center bg-[#121928] border-[#22314a]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00ff87]/10 border border-[#00ff87]/20 text-[#00ff87]">
          <SearchX size={34} />
        </div>
        <h3 className="mt-4 text-xl font-black text-white">No Redeem Codes Found</h3>
        <p className="mt-2 text-sm text-[#94a3b8] max-w-md mx-auto leading-relaxed">
          There are currently no redeem codes matching your current filter criteria. Check back soon for new EA Sports FC drops!
        </p>
        <button
          onClick={onResetFilters}
          className="btn btn-primary mt-6 mx-auto text-xs"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  // Standard Grid View
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {codes.map((item) => (
        <CodeCard
          key={item.id}
          item={item}
          officialRedeemUrl={officialRedeemUrl}
        />
      ))}
    </div>
  );
};

