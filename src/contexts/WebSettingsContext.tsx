import { ReactNode, createContext, useContext, useState } from "react";

interface IWebSettingsState {
  bannerImage: string;
  setBannerImage: (value: string) => void;
  navBackgroundColour: string;
  setNavBackgroundColour: (value: string) => void;
  backgroundColour: string;
  setBackgroundColour: (value: string) => void;
}

const WebSettingsContext = createContext<IWebSettingsState | undefined>(undefined);


interface IWebSettingsProviderProps {
  children: ReactNode;
}

export function WebSettingsProvider({ children }: IWebSettingsProviderProps) {

  const [bannerImage, setBannerImage] = useState<string>('');
  const [navBackgroundColour, setNavBackgroundColour] = useState<string>('');
  const [backgroundColour, setBackgroundColour] = useState<string>('');

  return (
    <WebSettingsContext.Provider
      value={{
        bannerImage,
        setBannerImage,
        navBackgroundColour,
        setNavBackgroundColour,
        backgroundColour,
        setBackgroundColour
      }}>
      {children}
    </WebSettingsContext.Provider>
  );
};

export function useWebSettingsContext() {
  const context = useContext(WebSettingsContext);
  if (!context) {
    throw new Error('useWebSettingsContext must be used within a WebSettingsContextProvider');
  }
  return context;
};