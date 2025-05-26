"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { usePathname } from "next/navigation";

const LoadingContext = createContext({ show: () => {}, hide: () => {} });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadingCount, setLoadingCount] = useState(0);
  const pathname = usePathname();

  const show = () => setLoadingCount((prev) => prev + 1);
  const hide = () => setLoadingCount((prev) => Math.max(0, prev - 1));

  // Reset loading state when route changes
  useEffect(() => {
    setLoadingCount(0);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {loadingCount > 0 && <LoadingOverlay />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
