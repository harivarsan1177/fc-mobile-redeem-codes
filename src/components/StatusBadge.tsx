import React from 'react';
import type { CodeStatus } from '../types/code';
import { getStatusMeta } from '../utils/statusHelpers';

interface StatusBadgeProps {
  status: CodeStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const meta = getStatusMeta(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-wider ${
        meta.badgeBg
      } ${meta.badgeText} ${meta.badgeBorder} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      }`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${meta.dotColor}`} />
      {meta.label}
    </span>
  );
};
