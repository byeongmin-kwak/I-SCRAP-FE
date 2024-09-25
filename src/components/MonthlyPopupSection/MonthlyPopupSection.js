import React, { useState, useEffect } from "react";
import styles from "./MonthlyPopupSection.module.css";
import axios from "axios";
import topImage from "../../assets/mainPageImage2.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const currentMonth = new Date().getMonth() + 1;

const MonthlyPopupSection = () => {
  const [swiper, setSwiper] = useState();
  const [monthlyPopups, setMonthlyPopups] = useState([]);

  useEffect(() => {
    const fetchMonthlyPopups = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/popups/monthly`
        );
        setMonthlyPopups(response.data);
        console.log("monthlyPopups", response.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchMonthlyPopups();
  }, []);

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
            {monthlyPopups.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={styles.card}>
                  <img src={item.poster} alt={item.title} />
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
