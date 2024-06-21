import styles from './DesktopMenu.module.css';
import { useMenuContext, useWebSettingsContext } from '@contexts';

interface IToggleMenu {
  menus: string[];
}

export function DesktopMenu({ menus }: IToggleMenu) {
  const { backgroundColour } = useWebSettingsContext();
  const { menuItemSelected, setMenuItemSelected } = useMenuContext();

  function menuToBeSelected (item: string) {
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
      return  `5px solid ${backgroundColour}`;
    } else if (item === 'ENTRAR' && menuItemSelected === 'ENTRAR') {
      return  `5px solid ${backgroundColour}`;
    } else if (item === 'CONTATO' && menuItemSelected === 'CONTATO') {
      return  `5px solid ${backgroundColour}`;
    } else {
      return '';
    }
  }

  function clearHeightCreatedByBorderBottomWhenMenuItemSelected(item: string): string {
    if (item === 'MENU' && menuItemSelected === 'MENU') {
      return  '5px';
    } else if (item === 'ENTRAR' && menuItemSelected === 'ENTRAR') {
      return  '5px';
    } else if (item === 'CONTATO' && menuItemSelected === 'CONTATO') {
      return  '5px';
    } else {
      return '';
    }
  }

  return (
    <ul className={styles.desktopMenu}>
      {menus.map((item, index) => (
        <div key={index}
          style={{
            borderBottom: menuSelectedBorderStyle(item),
            marginTop: clearHeightCreatedByBorderBottomWhenMenuItemSelected(item)
          }}
          className={styles.desktopMenuItem}>
          <li key={index} onClick={() => menuToBeSelected(item)}>
            {item}
          </li>
        </div>
      ))}
    </ul>
  );
};
