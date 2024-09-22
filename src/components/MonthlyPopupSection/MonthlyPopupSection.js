import React, { useState } from "react";
import styles from "./MonthlyPopupSection.module.css";
import topImage from "../../assets/mainPageImage2.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const dummyData = [
  {
    id: 1,
    imgSrc:
      "https://www.walkerhillstory.com/wp-content/uploads/2020/09/2-1.jpg",
    title: "Card 1",
  },
  { id: 2, imgSrc: "", title: "Card 2" },
  { id: 3, imgSrc: "", title: "Card 3" },
  { id: 4, imgSrc: "", title: "Card 4" },
  { id: 5, imgSrc: "", title: "Card 5" },
  { id: 6, imgSrc: "", title: "Card 6" },
  { id: 7, imgSrc: "", title: "Card 7" },
  { id: 8, imgSrc: "", title: "Card 8" },
  { id: 9, imgSrc: "", title: "Card 9" },
  { id: 10, imgSrc: "", title: "Card 10" },
];
const currentMonth = new Date().getMonth() + 1;

const MonthlyPopupSection = () => {
  const [swiper, setSwiper] = useState();

  return (
    <div className={styles.monthlyPopupSection}>
      <img src={topImage} alt="topImage" className={styles.topImage} />
      <div className={styles.mainContainer}>
        <div className={styles.textOverlay}>{currentMonth}월의 팝업</div>
        <div className={styles.swiper}>
          <Swiper
            modules={[Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
              1920: {
                slidesPerView: 6,
                spaceBetween: 50,
              },
            }}
            onSwiper={(e) => {
              setSwiper(e);
            }}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={6000}
          >
            {dummyData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={styles.card}>
                  <img src={item.imgSrc} alt={item.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPopupSection;
