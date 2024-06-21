import { ReactNode, createContext, useContext, useState } from "react";

interface ISectionSelected {
  id: number;
  name: 'Burgers' | 'Drinks' | 'Desserts';
}

interface ISectionState {
  sectionSelected: ISectionSelected | undefined;
  setSectionSelected: (value: ISectionSelected | undefined) => void;
}

const SectionContext = createContext<ISectionState | undefined>(undefined);


interface ISectionProviderProps {
  children: ReactNode;
}

export function SectionProvider({ children }: ISectionProviderProps) {

  const [sectionSelected, setSectionSelected] = useState<ISectionSelected>();

  return (
    <SectionContext.Provider
      value={{
        sectionSelected,
        setSectionSelected,
      }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSectionContext must be used within a SectionContextProvider');
  }
  return context;
}