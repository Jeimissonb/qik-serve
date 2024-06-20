import search from '@assets/Search.svg';
import styles from './MainPage.module.css'
import { CardSectionMenu, SearchInput } from '@components';
import { useEffect } from 'react';
import { IMenu } from '@models';
import { useMenuItemsContext, useSectionContext, useWebSettingsContext } from '@contexts';

export function MainPage() {

  const { menu, setMenu } = useMenuItemsContext();
  const { setSectionSelected } = useSectionContext();
  const { backgroundColour } = useWebSettingsContext();

  useEffect(() => {
    // Fetch data from API provided
    const fetchVenue = async () => {

      // Try and catch abstracted bellow
      const response = fetch('/api/challenge/menu').then(response => response.json()).catch((error) => { console.error(error) });

      //Add configurations loaded from request to context (similar to redux), but not centralized
      if (response) {
        response.then((data: IMenu) => {
          setMenu(data);
        })
      }
    };

    fetchVenue();
  }, []);

  function selectSection(id: number, name: string){
    setSectionSelected({id, name})
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.searchContainer}
      >
        <SearchInput icon={search} placeholder="Search menu items" />
      </div>
      
      <div className={styles.itemsContainer}>
        <div className={styles.itemsContent} style={{background: `${backgroundColour}`}}>
          <div className={styles.sectionsMain}>
            {menu?.sections.map((section) => {
              return (
                <CardSectionMenu
                  sectionId={section.id}
                  key={section.id}
                  name={section.name}
                  image={section.images[0].image}
                  onClick={() => selectSection(section.id, section.name)}
                />
              )
            })}
          </div>
        </div>
        <div className={styles.basketListContainer}>
          oi

        </div>
      </div>
    </div>
  )
}