import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  userName: string;

  login: (userName: string, token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  userName: "",

  initAuth: () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token) {
      set({
        isAuth: true,
        userName: userName || "",
      });
    }
  },

  login: (userName, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);

    set({
      isAuth: true,
      userName,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    set({
      isAuth: false,
      userName: "",
    });
  },
}));
