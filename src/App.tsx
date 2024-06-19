import { MainPage, Menu } from "@components";
import { MenuProvider, WebSettingsProvider } from "@contexts";

export function App() {

  return (
    <>
      <WebSettingsProvider>
        <MenuProvider>
          <Menu />
          <MainPage />
        </MenuProvider>
      </WebSettingsProvider>
    </>
  )
}