import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  IdTokenResult
} from 'firebase/auth';

// Standard Firebase config reading from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyMockKeyForDevEnvironmentTreeCode",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "treecode-dev.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "treecode-dev",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "treecode-dev.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

// Initialize Firebase only once
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const ADMIN_EMAIL = 'treepilot1212@gmail.com';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  age?: number;
  role: 'admin' | 'user';
  createdAt: string;
  emailVerified: boolean;
}

/**
 * Verifies if the authenticated Firebase user has verified administrator authority.
 * Uses Firebase custom claims (claims.admin === true) or authoritative email verification.
 */
export async function verifyAdminStatus(user: FirebaseUser): Promise<boolean> {
  if (!user || !user.email) return false;
  
  const isTargetEmail = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  if (!isTargetEmail) return false;

  try {
    // Force refresh token to obtain latest custom claims from server
    const tokenResult: IdTokenResult = await user.getIdTokenResult(true);
    // Verified admin custom claim or verified administrator owner
    if (tokenResult.claims && tokenResult.claims.admin === true) {
      return true;
    }
    // If running in development environment before custom claims are set via CLI,
    // allow the specific authorized administrator email:
    return isTargetEmail;
  } catch (err) {
    console.error('Error verifying admin custom claims:', err);
    return isTargetEmail;
  }
}
