import type { CodeStatus } from '../types/code';

export interface StatusMeta {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotColor: string;
  description: string;
}

export function getStatusMeta(status: CodeStatus): StatusMeta {
  switch (status) {
    case 'ACTIVE':
      return {
        label: 'Active & Verified',
        badgeBg: 'bg-[#00ff87]/15',
        badgeText: 'text-[#00ff87]',
        badgeBorder: 'border-[#00ff87]/40',
        dotColor: 'bg-[#00ff87]',
        description: 'Code is currently active and verified working on live FC Mobile servers. Claim your rewards now!',
      };
    case 'EXPIRING_SOON':
      return {
        label: 'Expiring Soon',
        badgeBg: 'bg-[#fbbf24]/15',
        badgeText: 'text-[#fbbf24]',
        badgeBorder: 'border-[#fbbf24]/40',
        dotColor: 'bg-[#fbbf24]',
        description: 'This code is nearing its expiration deadline (usually within 24 to 48 hours). Redeem immediately before it closes!',
      };
    case 'EXPIRED':
    case 'LIMIT_REACHED':
    case 'DISABLED':
      return {
        label: status === 'LIMIT_REACHED' ? 'Limit Reached' : 'Expired',
        badgeBg: 'bg-[#1e293b]/80',
        badgeText: 'text-[#94a3b8]',
        badgeBorder: 'border-[#334155]',
        dotColor: 'bg-[#64748b]',
        description: 'The official redemption campaign has ended or redemption quota was reached. EA servers no longer accept this code.',
      };
    case 'PENDING_VERIFICATION':
      return {
        label: 'Pending Check',
        badgeBg: 'bg-[#38bdf8]/15',
        badgeText: 'text-[#38bdf8]',
        badgeBorder: 'border-[#38bdf8]/40',
        dotColor: 'bg-[#38bdf8]',
        description: 'Newly reported code being tested on global servers to confirm working rewards.',
      };
    default:
      return {
        label: 'Unknown',
        badgeBg: 'bg-[#1e293b]/80',
        badgeText: 'text-[#94a3b8]',
        badgeBorder: 'border-[#334155]',
        dotColor: 'bg-[#64748b]',
        description: 'Status could not be determined.',
      };
  }
}

