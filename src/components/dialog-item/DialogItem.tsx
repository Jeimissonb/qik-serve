import { IItems } from '@models';
import styles from './DialogItem.module.css';
import close from '@assets/Close.svg';
import { useEffect, useState } from 'react';
import subtraction from '@assets/Subtraction.svg';
import sum from '@assets/Union.svg';
import { useBasketContext } from '@/contexts';

interface IDialogItemProps {
  isOpen: boolean;
  onClose: () => void;
  item: IItems | undefined;
}

interface ISelectedModifiers {
  [modifierId: string]: IItems | undefined;
}

export function DialogItem({ isOpen, onClose, item }: IDialogItemProps) {
  const { setItemsOfBasket } = useBasketContext();

  const [selectedModifiers, setSelectedModifiers] = useState<ISelectedModifiers>({});
  const [countItemsToBasket, setCountItemsToBasket] = useState<number>(0);

  const handleCheckboxChange = (modifierId: number, modItem: IItems) => {
    setSelectedModifiers((prev) => ({
      ...prev,
      [modifierId]: prev[modifierId]?.id === modItem.id ? undefined : modItem, // Toggle the selection
    }));
  };

  const incrementItemsToBasket = () => setCountItemsToBasket((prev) => prev + 1);
  const decrementItemsToBasket = () => setCountItemsToBasket((prev) => (prev > 0 ? prev - 1 : 0));

  const addItemToBasket = () => {
    if (item?.price && countItemsToBasket > 0) {
      for (let i = 0; i < countItemsToBasket; i++) {
        setItemsOfBasket((prev) => [...prev, item]);
      }
      return;
    }

    const selectedModifiersValues = Object.values(selectedModifiers).filter(Boolean) as IItems[];
    if (selectedModifiersValues.length && countItemsToBasket > 0) {
      const selectedItem = selectedModifiersValues[0];
      selectedItem.fatherId = item?.id;
      selectedItem.fatherName = item?.name;
      for (let i = 0; i < countItemsToBasket; i++) {
        setItemsOfBasket((prev) => [...prev, selectedItem]);
      }
    }
  };

  if (!isOpen) return null;

  const renderModifiers = () => {
    return item?.modifiers?.map((mod) => (
      <div key={mod.id}>
        <div className={`${styles.modifierNameContainer} ${styles.modifierNameContainerBgColor}`}>
          <p className={styles.modifierName}>{mod.name}</p>
          <p className={styles.modifierNameDescription}>Select {mod.maxChoices} option</p>
        </div>
        {mod.items.map((modItem) => (
          <div className={styles.modifierItemContainer} key={modItem.id}>
            <div>
              <p className={styles.modifierItemName}>{modItem.name}</p>
              <p className={styles.modifierItemPrice}>R${modItem.price},00</p>
            </div>
            <div>
              <input
                type='checkbox'
                className={styles.checkbox}
                checked={selectedModifiers[mod.id]?.id === modItem.id}
                onChange={() => handleCheckboxChange(mod.id, modItem)}
              />
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={item?.images ? `${styles.modal} ${styles.modalHeightWithImage}` : `${styles.modal} ${styles.modalHeightWithoutImage}`} onClick={(e) => e.stopPropagation()}>
        <div className={item?.images ? `${styles.modalHeader} ${styles.heightWithImage}` : styles.modalHeader}>
          {item?.images && <div>{item.images.map((img) => <img key={img.id} src={img.image} alt="Product" />)}</div>}
          <button className={styles.closeButton} onClick={onClose}>
            <img src={close} alt="Close" />
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.modalContentTitle}>{item?.name}</p>
          <p className={styles.modalContentDescription}>{item?.description}</p>
        </div>
        {item?.modifiers && <div>{renderModifiers()}</div>}
        <div className={styles.buttonsDiv}>
          <div className={styles.minusAndMoreButtons}>
            <button className={styles.subtractionButton} disabled={countItemsToBasket === 0} onClick={decrementItemsToBasket}>
              <img src={subtraction} alt="Remove" />
            </button>
            <div className={styles.quantityId}>{countItemsToBasket}</div>
            <button
              className={styles.sumButton}
              disabled={!(selectedModifiers && Object.values(selectedModifiers).filter(Boolean).length > 0) && item?.price === 0}
              onClick={incrementItemsToBasket}
            >
              <img src={sum} alt="Add" />
            </button>
          </div>
          <button className={styles.addToTheCartButton} disabled={countItemsToBasket === 0} onClick={addItemToBasket}>
            Add to order • R$
            {(Object.values(selectedModifiers).filter(Boolean)[0]?.price ?? item?.price ?? 0) * countItemsToBasket},00
          </button>
        </div>
      </div>
    </div>
  );
}