import React from "react";
import styles from "./MainSection.module.css";
import mainImage from "../../assets/mainPageImage1.png";
import { AiOutlineSearch } from "react-icons/ai";

const MainSection = () => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.mainContent}>
        <p className={styles.mainTitle}>I’ SCRAP</p>
        <p className={styles.mainSubtitle}>나만의 POPUP을 PICKUP!</p>
        <div className={styles.searchBar}>
          <input type="text" placeholder="가고싶은 팝업을 검색해보세요!" />
          <button className={styles.searchButton}>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
      <img src={mainImage} alt="Main" className={styles.mainImage} />
    </div>
  );
};

export default MainSection;
