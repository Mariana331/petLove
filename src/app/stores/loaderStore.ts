import { create } from "zustand";

interface UIState {
  isLoading: boolean;
  progress: number;

  showLoader: () => void;
  hideLoader: () => void;
  setProgress: (value: number) => void;
}

export const useLoaderStore = create<UIState>((set) => ({
  isLoading: false,
  progress: 0,

  showLoader: () => set({ isLoading: true, progress: 0 }),
  hideLoader: () => set({ isLoading: false }),
  setProgress: (value) => set({ progress: value }),
}));
