import { create } from "zustand";

interface UIState {
  isLoading: boolean;
  progress: number;

  start: () => void;
  finish: () => void;
  tick: () => void;
}

export const useLoaderStore = create<UIState>((set, get) => ({
  isLoading: false,
  progress: 0,

  start: () => {
    set({ isLoading: true, progress: 0 });

    const interval = setInterval(() => {
      const { progress, isLoading } = get();

      if (!isLoading) {
        clearInterval(interval);
        return;
      }

      if (progress < 90) {
        set({ progress: progress + Math.random() * 10 });
      }
    }, 200);
  },

  finish: () => {
    set({ progress: 100 });

    setTimeout(() => {
      set({ isLoading: false, progress: 0 });
    }, 300);
  },

  tick: () => {
    const { progress } = get();
    set({ progress: Math.min(progress + 10, 100) });
  },
}));
