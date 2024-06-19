import { InputHTMLAttributes } from 'react';
import styles from './SearchInput.module.css'

interface IInputWithAdornmentProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: string;
}

export function SearchInput({ icon, placeholder, ...props }: IInputWithAdornmentProps) {

  return (
    <div className={styles.inputWithAdornment}>
      <div className={styles.inputContainer}>
        <div className={styles.inputAdornment}>
          <img src={icon} alt="" />
        </div>
        <input type="text" placeholder={placeholder} {...props}/>
      </div>
    </div>
  );

}