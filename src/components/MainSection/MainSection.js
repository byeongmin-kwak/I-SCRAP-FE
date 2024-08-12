import React from "react";
import style from "./MainSection.module.css";
import mainImage from "../../assets/image.png";
import { AiOutlineSearch } from "react-icons/ai";

const MainSection = () => {
  return (
    <div className={style.mainSection}>
      <div className={style.mainContent}>
        <p className={style.mainTitle}>I’ SCRAP</p>
        <p className={style.mainSubtitle}>나만의 POPUP을 PICKUP!</p>
        <div className={style.searchBar}>
          <input type="text" placeholder="가고싶은 팝업을 검색해보세요!" />
          <button className={style.searchButton}>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
      <img src={mainImage} alt="Main" className={style.mainImage} />
    </div>
  );
};

export default MainSection;
