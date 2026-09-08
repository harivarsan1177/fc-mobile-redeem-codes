import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

export async function signInAdmin(email: string, pass: string): Promise<User> {
  if (!isFirebaseConfigured || !auth) {
    // In dev mode when Firebase is not yet wired up, allow developer bypass for admin preview
    if (email === 'admin@fcmobile.com' && pass === 'Admin@12345') {
      const mockUser = {
        uid: 'dev-admin-1',
        email: 'admin@fcmobile.com',
        displayName: 'FC Administrator',
      } as unknown as User;
      localStorage.setItem('fc_admin_dev_session', JSON.stringify(mockUser));
      return mockUser;
    }
    throw new Error(
      'Firebase credentials not configured. Please fill in .env.local with Firebase API keys or use default dev admin.'
    );
  }

  const credential = await signInWithEmailAndPassword(auth, email, pass);
  return credential.user;
}

export async function signOutAdmin(): Promise<void> {
  localStorage.removeItem('fc_admin_dev_session');
  if (isFirebaseConfigured && auth) {
    await fbSignOut(auth);
  }
}

export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, callback);
  }

  // Fallback for dev session
  const stored = localStorage.getItem('fc_admin_dev_session');
  if (stored) {
    try {
      callback(JSON.parse(stored));
    } catch {
      callback(null);
    }
  } else {
    callback(null);
  }

  return () => {};
}
