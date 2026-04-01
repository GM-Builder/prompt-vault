"use client";

import { createContext, useContext } from "react";

export interface DashboardCtx {
  activeCategory: string;
  searchQuery: string;
}

export const DashboardContext = createContext<DashboardCtx>({
  activeCategory: "All",
  searchQuery: "",
});

export function useDashboard() {
  return useContext(DashboardContext);
}
