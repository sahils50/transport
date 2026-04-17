import { create } from "zustand";
interface AuthState {
  token: string | null;
  role: "owner" | "driver" | null;
  setAuth: (token: string, role: "owner" | "driver") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  setAuth: (token, role) => set({ token, role }),
  logout: () => set({ token: null, role: null }),
}));
