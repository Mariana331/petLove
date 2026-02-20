import { create } from "zustand";

interface AuthState {
  isAuth: boolean;

  login: (token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,

  initAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({
        isAuth: true,
      });
    }
  },

  login: (token) => {
    localStorage.setItem("token", token);

    set({
      isAuth: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      isAuth: false,
    });
  },
}));
