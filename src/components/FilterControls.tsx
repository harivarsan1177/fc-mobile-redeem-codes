import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { CodeFilterState, CodeItem } from '../types/code';

interface FilterControlsProps {
  filter: CodeFilterState;
  onFilterChange: (updates: Partial<CodeFilterState>) => void;
  codes: CodeItem[];
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filter,
  onFilterChange,
  codes,
}) => {
  const activeCount = codes.filter((c) => c.status === 'ACTIVE').length;
  const expiringCount = codes.filter((c) => c.status === 'EXPIRING_SOON').length;
  const expiredCount = codes.filter((c) => c.status === 'EXPIRED' || c.status === 'LIMIT_REACHED').length;
  const totalCount = codes.length;

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onFilterChange({ status: 'ALL' })}
          className={`btn text-xs font-black tracking-wider ${
            filter.status === 'ALL'
              ? 'btn-primary'
              : 'btn-secondary text-[#94a3b8] hover:text-white'
          }`}
        >
          ALL ({totalCount})
        </button>

        <button
          onClick={() => onFilterChange({ status: 'ACTIVE' })}
          className={`btn text-xs font-black tracking-wider ${
            filter.status === 'ACTIVE'
              ? 'btn-primary'
              : 'btn-secondary text-[#94a3b8] hover:text-white'
          }`}
        >
          ACTIVE ({activeCount})
        </button>

        <button
          onClick={() => onFilterChange({ status: 'EXPIRING_SOON' })}
          className={`btn text-xs font-black tracking-wider ${
            filter.status === 'EXPIRING_SOON'
              ? 'btn-primary'
              : 'btn-secondary text-[#94a3b8] hover:text-white'
          }`}
        >
          EXPIRING ({expiringCount})
        </button>

        <button
          onClick={() => onFilterChange({ status: 'EXPIRED' })}
          className={`btn text-xs font-black tracking-wider ${
            filter.status === 'EXPIRED'
              ? 'btn-primary'
              : 'btn-secondary text-[#94a3b8] hover:text-white'
          }`}
        >
          EXPIRED ({expiredCount})
        </button>
      </div>

      {/* Sort Selector */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#94a3b8]">
        <ArrowUpDown size={14} className="text-[#00ff87]" />
        <span>SORT:</span>
        <select
          value={filter.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as CodeFilterState['sortBy'] })}
          className="rounded-xl border border-[#233148] bg-[#141c2e] px-3 py-1.5 font-bold text-white outline-none focus:border-[#00ff87] transition-colors cursor-pointer"
          aria-label="Sort codes"
        >
          <option value="newest" className="bg-[#141c2e] text-white">Newest Released</option>
          <option value="expiring" className="bg-[#141c2e] text-white">Expiring Soonest</option>
          <option value="reward" className="bg-[#141c2e] text-white">Reward Name</option>
        </select>
      </div>
    </div>
  );
};

