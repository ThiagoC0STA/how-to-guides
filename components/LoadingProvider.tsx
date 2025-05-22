"use client";

import React, { createContext, useContext, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

const LoadingContext = createContext({ show: () => {}, hide: () => {} });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const show = () => setLoadingCount((prev) => prev + 1);
  const hide = () => setLoadingCount((prev) => Math.max(0, prev - 1));

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
