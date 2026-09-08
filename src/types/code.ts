export type CodeStatus =
  | 'ACTIVE'
  | 'EXPIRING_SOON'
  | 'EXPIRED'
  | 'LIMIT_REACHED'
  | 'DISABLED'
  | 'PENDING_VERIFICATION';

export interface CodeItem {
  id: string;
  code: string;
  reward: string;
  status: CodeStatus;
  releaseDate: string; // ISO date string e.g. "2026-09-08"
  expirationDate: string | null; // ISO date string or null
  source?: string;
  sourceUrl?: string;
  notes?: string;
  usageLimit?: number | null;
  featured: boolean;
  verificationDate?: string | null;
  verificationNotes?: string | null;
  deleted: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type CodeFormData = Omit<CodeItem, 'id' | 'createdAt' | 'updatedAt'>;

export interface CodeFilterState {
  search: string;
  status: 'ALL' | 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';
  sortBy: 'newest' | 'expiring' | 'reward';
}

export interface AdminStats {
  total: number;
  active: number;
  expiringSoon: number;
  expired: number;
  pendingVerification: number;
  featured: number;
}
