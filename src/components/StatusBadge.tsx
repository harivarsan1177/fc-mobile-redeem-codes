import React, { useState } from 'react';
import { Info } from 'lucide-react';
import type { CodeStatus } from '../types/code';
import { getStatusMeta } from '../utils/statusHelpers';

interface StatusBadgeProps {
  status: CodeStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const meta = getStatusMeta(status);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border font-black uppercase tracking-wider backdrop-blur-xs transition-all ${
          meta.badgeBg
        } ${meta.badgeText} ${meta.badgeBorder} ${
          size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
        }`}
      >
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${meta.dotColor}`} />
        <span>{meta.label}</span>

        {/* 'i' Info Icon Trigger */}
        <button
          type="button"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          onClick={(e) => {
            e.stopPropagation();
            setShowTooltip((prev) => !prev);
          }}
          className="ml-0.5 rounded-full p-0.5 opacity-80 hover:opacity-100 hover:bg-white/10 transition-opacity focus:outline-none cursor-pointer"
          aria-label={`Status meaning: ${meta.label}`}
          title="Status explanation"
        >
          <Info size={size === 'sm' ? 11 : 13} className="shrink-0" />
        </button>
      </span>

      {/* Floating Hover Tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full right-0 mb-2 z-50 w-64 p-3 text-left rounded-xl bg-[#0d1424] border border-[#253752] text-[#f1f5f9] shadow-2xl backdrop-blur-md pointer-events-none animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-block h-2 w-2 rounded-full ${meta.dotColor}`} />
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              {meta.label}
            </span>
          </div>
          <p className="text-[11px] font-medium normal-case tracking-normal text-[#94a3b8] leading-relaxed">
            {meta.description}
          </p>
          {/* Subtle pointer arrow */}
          <div className="absolute top-full right-4 -mt-px border-4 border-transparent border-t-[#253752]" />
        </div>
      )}
    </div>
  );
};

