import { create } from "zustand";

export const modalStore = create((set) => ({
  isOpen: false,
  // TODO: 모달을 여는 ACTION
  openModal: () =>
    set({
      isOpen: true,
    }),
  // TODO: 모달을 닫는 ACTION
  closeModal: () =>
    set({
      isOpen: false,
    }),
}));
