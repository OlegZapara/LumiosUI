"use client";
import { Provider } from "react-redux";
import { store } from "./store";

import React, { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
