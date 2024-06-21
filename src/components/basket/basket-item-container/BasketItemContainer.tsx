import { IItems } from '@models';
import styles from './BasketItemContainer.module.css'
import subtraction from '@assets/SubtractionWhite.svg';
import sum from '@assets/Union.svg';
import { useBasketContext } from '@contexts';


export function BasketItemContainer({ id, fatherId, name, fatherName, price }: IItems) {

  const { itemsOfBasket, setItemsOfBasket } = useBasketContext();

  function incrementItemsToBasket() {
    const item: IItems = {
      id: id,
      fatherId: fatherId,
      name: name,
      fatherName: fatherName,
      price: price
    }

    setItemsOfBasket((prev: IItems[]) => [...prev, item])
  }

  function decrementToBasket() {
    setItemsOfBasket((prev: IItems[]) => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev; // Retorna o array original se o item não for encontrado
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }

  function formatItemPriceToStringToShow(id: number, name: string | undefined): string | number | undefined {
    let newItemPriceToShow: string | undefined = '';

    if (id === 1625704 && name === 'Nutella') {
      newItemPriceToShow = price?.toString().replace('.', ',');
    }

    if (newItemPriceToShow !== '') {
      return newItemPriceToShow;
    } else {
      return price;
    }
  }

  function countItemOfBasketById() {
    const count = itemsOfBasket.reduce((accumulator, item) => {
      if (item.id === id) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);

    return count;
  }

  return (
    <div className={styles.basketItemContainer}>
      <div className={styles.basketItemInfoContainer}>
        <div className={styles.basketItemInfo}>
          <div className={styles.basketItemName}>{fatherName ? fatherName : name}</div>
          <div className={styles.basketItemPrice}>
            {`R$${formatItemPriceToStringToShow(id, name)}`}{id === 1625704 ? '0' : ',00'}
          </div>
        </div>

        {fatherName &&
          <div className={styles.basketItemChildName}>
            {fatherName && name}
          </div>
        }

        <div className={styles.buttonsDiv}>
          <div className={styles.minusAndMoreButtons}>
            <button
              className={styles.subtractionButton}
              onClick={decrementToBasket}
            >
              <img src={subtraction} alt="Remove" />
            </button>
            <div className={styles.quantityId}>
              {countItemOfBasketById()}
            </div>
            <button
              className={styles.sumButton}
              onClick={incrementItemsToBasket}
            >
              <img src={sum} alt="Add" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}