import { MainPage, Menu } from "@components";
import { MenuProvider, SectionProvider, WebSettingsProvider } from "@contexts";
import { MenuItemsProvider } from "./contexts/MenuItemsContext";

export function App() {

  return (
    <>
      <WebSettingsProvider>
        <MenuProvider>
          <MenuItemsProvider>
            <SectionProvider>
              <Menu />
              <MainPage />
            </SectionProvider>
          </MenuItemsProvider>
        </MenuProvider>
      </WebSettingsProvider>
    </>
  )
}