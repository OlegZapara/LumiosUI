import { create } from "zustand";

export type ActiveNode = {
  id: string;
  value: string;
};

export type TreeState = {
  balance: number;
  change: number;
  mode: "add" | "sub";
  activeNode: ActiveNode | null;
  updateBalance: (value: number) => void;
  setActive: (node: ActiveNode | null) => void;
  setChange: (value: number) => void;
  setMode: (mode: "add" | "sub") => void;
};

export const useTreeStore = create<TreeState>()((set) => ({
  balance: 1000,
  change: 0,
  mode: "add",
  activeNode: null,
  updateBalance: (newValue: number) => set({ balance: newValue }),
  setActive: (node: ActiveNode | null) => set({ activeNode: node, change: 0 }),
  setChange: (value) => {
    set((state) => ({ change: state.mode === "add" ? value : -value }));
  },
  setMode: (mode: "add" | "sub") => set({ mode }),
}));
