// import { createContext, PropsWithChildren, useContext, useState } from "react";

// export type ActiveNode = {
//   id: string;
//   value: string;
// };

// export type TreeContextType = {
//   active: ActiveNode | null;
//   balance: number;
//   setActive: (active: ActiveNode | null) => void;
//   setBalance: (balance: number) => void;
// };

// export const TreeContext = createContext<TreeContextType | null>(null);

// export function TreeContextProvider(props: PropsWithChildren) {
//   const [active, setActive] = useState<ActiveNode | null>(null);
//   const [balance, setBalance] = useState<number>(0);
//   return (
//     <TreeContext.Provider value={{ active, setActive, balance, setBalance }}>
//       {props.children}
//     </TreeContext.Provider>
//   );
// }

// export function useTreeContext() {
//   const context = useContext(TreeContext);
//   if (!context || context === null) {
//     throw new Error("useTreeContext must be used within a TreeContextProvider");
//   }
//   return context;
// }
