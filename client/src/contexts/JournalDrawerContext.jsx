// client/src/contexts/JournalDrawerContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const JournalDrawerContext = createContext(null);

export function JournalDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openJournal = useCallback(() => setIsOpen(true), []);
  const closeJournal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      openJournal,
      closeJournal,
    }),
    [isOpen, openJournal, closeJournal]
  );

  return (
    <JournalDrawerContext.Provider value={value}>
      {children}
    </JournalDrawerContext.Provider>
  );
}

export function useJournalDrawer() {
  const context = useContext(JournalDrawerContext);

  if (!context) {
    throw new Error("useJournalDrawer must be used within JournalDrawerProvider");
  }

  return context;
}
