import { Menu } from "@components";
import { MenuProvider, WebSettingsProvider } from "@contexts";

export function App() {

  return (
    <>
      <WebSettingsProvider>
        <MenuProvider>
          <Menu />
        </MenuProvider>
      </WebSettingsProvider>
    </>
  )
}