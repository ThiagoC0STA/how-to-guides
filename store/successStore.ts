import { create } from "zustand";

interface SuccessState {
  isOpen: boolean;
  message: string;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  showSuccess: (
    message: string,
    primaryButton?: { text: string; onClick: () => void },
    secondaryButton?: { text: string; onClick: () => void }
  ) => void;
  hideSuccess: () => void;
}

export const useSuccessStore = create<SuccessState>((set) => ({
  isOpen: false,
  message: "",
  primaryButton: undefined,
  secondaryButton: undefined,
  showSuccess: (message, primaryButton, secondaryButton) =>
    set({ isOpen: true, message, primaryButton, secondaryButton }),
  hideSuccess: () =>
    set({
      isOpen: false,
      message: "",
      primaryButton: undefined,
      secondaryButton: undefined,
    }),
}));
