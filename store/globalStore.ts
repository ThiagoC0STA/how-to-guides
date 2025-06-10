import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  category: string;
  utm: string | null;
  setCategory: (cat: string) => void;
  setUtm: (utm: string | null) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      category: "all",
      utm: null,
      setCategory: (cat) => set({ category: cat }),
      setUtm: (utm) => set({ utm }),
    }),
    {
      name: "global-store",
    }
  )
);
