import React from "react";
import styles from "./PopupTasteTestSection.module.css";
import character from "../../assets/MainPage/PopupTasteTestSection/character.svg";
import button from "../../assets/MainPage/PopupTasteTestSection/button.svg";
import bottomImage from "../../assets/MainPage/PopupTasteTestSection/bottomImage.svg";

const PopupTasteTestSection = () => {
  return (
    <div className={styles.PopupTasteTestSection}>
      <div>
        <p className={styles.text1}>나의 팝업스토어 관람 유형은 뭘까?</p>
        <p className={styles.text2}>팝업 취향 테스트</p>
        <p className={styles.text3}>아이스크림 캐릭터를 만나보자!</p>
      </div>
      <img src={character} alt="" className={styles.character} />
      <img src={button} alt="" className={styles.button} />
      <img src={bottomImage} alt="" className={styles.bottomImage} />
    </div>
  );
};

export default PopupTasteTestSection;
