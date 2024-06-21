import { HTMLAttributes, useEffect, useState } from "react";
import styles from './ListItem.module.css'
import arrow from '@assets/Arrow.svg';
import { useBasketContext, useSectionContext } from "@contexts";
import { DialogItem } from "@components";
import { IItems } from "@models";

interface IListItem extends HTMLAttributes<HTMLDivElement> {
  header: string;
  items: IItems[];
  isFiltering: boolean
}

export function ListItem({ header, items, isFiltering = false }: IListItem) {

  const { sectionSelected, setSectionSelected } = useSectionContext();
  const { itemsOfBasket } = useBasketContext();

  const [isOpenList, setIsOpenList] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItemToShow, setModalItemToShow] = useState<IItems | undefined>();
  
  function addBadgeQuantity(id: number) {
    const badgeNumberOfItems = itemsOfBasket.filter(itemFilter => itemFilter.id === id || itemFilter.fatherId === id).length
    
    return badgeNumberOfItems;
  }

  function openModal(item: IItems) {
    setModalOpen(true);
    setModalItemToShow(item);
  };

  function closeModal() {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isFiltering) {
      setIsOpenList(true);
    }
  }, [isFiltering])


  useEffect(() => {
    if (sectionSelected === undefined) {
      return undefined;
    }

    if (sectionSelected?.name === header) {
      setIsOpenList(true)
    } else {
      setIsOpenList(false)
    }

  }, [sectionSelected])


  function formatItemPriceToStringToShow(item: IItems): string | number | undefined {
    let newItemPriceToShow: string | undefined = '';

    if (item.id === 1625704 && item.name === 'Nutella') {
      newItemPriceToShow = item.price?.toString().replace('.', ',');
    }

    if (newItemPriceToShow !== '') {
      return newItemPriceToShow;
    } else {
      return item.price;
    }
  }

  function toggleOpenList() {
    setIsOpenList(!isOpenList)
    setSectionSelected(undefined);
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <p>{header}</p>
        <div onClick={toggleOpenList}>
          <img src={arrow}
            className={isOpenList ? styles.cursorPointer : `${styles.cursorPointer} ${styles.invertVertical}`}
            alt="Arrow icon to open and close submenu options"
          />
        </div>
      </div>

      {isOpenList &&
        <div className={styles.informationListContainer}>
          {items.map((item) => {

            return (
              <div
                key={item.id}
                className={`${styles.cursorPointer} ${styles.listContainer}`}
                onClick={() => openModal(item)}
              >
                <div
                  className={
                    Array.isArray(item.images) && item.images !== null ?
                      `${styles.information} ${styles.justifyContentSpaceBetweenAndHeight}` :
                      `${styles.information} ${styles.justifyContentInitial}`
                  }
                >
                  {item.name &&
                    <div className={styles.informationName}>
                      {addBadgeQuantity(item.id) > 0 && <div className={styles.badgeQuantity}>{addBadgeQuantity(item.id)}</div>}
                      <div>{item.name}</div>

                    </div>
                  }
                  {item.description &&
                    <div className={styles.informationDescription}>
                      {item.description}
                    </div>
                  }
                  {(item.price || item.price === 0) &&
                    <div className={styles.informationPrice}>
                      {`R$${formatItemPriceToStringToShow(item)}`}{item.id === 1625704 ? '0' : ',00'}
                    </div>
                  }
                </div>

                {Array.isArray(item.images) && item.images !== null &&
                  <div className={styles.informationImage}>
                    {item.images?.map((img) => {
                      return <img key={img.id} src={img.image} alt="Image of product" />
                    })}
                  </div>
                }

              </div>
            )
          })}
        </div>
      }

      <DialogItem
        isOpen={modalOpen}
        onClose={closeModal}
        item={modalItemToShow}
      />
    </div>
  )
}