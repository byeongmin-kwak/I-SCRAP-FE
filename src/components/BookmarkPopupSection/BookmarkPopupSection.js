import React, { useState } from "react";
import styles from "./BookmarkPopupSection.module.css";
import Calendar from "react-calendar";
import "./CalendarCustom.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";

const BookmarkPopupSection = () => {
  const [date, setDate] = useState(new Date());
  const [swiper, setSwiper] = useState();

  const [popupData, setPopupDate] = useState({
    "2024-08-20": ["팝업 1", "팝업 2", "팝업 3", "팝업 4", "팝업 5", "팝업 6"],
    "2024-08-23": ["팝업 1", "팝업 2", "팝업 3"],
  });

  const selectedDateString = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\.\s*/g, "-")
    .slice(0, -1);
  const selectedPopups = popupData[selectedDateString] || [];

  return (
    <div className={styles.BookmarkPopupSection}>
      <div className={styles.title}>
        내가 북마크한 팝업을 한눈에! <br />
        <span className={styles.boldText}>‘oo’의 팝업 일정</span>
      </div>
      <div className={styles.button}>북마크 관리</div>
      <Calendar
        className={styles.calendar}
        onChange={setDate}
        value={date}
        locale="en"
        next2Label={null}
        prev2Label={null}
      />

      <div className={styles.popupList}>
        {selectedPopups.length > 0 ? (
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
            {selectedPopups.map((popup, index) => (
              <SwiperSlide key={index}>
                <div className={styles.popupItem}>{popup}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.noPopup}>선택한 날짜에 팝업이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPopupSection;
