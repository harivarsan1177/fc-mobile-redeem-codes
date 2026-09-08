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
        badgeBg: 'bg-[#e7f1ed]',
        badgeText: 'text-[#1d5f52]',
        badgeBorder: 'border-[#b8dcce]',
        dotColor: 'bg-[#1d5f52]',
        description: 'Verified working recently by administrators.',
      };
    case 'EXPIRING_SOON':
      return {
        label: 'Expiring Soon',
        badgeBg: 'bg-[#fef8e7]',
        badgeText: 'text-[#a16207]',
        badgeBorder: 'border-[#fde047]',
        dotColor: 'bg-[#ca8a04]',
        description: 'This code is nearing its expiration date. Redeem immediately.',
      };
    case 'EXPIRED':
      return {
        label: 'Expired',
        badgeBg: 'bg-[#f4f4f0]',
        badgeText: 'text-[#787873]',
        badgeBorder: 'border-[#deded6]',
        dotColor: 'bg-[#a8a8a3]',
        description: 'The validity window for this code has closed.',
      };
    case 'LIMIT_REACHED':
      return {
        label: 'Limit Reached',
        badgeBg: 'bg-[#fef2f2]',
        badgeText: 'text-[#b91c1c]',
        badgeBorder: 'border-[#fecaca]',
        dotColor: 'bg-[#dc2626]',
        description: 'Maximum redemption limit reached by players globally.',
      };
    case 'DISABLED':
      return {
        label: 'Disabled',
        badgeBg: 'bg-[#f4f4f0]',
        badgeText: 'text-[#787873]',
        badgeBorder: 'border-[#deded6]',
        dotColor: 'bg-[#a8a8a3]',
        description: 'Temporarily or permanently deactivated by administrators.',
      };
    case 'PENDING_VERIFICATION':
      return {
        label: 'Pending Verification',
        badgeBg: 'bg-[#eff6ff]',
        badgeText: 'text-[#1d4ed8]',
        badgeBorder: 'border-[#bfdbfe]',
        dotColor: 'bg-[#3b82f6]',
        description: 'Newly discovered code awaiting testing and confirmation.',
      };
    default:
      return {
        label: 'Unknown',
        badgeBg: 'bg-[#f4f4f0]',
        badgeText: 'text-[#787873]',
        badgeBorder: 'border-[#deded6]',
        dotColor: 'bg-[#787873]',
        description: '',
      };
  }
}
