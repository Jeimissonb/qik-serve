import styles from './BasketDialog.module.css';
import close from '@assets/Close.svg'
import { Basket } from '../Basket';

interface IBasketDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BasketDialog({ isOpen, onClose }: IBasketDialogProps) {

  if (!isOpen) return null;
  

  return (
    <div className={styles.basketModalOverlay} onClick={onClose}>
      <div className={styles.basketModal}>
        <Basket isDialog={true} />
        <button className={styles.basketModalCloseButton} onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
        <div>
          <br />
        </div>

        <div className={styles.basketModalInfoContainer}>
          <div className={styles.basketModalInfo}> Checkout now</div>
        </div>
      </div>
    </div>
  );
}