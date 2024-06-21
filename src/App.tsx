import { MainPage, Menu } from "@components";
import { BasketProvider, MenuProvider, SectionProvider, WebSettingsProvider, MenuItemsProvider } from "@contexts";

export function App() {

  return (
    <>
      <WebSettingsProvider>
        <MenuProvider>
          <MenuItemsProvider>
            <SectionProvider>
              <BasketProvider>
                <Menu />
                <MainPage />
              </BasketProvider>
            </SectionProvider>
          </MenuItemsProvider>
        </MenuProvider>
      </WebSettingsProvider>
    </>
  )
}