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
      {/* Status Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onFilterChange({ status: 'ALL' })}
          className={`btn text-xs font-bold ${
            filter.status === 'ALL' ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          ALL ({totalCount})
        </button>

        <button
          onClick={() => onFilterChange({ status: 'ACTIVE' })}
          className={`btn text-xs font-bold ${
            filter.status === 'ACTIVE' ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          ACTIVE ({activeCount})
        </button>

        <button
          onClick={() => onFilterChange({ status: 'EXPIRING_SOON' })}
          className={`btn text-xs font-bold ${
            filter.status === 'EXPIRING_SOON' ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          EXPIRING ({expiringCount})
        </button>

        <button
          onClick={() => onFilterChange({ status: 'EXPIRED' })}
          className={`btn text-xs font-bold ${
            filter.status === 'EXPIRED' ? 'btn-primary' : 'btn-secondary'
          }`}
        >
          EXPIRED ({expiredCount})
        </button>
      </div>

      {/* Sort Selector */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#686863]">
        <ArrowUpDown size={14} />
        <span>Sort:</span>
        <select
          value={filter.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as CodeFilterState['sortBy'] })}
          className="rounded-lg border border-[#deded6] bg-white px-2.5 py-1.5 font-semibold text-[#151515] outline-none focus:border-[#151515]"
          aria-label="Sort codes"
        >
          <option value="newest">Newest Released</option>
          <option value="expiring">Expiring Soonest</option>
          <option value="reward">Reward Name</option>
        </select>
      </div>
    </div>
  );
};
