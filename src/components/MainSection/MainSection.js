import React, { useState, useEffect } from "react";
import styles from "./MainSection.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import rightArrow from "../../assets/MainPage/MainSectionRightArrow.svg";
import leftArrow from "../../assets/MainPage/MainSectionLeftArrow.svg";
import image1 from "../../assets/MainPage/MainSectionImage1.svg";
import image2 from "../../assets/MainPage/MainSectionImage2.png";
import image3 from "../../assets/MainPage/MainSectionImage3.svg";
import axios from "axios";

const screens = (character, isCharacterLoaded) => [
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
        {isCharacterLoaded ? (
          <img src={character} alt="Character" className={styles.character} />
        ) : (
          <div className={styles.loading}></div> // 로딩 표시
        )}
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
  const [character, setCharacter] = useState(
    "https://iscrap-image.s3.ap-northeast-2.amazonaws.com/icecreamCharacter/vanilla.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQMEY6GDSFD55X2WN%2F20241003%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20241003T052305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aDmFwLW5vcnRoZWFzdC0yIkcwRQIgWZQoHZnQ%2Bv5AJyoNHmGtTEk%2Bxm8bR4H00Q2MTgU5dR8CIQD6nXjw70SMDBrckfDu9h2u1CMeC6dYTR73cnY1HmdhJCqAAwi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDAyNjA5MDU0OTQ3NiIMYX366pkdctUDHpZWKtQC6%2F9WJnwKDV7vnD1JE3tUuH3gyXBilaw7NEVhwJdcYZbejeierTpQ%2B83rysj1vThXjJUHdEItDGjL%2FxUMfw0cH%2B1Cu%2BsmJ91%2F8YUua%2F4i0OfWRhA0%2FXHmDJdFMMKe50FUPWvCh3lF%2BNxvqyolDKb7bzqfUi37LqUqie9ZzoL0LoWz5k7LSE4Z4LPzQ4D0Yq7%2BbVNuxkXku%2Bn4Wj9g5bXWYz7xoe6%2FpoRtbMRF6DkER3RfGCaLXbc97IysBgpAAj%2FRnCEJRT0FC3gKQ2G4VmPDxlllNlYRTiVAgQ6qdlBIj5%2F0S6FuNj2%2FvR0iyHaYRb8LNPw%2FEAYVyHs6B5PiG9FePn%2F18QnAANl%2BqHpeNlcTYZyNWhiw7PgkNFGUw8ZCzf65Vbt4kbpfuHgL7kKdG8mXeehXMe5uMBCvqID2PudJu1afJ2y0Wvp%2F2yIj%2Bs85%2B4pb9OULjDDByvi3BjqeAe7ozedBSkaO9qt%2FiQHVIFTMy6oQiqLAQ7brMBeILYGlLVp2ARzuCJWwPR6Zp%2BScTcziO0odd3hpkJ3t6zRa8JSpdZgWJoMQTqRiRT9qoR%2BAUu1YxyPTT9YzSKNvZksYyGuJO7mIYQTMF2ISUiOdunAgfFOGt%2FL7H9V2lrrot%2FtjA62PGMpwr1AcGK9xLd%2BEmqjRvowmQavMA%2BWzucOp&X-Amz-Signature=28830b4751069007e9cde104c1c8d6beb8d4e114c94e7cb2ffe0f13d4aa7cca3&X-Amz-SignedHeaders=host&x-id=GetObject"
  );
  const [isCharacterLoaded, setIsCharacterLoaded] = useState(false); // 로딩 상태 추가

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

  // 이미지 로드 완료 시 호출
  const handleImageLoad = () => {
    setIsCharacterLoaded(true);
  };

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
        {screens(character, isCharacterLoaded).map((screen, index) => (
          <div className={styles.screenContainer} key={index}>
            {screen.component}
          </div>
        ))}
      </div>

      {/* 이미지가 로드되면 handleImageLoad 호출 */}
      {character && (
        <img
          src={character}
          alt="Character"
          style={{ display: "none" }} // 실제로 이미지를 다시 렌더링할 필요 없으므로 보이지 않게 설정
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
};

export default MainSection;
