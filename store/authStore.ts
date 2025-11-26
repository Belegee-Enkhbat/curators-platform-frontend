import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from "@/types/schema";
import { mockCreators, mockOrganizations } from '@/data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'creator' | 'organization') => Promise<void>;
  register: (data: { email: string; password: string; name: string; role: 'creator' | 'organization'; companyName?: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, _password: string, role: 'creator' | 'organization') => {
        // Mock authentication - in real app, this would call an API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let user: User | null = null;
        
        if (role === 'creator') {
          user = mockCreators.find(c => c.email === email) || mockCreators[0];
        } else {
          user = mockOrganizations.find(o => o.email === email) || mockOrganizations[0];
        }
        
        set({ user, isAuthenticated: true });
      },
      
      register: async (data) => {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          name: data.name,
          role: data.role,
          createdAt: new Date(),
        };
        
        set({ user: newUser, isAuthenticated: true });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);