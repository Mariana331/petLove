import { create } from "zustand";
import type { Notice } from "../types/notices";

type ModalType = "attention" | "result" | "approve" | "editUser" | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  notice?: Notice;
  openModal: (type: ModalType, notice?: Notice) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  notice: undefined,
  openModal: (type, notice) => set({ isOpen: true, type, notice }),
  closeModal: () => set({ isOpen: false, type: null, notice: undefined }),
}));
