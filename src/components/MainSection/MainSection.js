import React, { useState, useEffect } from "react";
import styles from "./MainSection.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import rightArrow from "../../assets/MainPage/MainSectionRightArrow.svg";
import leftArrow from "../../assets/MainPage/MainSectionLeftArrow.svg";
import image1 from "../../assets/MainPage/MainSectionImage1.svg";
import image2 from "../../assets/MainPage/MainSectionImage2.png";
import image3 from "../../assets/MainPage/MainSectionImage3.svg";
import axios from "axios";

const screens = (character) => [
  {
    id: 0,
    component: (
      <div className={styles.screen}>
        {/* <div className={styles.searchBar}>
          <input type="text" placeholder="가고싶은 팝업을 검색해보세요!" />
          <button className={styles.searchButton}>
            <AiOutlineSearch />
          </button>
        </div> */}
        <img src={image1} alt="Main" className={styles.image1} />
        <img src={character} alt="Character" className={styles.character} />
      </div>
    ),
  },
  {
    id: 1,
    component: (
      <div className={styles.screen}>
        <img src={image2} alt="Main" className={styles.image2} />
      </div>
    ),
  },
  {
    id: 2,
    component: (
      <div className={styles.screen}>
        <img src={image3} alt="Main" className={styles.image3} />
      </div>
    ),
  },
];

const MainSection = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [character, setCharacter] = useState(null);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    // API 요청을 통해 이미지 URL 가져오기
    const fetchCharacterImage = async () => {
      try {
        const response = await axios.get(`${serverURL}/preferences/character`, {
          withCredentials: true,
        });
        setCharacter(response.data); // 받은 이미지 URL을 상태에 저장
        console.log("취향 테스트 캐릭터 이미지", response.data);
      } catch (error) {
        console.error("Error fetching character image:", error);
      }
    };

    fetchCharacterImage();
  }, []);

  const handleScrollLeft = () => {
    setCurrentScreen((prevScreen) => (prevScreen === 1 ? -1 : prevScreen + 1));
  };

  const handleScrollRight = () => {
    setCurrentScreen((prevScreen) => (prevScreen === -1 ? 1 : prevScreen - 1));
  };

  return (
    <div className={styles.mainSection}>
      {/* 왼쪽 화살표 */}
      <div
        className={`${styles.arrowContainer} ${styles.left}`}
        onClick={handleScrollLeft}
      >
        <img src={leftArrow} alt="Left Arrow" className={styles.arrow} />
      </div>

      {/* 오른쪽 화살표 */}
      <div
        className={`${styles.arrowContainer} ${styles.right}`}
        onClick={handleScrollRight}
      >
        <img src={rightArrow} alt="Right Arrow" className={styles.arrow} />
      </div>

      {/* 현재 화면을 슬라이드 방식으로 보여주기 */}
      <div
        className={styles.slider}
        style={{
          transform: `translateX(${currentScreen * 100}vw)`,
        }}
      >
        {screens(character).map((screen, index) => (
          <div className={styles.screenContainer} key={index}>
            {screen.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
