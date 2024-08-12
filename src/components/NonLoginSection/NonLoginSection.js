import React from "react";
import style from "./NonLoginSection.module.css";

const NonLoginSection = () => {
  return (
    <div className={style.nonLoginSection}>
      <div className={style.headerText}>
        로그인을 한다면 <br /> 이런 기능을 쓸 수 있어요!
      </div>
      <div className={style.featuresContainer}>
        <div className={style.imageContainer}>
          <img src="http://via.placeholder.com/500x1000" alt="" />
        </div>
        <div className={style.textContainer}>
          <div>
            당신이 다녀온 팝업을 기반으로 <br />
            <span className={style.boldText}>
              1. 당신에게 꼭 맞는 팝업을 추천해줘요
            </span>
            <br /> <br /> <br /> 다음에 무슨 팝업을 갈까 고민을 하지
            <br /> 않아도 저희 크래핑이 알려드려요!
          </div>
          <div>
            당신이 북마크했던 <br />
            <span className={style.boldText}>
              2. 가고 싶었던 팝업을 잊지 않게 해줘요
            </span>
            <br /> <br /> <br /> 가고 싶었지만 일정 관리를 못해
            <br /> 가지 못한 경험들 이제 저희가 지워드릴게요!
          </div>
          <div>
            당신이 팝업에서 기록한 기억들이 <br />
            <span className={style.boldText}>
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
