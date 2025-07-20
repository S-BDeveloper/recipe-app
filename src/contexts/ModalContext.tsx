import React, { createContext, useContext, useState, useCallback } from "react";
import type { ModalContextType } from "../global";

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<string | null>(null); // e.g., 'premium', 'login', etc.
  const [notificationsCount] = useState(0);

  const openModal = useCallback((modalName: string) => setModal(modalName), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <ModalContext.Provider
      value={{
        modalType: modal,
        isModalOpen: modal !== null,
        openModal,
        closeModal,
        notificationsCount,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

