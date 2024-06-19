import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu/MobileMenu";
import { DesktopMenu } from "./desktop-menu/DesktopMenu";
import styles from './ToggleMenu.module.css';
import { useWebSettingsContext } from "@contexts";

interface IToggleMenu {
  menus: string[];
}

export function ToggleMenu({ menus }: IToggleMenu) {

  const { navBackgroundColour, backgroundColour } = useWebSettingsContext();
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 393);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <div style={{
      backgroundColor: navBackgroundColour,
      color: backgroundColour,
    }}>
      {isMobile ? (
        <div className={styles.mobileContainer}>
          <div className={styles.mobileMenuContainer}>
            <MobileMenu menus={menus} />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.desktopMenuContainer}>
            <DesktopMenu menus={menus} />
          </div>
        </div>
      )}
    </div>
  );
}