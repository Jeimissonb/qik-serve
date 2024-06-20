import { ReactNode, createContext, useContext, useState } from "react";

interface IMenuState {
  menuItemSelected: string;
  setMenuItemSelected: (value: 'MENU' | 'ENTRAR' | 'CONTATO') => void;
}

const MenuContext = createContext<IMenuState | undefined>(undefined);


interface IMenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: IMenuProviderProps) {

  const [menuItemSelected, setMenuItemSelected] = useState<string>('MENU');

  return (
    <MenuContext.Provider
      value={{
        menuItemSelected,
        setMenuItemSelected,
      }}>
      {children}
    </MenuContext.Provider>
  );
};

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuContextProvider');
  }
  return context;
};