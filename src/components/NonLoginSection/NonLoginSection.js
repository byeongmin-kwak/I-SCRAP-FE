import React from "react";
import styles from "./NonLoginSection.module.css";
import nonLoginImage1 from "../../assets/mainPageImage6.svg";
import nonLoginImage2 from "../../assets/mainPageImage7.svg";
import nonLoginImage3 from "../../assets/mainPageImage8.svg";

const NonLoginSection = () => {
  return (
    <div className={styles.nonLoginSection}>
      <div className={styles.headerText}>
        로그인을 한다면 <br /> 이런 기능을 쓸 수 있어요!
      </div>
      <div className={styles.featuresContainer}>
        <div className={styles.section}>
          <div className={styles.imageContainer}>
            <img src={nonLoginImage1} alt="" />
          </div>
          <div className={styles.textContainer}>
            당신이 다녀온 팝업을 기반으로 <br />
            <span className={styles.boldText}>
              1. 당신에게 꼭 맞는 팝업을 추천해줘요
            </span>
            <br /> <br /> <br /> 다음에 무슨 팝업을 갈까 고민을 하지
            <br /> 않아도 저희 크래핑이 알려드려요!
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.imageContainer}>
            <img src={nonLoginImage2} alt="" />
          </div>
          <div className={styles.textContainer}>
            당신이 북마크했던 <br />
            <span className={styles.boldText}>
              2. 가고 싶었던 팝업을 잊지 않게 해줘요
            </span>
            <br /> <br /> <br /> 가고 싶었지만 일정 관리를 못해
            <br /> 가지 못한 경험들 이제 저희가 지워드릴게요!
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.imageContainer}>
            <img src={nonLoginImage3} alt="" />
          </div>
          <div className={styles.textContainer}>
            당신이 팝업에서 기록한 기억들이 <br />
            <span className={styles.boldText}>
              3. 잊히지 않게 한 번에 보여줘요
            </span>
            <br /> <br /> <br /> 팝업을 경험하면서 좋았던 기억들
            <br />또 다른 기억들을 추억할 수 있게 다시 보여드릴게요!
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonLoginSection;
