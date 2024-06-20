import { HTMLAttributes, useEffect, useState } from "react";
import styles from './ListItem.module.css'
import arrow from '@assets/Arrow.svg';
import { useSectionContext } from "@contexts";


interface IItems {
  id: number;
  name: string;
  description: string;
  images: [{ id: number, image: string }];
  price: number;
}

interface IListItem extends HTMLAttributes<HTMLDivElement> {
  header: string;
  items: IItems[]
}

export function ListItem({ header, items }: IListItem) {

  const { sectionSelected, setSectionSelected } = useSectionContext();
  const [isOpenList, setIsOpenList] = useState(true);

  useEffect(() => {
    if(sectionSelected === undefined) {
      return undefined;
    }

    if (sectionSelected?.name === header) {
      setIsOpenList(true)
    } else {
      setIsOpenList(false)
    }
  
  }, [sectionSelected])
  

  function formatItemPriceToStringToShow(item: IItems): string | number {
    let newItemPriceToShow: string = '';

    if (item.id === 1625704 && item.name === 'Nutella') {
      newItemPriceToShow = item.price.toString().replace('.', ',');
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
          <img src={arrow} className={isOpenList ? undefined : styles.invertVertical } alt="Arrow icon to open and close submenu options" />
        </div>
      </div>

      {isOpenList &&
        <div className={styles.informationListContainer}>
          {items.map((item) => {
            return (
              <div className={styles.listContainer} key={item.id}>
                <div
                  className={
                    Array.isArray(item.images) && item.images !== null ?
                      `${styles.information} ${styles.justifyContentSpaceBetween}` :
                      `${styles.information} ${styles.justifyContentInitial}`
                  }
                >
                  {item.name &&
                    <div className={styles.informationName}>
                      {item.name}
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

    </div>
  )
}