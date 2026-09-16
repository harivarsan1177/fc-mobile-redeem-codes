import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { CODES_COLLECTION } from '../firebase/firestore';
import type { CodeItem, CodeFormData, CodeStatus, AdminStats } from '../types/code';
import { INITIAL_DEV_SEED_CODES } from './seedService';

// Local cache for offline/dev fallback
const LOCAL_STORAGE_KEY = 'fc_mobile_codes_data';

function getLocalCodes(): CodeItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Scrub any legacy dummy seed codes
    const cleaned = parsed.filter((c: CodeItem) => !c.id?.startsWith('seed-code-'));
    if (cleaned.length !== parsed.length) {
      saveLocalCodes(cleaned);
    }
    return cleaned;
  } catch {
    return [];
  }
}

function saveLocalCodes(codes: CodeItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(codes));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
}

/**
 * Subscribe to public non-deleted codes.
 * Returns an unsubscribe function.
 */
export function subscribeToPublicCodes(
  onUpdate: (codes: CodeItem[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    // Return local active non-deleted codes
    const local = getLocalCodes().filter((c) => !c.deleted);
    onUpdate(local);

    // Watch storage events for multi-tab sync in dev
    const handler = () => {
      onUpdate(getLocalCodes().filter((c) => !c.deleted));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }

  try {
    const q = query(
      collection(db, CODES_COLLECTION),
      where('deleted', '==', false),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // If Firestore is empty, return empty list without injecting dummy data
          onUpdate([]);
          return;
        }
        const codes: CodeItem[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
          } as CodeItem;
        });
        onUpdate(codes);
      },
      (err) => {
        console.error('Firestore subscription error:', err);
        if (onError) onError(err);
        // Fallback to local
        onUpdate(getLocalCodes().filter((c) => !c.deleted));
      }
    );
  } catch (err) {
    if (onError) onError(err as Error);
    onUpdate(getLocalCodes().filter((c) => !c.deleted));
    return () => {};
  }
}

/**
 * Subscribe to all codes for the Admin Dashboard (including deleted).
 */
export function subscribeToAdminCodes(
  onUpdate: (codes: CodeItem[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    onUpdate(getLocalCodes());
    const handler = () => onUpdate(getLocalCodes());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }

  try {
    const q = query(collection(db, CODES_COLLECTION), orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          onUpdate([]);
          return;
        }
        const codes: CodeItem[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as CodeItem[];
        onUpdate(codes);
      },
      (err) => {
        console.error('Firestore admin subscription error:', err);
        if (onError) onError(err);
        onUpdate(getLocalCodes());
      }
    );
  } catch (err) {
    if (onError) onError(err as Error);
    onUpdate(getLocalCodes());
    return () => {};
  }
}

/**
 * Add a new code (Admin only).
 */
export async function createCode(formData: CodeFormData): Promise<string> {
  const newId = `code_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const nowIso = new Date().toISOString();

  const codeItem: CodeItem = {
    ...formData,
    id: newId,
    deleted: false,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  if (!isFirebaseConfigured || !db) {
    const local = getLocalCodes();
    local.unshift(codeItem);
    saveLocalCodes(local);
    return newId;
  }

  const docRef = doc(db, CODES_COLLECTION, newId);
  await setDoc(docRef, {
    ...codeItem,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return newId;
}

/**
 * Update an existing code (Admin only).
 */
export async function updateCode(id: string, updates: Partial<CodeItem>): Promise<void> {
  const nowIso = new Date().toISOString();

  if (!isFirebaseConfigured || !db) {
    const local = getLocalCodes();
    const idx = local.findIndex((c) => c.id === id);
    if (idx !== -1) {
      local[idx] = { ...local[idx], ...updates, updatedAt: nowIso };
      saveLocalCodes(local);
    }
    return;
  }

  const docRef = doc(db, CODES_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Verify a code (Admin only).
 * Records verificationDate, verificationNotes, and updates status.
 */
export async function verifyCode(
  id: string,
  status: CodeStatus,
  notes: string
): Promise<void> {
  const nowIso = new Date().toISOString();
  await updateCode(id, {
    status,
    verificationNotes: notes,
    verificationDate: nowIso,
  });
}

/**
 * Toggle featured status (Admin only).
 */
export async function toggleFeaturedCode(id: string, featured: boolean): Promise<void> {
  await updateCode(id, { featured });
}

/**
 * Soft delete a code (Sets deleted = true).
 */
export async function softDeleteCode(id: string): Promise<void> {
  await updateCode(id, { deleted: true });
}

/**
 * Restore a soft-deleted code (Sets deleted = false).
 */
export async function restoreCode(id: string): Promise<void> {
  await updateCode(id, { deleted: false });
}

/**
 * Seed initial data to Firestore (Admin utility).
 */
export async function seedFirestoreDatabase(): Promise<number> {
  if (!isFirebaseConfigured || !db) {
    saveLocalCodes(INITIAL_DEV_SEED_CODES);
    return INITIAL_DEV_SEED_CODES.length;
  }

  let count = 0;
  for (const item of INITIAL_DEV_SEED_CODES) {
    const docRef = doc(db, CODES_COLLECTION, item.id);
    const existing = await getDoc(docRef);
    if (!existing.exists()) {
      await setDoc(docRef, {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      count++;
    }
  }
  return count;
}

/**
 * Calculate KPI metrics for the Admin Dashboard.
 */
export function calculateAdminStats(codes: CodeItem[]): AdminStats {
  const activeList = codes.filter((c) => !c.deleted);
  return {
    total: activeList.length,
    active: activeList.filter((c) => c.status === 'ACTIVE').length,
    expiringSoon: activeList.filter((c) => c.status === 'EXPIRING_SOON').length,
    expired: activeList.filter((c) => c.status === 'EXPIRED').length,
    pendingVerification: activeList.filter((c) => c.status === 'PENDING_VERIFICATION').length,
    featured: activeList.filter((c) => c.featured).length,
  };
}
