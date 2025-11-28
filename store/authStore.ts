import { UserType } from "@/types/enums";
import { create } from "zustand";

// Define the User structure for the state
type User = { 
  id: string; 
  name: string; 
  type: UserType;
};

type AuthState = {
  user: User | null;
  login: (type: UserType, name: string, password: string) => boolean;
  logout: () => void;
  directLogin: (type: UserType, name: string) => boolean; 
};

// Static credentials based on the user's requirement
const STATIC_CREDENTIALS = {
  [UserType.Organization]: 'orgpass',
  [UserType.Creator]: 'creatorpass',
};

const localStorageKey = 'curators_auth_user';

// Function to safely get initial state from localStorage
const getInitialUser = (): User | null => {
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem(localStorageKey);
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            console.error("Could not parse user from localStorage", e);
            localStorage.removeItem(localStorageKey); // Clear corrupted storage
            return null;
        }
    }
    return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(), // Initialize state from localStorage

  login: (type, name, password) => {
    // 1. Check Credentials against static passwords
    if (password !== STATIC_CREDENTIALS[type]) {
      console.error('Invalid password for type:', type);
      return false;
    }
    
    // 2. Define User Object
    const newUser: User = { 
        id: `user-${type.toLowerCase()}-${name.toLowerCase()}`,
        name: name, 
        type: type 
    };

    // 3. Update State and Persist to localStorage
    set({ user: newUser });
    if (typeof window !== 'undefined') {
        localStorage.setItem(localStorageKey, JSON.stringify(newUser));
    }
    
    console.log('Login successful:', newUser);
    return true;
  },

  logout: () => {
    set({ user: null });
    if (typeof window !== 'undefined') {
        localStorage.removeItem(localStorageKey);
    }
  },

  // Minimal implementation for directLogin 
  directLogin: (type, name) => {
     const newUser: User = { 
        id: `user-${type.toLowerCase()}-${name.toLowerCase()}-direct`,
        name: name, 
        type: type 
    };
    set({ user: newUser });
    if (typeof window !== 'undefined') {
        localStorage.setItem(localStorageKey, JSON.stringify(newUser));
    }
    return true;
  },
}));