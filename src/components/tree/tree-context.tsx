import { createContext } from "react";

export type TreeContextType = {
  active: string | null;
  setActive: (active: string | null) => void;
};

export const TreeContext = createContext<TreeContextType | null>(null);
