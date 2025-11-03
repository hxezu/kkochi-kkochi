import { create } from "zustand";

interface SidebarState {
  open: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  open: true,
  toggle: () => set((state) => ({ open: !state.open })),
  setOpen: (value: boolean) => set({ open: value }),
}));
