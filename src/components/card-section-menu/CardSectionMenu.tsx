import { useSectionContext, useWebSettingsContext } from '@contexts';
import { HTMLAttributes } from 'react';
import styles from './CardSectionMenu.module.css'

interface ICardMenuType extends HTMLAttributes<HTMLDivElement> {
  sectionId: number;
  name: string;
  image: string;
}


export function CardSectionMenu({ sectionId, name, image, ...props }: ICardMenuType) {

  const { navBackgroundColour } = useWebSettingsContext();
  const { sectionSelected } = useSectionContext();

  function getSelectedSection(): boolean {
    return sectionId === sectionSelected?.id && name === sectionSelected?.name
  }

  return (
    <div
      style={{
        paddingBottom: !(sectionId === sectionSelected?.id && name === sectionSelected?.name) ? '2px' : undefined // clear extra space created by borderBottom on active section item
      }}
      className={`${styles.cursorPointer} ${styles.sectionContainer}`} {...props}
    >
      <div
        style={{
          border: getSelectedSection() ? `2px solid ${navBackgroundColour}` : undefined,
          borderRadius: '50px',
        }}
        className={styles.sectionImage}>
        <img src={image} alt="Image to represent menu's option" />
      </div>

      <div
        style={{
          fontWeight: (sectionId === sectionSelected?.id && name === sectionSelected?.name) ? 600 : undefined
        }}
        className={styles.sectionName}
      >
        <p className={styles.sectionNameText}>{name}</p>
      </div>

      {
        getSelectedSection() &&
        (
          <div className={styles.selectedBorderBottomSection} />
        )
      }
    </div>
  )

}