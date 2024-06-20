import { IMenu } from "@models";
import { ReactNode, createContext, useContext, useState } from "react";

interface IMenuItemsState {
  menu: IMenu | undefined;
  setMenu: (value: IMenu) => void;
}

const MenuItemsContext = createContext<IMenuItemsState | undefined>(undefined);


interface IMenuItemsProviderProps {
  children: ReactNode;
}

export function MenuItemsProvider({ children }: IMenuItemsProviderProps) {

  const [menu, setMenu] = useState<IMenu>();

  return (
    <MenuItemsContext.Provider
      value={{
        menu,
        setMenu
      }}>
      {children}
    </MenuItemsContext.Provider>
  );
};

export function useMenuItemsContext() {
  const context = useContext(MenuItemsContext);
  if (!context) {
    throw new Error('useMenuItemsContext must be used within a MenuItemsContextProvider');
  }
  return context;
};