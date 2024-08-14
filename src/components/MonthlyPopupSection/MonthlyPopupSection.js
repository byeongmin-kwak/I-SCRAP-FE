import React, { useState } from "react";
import styles from "./MonthlyPopupSection.module.css";
import topImage from "../../assets/image2.svg";
import image from "../../assets/image3.svg";
import leftButton from "../../assets/leftButton.svg";
import rightButton from "../../assets/rightButton.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const dummyData = [
  { id: 1, imgSrc: "https://via.placeholder.com/150", title: "Card 1" },
  { id: 2, imgSrc: "https://via.placeholder.com/150", title: "Card 2" },
  { id: 3, imgSrc: "https://via.placeholder.com/150", title: "Card 3" },
  { id: 4, imgSrc: "https://via.placeholder.com/150", title: "Card 4" },
  { id: 5, imgSrc: "https://via.placeholder.com/150", title: "Card 5" },
  { id: 6, imgSrc: "https://via.placeholder.com/150", title: "Card 6" },
  { id: 7, imgSrc: "https://via.placeholder.com/150", title: "Card 7" },
  { id: 8, imgSrc: "https://via.placeholder.com/150", title: "Card 8" },
  { id: 9, imgSrc: "https://via.placeholder.com/150", title: "Card 9" },
  { id: 10, imgSrc: "https://via.placeholder.com/150", title: "Card 10" },
];
const currentMonth = new Date().getMonth() + 1;

const MonthlyPopupSection = () => {
  const [swiper, setSwiper] = useState();

  const handlePrev = () => {
    swiper?.slidePrev();
  };

  const handleNext = () => {
    swiper?.slideNext();
  };

  return (
    <div className={styles.monthlyPopupSection}>
      <img src={topImage} alt="topImage" className={styles.topImage} />
      <div className={styles.mainContainer}>
        <div className={styles.leftSection}>
          <div className={styles.imageContainer}>
            <img src={image} alt="image" className={styles.image} />
            <div className={styles.textOverlay}>
              '{currentMonth}월'의 <br></br> &nbsp;팝업
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <button className={styles.arrowBtn} onClick={handlePrev}>
            <img src={leftButton} alt="leftButton" />
          </button>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            onSwiper={(e) => {
              setSwiper(e);
            }}
            autoplay={{
              // 자동 재생
              delay: 4000, // 지연 시간 (한 슬라이더에 머물르는 시간)
              disableOnInteraction: false, // 마우스 제어 이후 자동 재생을 막을지 말지
              loop: true,
            }}
            speed={500} // 슬라이더 넘어가는 속도
          >
            {dummyData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={styles.card}>
                  <img src={item.imgSrc} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className={styles.arrowBtn} onClick={handleNext}>
            <img src={rightButton} alt="rightButton" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPopupSection;
