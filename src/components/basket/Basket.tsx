import { useBasketContext } from "@contexts";
import styles from './Basket.module.css'
import { BasketItemContainer } from "./basket-item-container/BasketItemContainer";
import { useEffect, useState } from "react";

interface IBasket {
  isDialog?: boolean;
}

export function Basket({ isDialog = false }: IBasket) {
  const { itemsOfBasket } = useBasketContext();

  const [isEmptyBasket, setIsEmptyBasket] = useState(itemsOfBasket.length === 0);

  function calculateTotalValue() {
    const totalValue = itemsOfBasket.reduce((accumulator, item) => {
      if (item.price) {
        return accumulator + item.price;
      }
      return accumulator;
    }, 0);

    return totalValue.toFixed(2).replace('.', ',');
  }

  // get unique items on the list, and returning a new list
  const seenIds = new Set();
  const uniqueItems = itemsOfBasket.filter(item => {
    if (seenIds.has(item.id)) {
      return false;
    } else {
      seenIds.add(item.id);
      return true;
    }
  });

  useEffect(() => {
    if (itemsOfBasket.length === 0) {
      setIsEmptyBasket(true)
    } else {
      setIsEmptyBasket(false)
    }
    return () => {
      setIsEmptyBasket(false)
    }
  }, [itemsOfBasket])

  return (
    <div className={ isDialog ? styles.basketContainerDialog : styles.basketContainer}>
      <div className={isDialog ? styles.basketHeaderDialog : styles.basketHeader}>Carrinho</div>
      {isEmptyBasket ?
        <div className={styles.emptyBasket}> Seu carrinho está vazio </div> 
        :
        <div>
          <div className={styles.basketItems}>
            {uniqueItems.map((item) => {
              return <BasketItemContainer key={item.id} id={item.id} fatherId={item.fatherId} name={item.name} fatherName={item.fatherName} price={item.price} />
            })}
          </div>

          <div className={isDialog ? styles.totalsDialog : styles.totals}>
            <div className={styles.subTotal}>
              <div className={styles.subTotalText}>Sub total</div>
              <div className={styles.subTotalValue}>{`R$${calculateTotalValue()}`}</div>
            </div>
            <div className={styles.divisor} />
            <div className={styles.totalFinal}>
              <div className={styles.totalFinalText}>Total: </div>
              <div className={styles.totalFinalValue}>{`R$${calculateTotalValue()}`}</div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}