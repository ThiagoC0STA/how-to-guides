"use client";

import React, { createContext, useContext, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

const LoadingContext = createContext({ show: () => {}, hide: () => {} });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {open && <LoadingOverlay />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
