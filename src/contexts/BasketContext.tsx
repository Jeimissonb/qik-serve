import { IItems } from "@models";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface IBasketState {
  itemsOfBasket: IItems[];
  setItemsOfBasket: React.Dispatch<React.SetStateAction<IItems[]>>;
  countElements: () => number;
}

const BasketContext = createContext<IBasketState | undefined>(undefined);

interface IBasketProviderProps {
  children: ReactNode;
}

export function BasketProvider({ children }: IBasketProviderProps) {

  const [itemsOfBasket, setItemsOfBasket] = useState<IItems[]>([]);

  function countElements () {
    return itemsOfBasket.length
  }

  return (
    <BasketContext.Provider
      value={{
        itemsOfBasket,
        setItemsOfBasket,
        countElements
      }}>
      {children}
    </BasketContext.Provider>
  );
};

export function useBasketContext() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasketContext must be used within a BasketContextProvider');
  }
  return context;
};