import search from '@assets/Search.svg';
import styles from './MainPage.module.css'
import { SearchInput } from '@components';
import { useEffect, useState } from 'react';

export function MainPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={
          isMobile ?
            `${styles.searchContainer} ${styles.paddingSearchContainerMobile}`
            : `${styles.searchContainer} ${styles.paddingSearchContainer}`
        }
      >
        <SearchInput icon={search} placeholder="Search menu items" />
      </div>
    </div>
  )
}