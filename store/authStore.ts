import { users } from "@/data/mockData";
import { UserType } from "@/types/enums";
import { create } from "zustand";

type AuthState = {
  user: { id: string; name: string; type: UserType } | null;
  login: (type: UserType, name: string, password: string) => boolean;
  logout: () => void;
  directLogin: (type: UserType, name: string) => boolean; // <-- new
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (type, name, password) => {
    console.log('Attempting login with', { type, name, password });
    return true
  },
  logout: () => set({ user: null }),
  directLogin: (type, name) => {
    return true
  },
}));
