import { useEffect, useState } from "react";
import { useMenuContext, useWebSettingsContext } from "@contexts";
import styles from './MobileMenu.module.css';
import hamburger from '@assets/Hamburger.svg';
import backIcon from '@assets/Path.svg';

interface IToggleMenu {
  menus: string[];
}

export function MobileMenu({ menus }: IToggleMenu) {
  const { backgroundColour } = useWebSettingsContext();
  const { menuItemSelected, setMenuItemSelected } = useMenuContext();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (menuItemSelected){
      setIsOpen(false)
    }
    
    return () => setIsOpen(false)
  }, [menuItemSelected])

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function menuToBeSelected(item: string) {
    if (item === 'MENU') {
      setMenuItemSelected('MENU')
    } else if (item === 'ENTRAR') {
      setMenuItemSelected('ENTRAR')
    } else {
      setMenuItemSelected('CONTATO')
    }
  }

  function menuSelectedBorderStyle(item: string): string {
    if (item === 'MENU' && menuItemSelected === 'MENU') {
      return `5px solid ${backgroundColour}`;
    } else if (item === 'ENTRAR' && menuItemSelected === 'ENTRAR') {
      return `5px solid ${backgroundColour}`;
    } else if (item === 'CONTATO' && menuItemSelected === 'CONTATO') {
      return `5px solid ${backgroundColour}`;
    } else {
      return '';
    }
  }

  return (
    <div
      className={
        isOpen ? `${styles.toggledMenu} ${styles.alignItemsTop}`
          : `${styles.toggledMenu} ${styles.alignItemsCenter}`
      }
    >
      <div className={styles.imageContainer}>
        <img src={backIcon} onClick={toggleMenu} />
      </div>

      {!isOpen && (
        <div className={styles.selectedMenuMobile}>
          {menuItemSelected}
        </div>
      )}

      <div className={styles.toggleMenuContainer}>
        <div className={styles.imageContainer}>
          <img src={hamburger} onClick={toggleMenu} />
        </div>

        {isOpen && (
          <ul className={styles.toggledMenuItems}>
            {menus.map((item, index) => (
              // <li key={index}>{item}</li>
              <div key={index}
                style={{
                  borderBottom: menuSelectedBorderStyle(item)
                }}>

                <li key={index} onClick={() => menuToBeSelected(item)}>
                  {item}
                </li>
              </div>
            ))}

          </ul>
        )}
      </div>
    </div>
  );
}