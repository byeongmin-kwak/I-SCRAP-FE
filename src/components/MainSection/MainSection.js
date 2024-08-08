import React from "react";
import "./MainSection.css";
import mainImage from "../../assets/image.png";
import { AiOutlineSearch } from "react-icons/ai";

const MainSection = () => {
  return (
    <div className="main-section">
      <div className="main-content">
        <p className="main-title">I’ SCRAP</p>
        <p className="main-subtitle">나만의 POPUP을 PICKUP!</p>
        <div className="search-bar">
          <input type="text" placeholder="가고싶은 팝업을 검색해보세요!" />
          <button className="search-button">
            <AiOutlineSearch />
          </button>
        </div>
      </div>
      <img src={mainImage} alt="Main" className="main-image" />
    </div>
  );
};

export default MainSection;
