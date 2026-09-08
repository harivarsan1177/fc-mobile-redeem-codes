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
  // Loading Skeletons State
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="card p-6 animate-pulse bg-white">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-[#e8e8df] rounded" />
                <div className="h-8 w-44 bg-[#e8e8df] rounded" />
              </div>
              <div className="h-6 w-24 bg-[#e8e8df] rounded-full" />
            </div>
            <div className="h-5 w-56 bg-[#e8e8df] rounded mt-4" />
            <div className="h-4 w-40 bg-[#e8e8df] rounded mt-2" />
            <div className="h-10 w-full bg-[#e8e8df] rounded-xl mt-6" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="card p-10 text-center bg-white border-[#fca5a5]">
        <AlertCircle size={40} className="mx-auto text-[#dc2626]" />
        <h3 className="mt-3 text-lg font-black text-[#151515]">Unable to Load Codes</h3>
        <p className="mt-1 text-sm text-[#686863]">
          {error.message || 'There was a problem communicating with the database.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-secondary mt-5 mx-auto text-xs"
        >
          <RefreshCw size={14} /> Retry Connection
        </button>
      </div>
    );
  }

  // Empty Results State
  if (codes.length === 0) {
    return (
      <div className="card p-12 text-center bg-white">
        <SearchX size={44} className="mx-auto text-[#a8a8a3]" />
        <h3 className="mt-3 text-xl font-black text-[#151515]">No Matching Codes Found</h3>
        <p className="mt-2 text-sm text-[#686863] max-w-md mx-auto">
          We couldn&apos;t find any redeem codes matching your current search criteria or status filter.
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
