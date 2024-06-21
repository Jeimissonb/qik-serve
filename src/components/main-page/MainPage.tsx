import search from '@assets/Search.svg';
import styles from './MainPage.module.css'
import { Basket, BasketDialog, CardSectionMenu, ListItem, SearchInput } from '@components';
import { useEffect, useState } from 'react';
import { IMenu } from '@models';
import { useBasketContext, useMenuContext, useMenuItemsContext, useSectionContext, useWebSettingsContext } from '@contexts';

export function MainPage() {

  const { menu, setMenu } = useMenuItemsContext();
  const { menuItemSelected } = useMenuContext();
  const { setSectionSelected } = useSectionContext();
  const { backgroundColour } = useWebSettingsContext();
  const { countElements } = useBasketContext();
  const [modalOpen, setModalOpen] = useState(false);

  const [searchFilter, setSearchFilter] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  function openModal() {
    setModalOpen(true);
  };

  function closeModal() {
    setModalOpen(false);
  };

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

  useEffect(() => {
    if (searchFilter) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }

    return () => {
      setIsFiltering(false);
    }
  }, [searchFilter])


  function selectSection(id: number, name: 'Burgers' | 'Drinks' | 'Desserts') {
    setSectionSelected({ id, name })
  }

  function filterItems(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchFilter(event.target.value);
  }

  return (
    <>
      {menuItemSelected === 'MENU' &&
        <div className={styles.container}>
          <div
            className={styles.searchContainer}
          >
            <SearchInput icon={search} placeholder="Search menu items" onChange={filterItems} />
          </div>

          <div className={styles.itemsContainer}>
            <div className={styles.itemsContent} style={{ background: `${backgroundColour}` }}>
              <div className={styles.sectionsMain}>
                {menu?.sections.map((section) => {
                  return (
                    <CardSectionMenu
                      sectionId={section.id}
                      key={section.id}
                      name={section.name}
                      image={section.images[0].image}
                      onClick={() => selectSection(section.id, section.name as 'Burgers' | 'Drinks' | 'Desserts')}
                    />
                  )
                })}
              </div>

              <div className={styles.listItemsContainer}>
                {menu?.sections.map((section) => {
                  const filterText = searchFilter.toLowerCase();
                  const filteredItems = section.items.filter(item =>
                    item.name?.toLowerCase().includes(filterText)
                  );
                  return (
                    <ListItem key={section.id} header={section.name} items={filteredItems} isFiltering={isFiltering} />
                  )
                })}
              </div>

              <div className={styles.allergInfoContainer}>
                <div className={styles.allergInfo}> View allergy information </div>
              </div>

              <div className={styles.basketInfoContainer}>
                {countElements() > 0 &&
                  <div className={styles.basketInfo} onClick={openModal}> {`Your basket • ${countElements()} item`}</div>
                }
              </div>
            </div>

            <div className={styles.basketListContainer}>
              <Basket />
            </div>
          </div>
        </div>
      }
      <BasketDialog isOpen={modalOpen} onClose={closeModal} />
    </>

  )
}