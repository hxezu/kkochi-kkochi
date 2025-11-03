import { create } from "zustand";

interface SidebarStore {
  open: boolean;
  toggle: () => void;
  close: () => void;
  setOpen: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  close: () => set({ open: false }),
  setOpen: (value) => set({ open: value }),
}));
