import { useEffect } from 'react';
import { ToggleMenu } from './toggle-menu/ToggleMenu';
import { useWebSettingsContext } from '@contexts';
import styles from './Menu.module.css'

interface IVenue {
  id: number;
  name: string;
  description: string;
  webSettings: {
    navBackgroundColour: string,
    backgroundColour: string,
    bannerImage: string
  }
}

const menuItems = ['MENU', 'ENTRAR', 'CONTATO'];

export function Menu() {
  const { bannerImage, setBannerImage, setBackgroundColour, setNavBackgroundColour } = useWebSettingsContext();

  useEffect(() => {
    // Fetch data from API provided
    const fetchVenue = async () => {

      // Try and catch abstracted bellow
      const response = fetch('/api/challenge/venue/9').then(response => response.json()).catch((error) => { console.error(error) });

      //Add configurations loaded from request to context (similar to redux), but not centralized
      if (response) {
        response.then((data: IVenue) => {
          setBackgroundColour(data.webSettings.backgroundColour)
          setBannerImage(data.webSettings.bannerImage)
          setNavBackgroundColour(data.webSettings.navBackgroundColour)
        })
      }
    };

    fetchVenue();
  }, []);

  return (
    <div
      className={styles.menuContainer}
    >
      <ToggleMenu menus={menuItems} />

      <div className={styles.bannerImage}>
        <img src={bannerImage} alt="Banner image representing a burger" />
      </div>
    </div>
  )
}