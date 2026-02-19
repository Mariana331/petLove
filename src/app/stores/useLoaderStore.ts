import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  start: () => void;
  finish: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  start: () => set({ isLoading: true }),
  finish: () => set({ isLoading: false }),
}));
