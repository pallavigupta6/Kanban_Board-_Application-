import { create } from 'zustand';
import { User } from '../type';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

// Mock user storage
const mockUsers: Record<string, { password: string; user: User }> = {};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  signIn: async (email, password) => {
    const userRecord = mockUsers[email];
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid credentials');
    }
    set({ user: userRecord.user });
  },
  signUp: async (email, password, fullName) => {
    if (mockUsers[email]) {
      throw new Error('User already exists');
    }
    const user: User = {
      id: crypto.randomUUID(),
      email,
      full_name: fullName,
    };
    mockUsers[email] = { password, user };
    set({ user });
  },
  signOut: async () => {
    set({ user: null });
  },
  initialize: async () => {
    set({ loading: false });
  },
}));