// Mock Firebase setup
// This avoids needing real Firebase credentials for local development.

import type { User } from 'firebase/auth';

const mockUser: User = {
    uid: 'mock-admin-uid',
    email: 'asse181086@gmail.com',
    displayName: 'Admin',
    photoURL: '',
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    providerId: 'password',
    tenantId: null,
    delete: async () => {},
    getIdToken: async () => 'mock-token',
    getIdTokenResult: async () => ({
        token: 'mock-token',
        expirationTime: '',
        authTime: '',
        issuedAtTime: '',
        signInProvider: null,
        signInSecondFactor: null,
        claims: {},
    }),
    reload: async () => {},
    toJSON: () => ({}),
};


let currentUser: User | null = null;
const authStateChangeListeners: ((user: User | null) => void)[] = [];

// --- Mock Auth ---
export const auth = {
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    authStateChangeListeners.push(callback);
    // Immediately notify the new listener with the current state
    Promise.resolve().then(() => callback(currentUser));
    
    // Return an unsubscribe function
    return () => {
      const index = authStateChangeListeners.indexOf(callback);
      if (index > -1) {
        authStateChangeListeners.splice(index, 1);
      }
    };
  },
  
  signInWithEmailAndPassword: async (email: string, password?: string) => {
    return new Promise((resolve, reject) => {
      if (email === 'asse181086@gmail.com') {
        currentUser = mockUser;
        authStateChangeListeners.forEach(listener => listener(currentUser));
        resolve({ user: currentUser });
      } else {
         const error = new Error("Mock Auth Error: Invalid credentials");
         (error as any).code = 'auth/invalid-credential';
         reject(error);
      }
    });
  },

  signOut: async () => {
    return new Promise<void>((resolve) => {
        currentUser = null;
        authStateChangeListeners.forEach(listener => listener(null));
        resolve();
    });
  },
  
  get currentUser() {
      return currentUser;
  }
};


// --- Export mock functions that match the real ones ---
export const signInWithEmailAndPassword = auth.signInWithEmailAndPassword;
export const onAuthStateChanged = auth.onAuthStateChanged;
export const getAuth = () => auth;

// --- Mock Firestore, Storage etc. as needed ---
export const db = {};
export const storage = {};
export const app = {};
