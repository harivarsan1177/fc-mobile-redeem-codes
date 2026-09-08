import {
  collection,
  type CollectionReference,
  type DocumentData,
} from 'firebase/firestore';
import { db } from './config';

export const CODES_COLLECTION = 'codes';

export function getCodesCollection(): CollectionReference<DocumentData> | null {
  if (!db) return null;
  return collection(db, CODES_COLLECTION);
}
