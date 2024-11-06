import { createContext, useContext, ReactNode } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

// Create the context
const IsMobileContext = createContext(false);

// Provider component to wrap the app
export function IsMobileProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  return (
    <IsMobileContext.Provider value={isMobile}>
      {children}
    </IsMobileContext.Provider>
  );
}

// Hook to use the context in any component
export function useIsMobileContext() {
  return useContext(IsMobileContext);
}
