import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BookmarkPopupSection.module.css";
import Calendar from "react-calendar";
import "./CalendarCustom.css";
import calendarImage from "../../assets/calendarImage.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import leftButton from "../../assets/leftButton.svg";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import noBookmark from "../../assets/mainPageImage5.svg";

const BookmarkPopupSection = () => {
  const [date, setDate] = useState(new Date());
  const [swiper, setSwiper] = useState();
  const [popupData, setPopupData] = useState([]); // 데이터를 저장할 상태

  const serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/bookmarks/popups?userId=64dcc0e7f001b623d8a71ba2`
        );
        // 받아온 데이터를 날짜별로 분류
        const sortedData = sortDataByDate(response.data);
        setPopupData(sortedData);
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    fetchPopupData(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  // 날짜별로 팝업 데이터 분류하는 함수
  const sortDataByDate = (data) => {
    const sorted = {};

    data.forEach((popup) => {
      const startDate = new Date(popup.dateRange.start);
      const endDate = new Date(popup.dateRange.end);

      // 날짜 범위 내의 모든 날짜를 추출하여 sorted 객체에 추가
      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateString = date.toISOString().split("T")[0];
        if (!sorted[dateString]) {
          sorted[dateString] = [];
        }
        sorted[dateString].push(popup);
      }
    });

    return sorted;
  };

  // 날짜에 맞는 팝업 데이터를 필터링하는 함수
  const getPopupsForDate = (dateString) => {
    return popupData.filter((popup) => {
      const startDate = new Date(popup.dateRange.start);
      const endDate = new Date(popup.dateRange.end);
      const currentDate = new Date(dateString);

      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  // 선택한 날짜에 따른 팝업 개수 계산
  const tileClassName = ({ date, view }) => {
    const dateString = date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\.\s*/g, "-")
      .slice(0, -1);

    if (popupData[dateString]) {
      const popupCount = popupData[dateString].length;
      if (popupCount === 1) {
        return "single-popup";
      } else if (popupCount === 2) {
        return "double-popup";
      } else if (popupCount >= 3) {
        return "multiple-popup";
      }
    }
    return null;
  };

  const selectedDateString = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\.\s*/g, "-")
    .slice(0, -1);

  const selectedPopups = popupData[selectedDateString] || [];

  if (!popupData || popupData.length === 0) {
    return (
      <div>
        <img src={noBookmark} alt="" className={styles.noBookmark} />
      </div>
    );
  }

  return (
    <div className={styles.BookmarkPopupSection}>
      <div className={styles.title}>
        내가 북마크한 팝업을 한눈에! <br />
        <span className={styles.boldText}>‘oo’의 팝업 일정</span>
      </div>
      <div className={styles.button}>북마크 관리</div>

      {/* 이미지가 캘린더 헤더 위에 배치됨 */}
      <div className={styles.calendarWrapper}>
        <img
          src={calendarImage}
          alt="Calendar Decoration"
          className={styles.calendarImage}
        />
        <Calendar
          className={styles.calendar}
          onChange={setDate}
          value={date}
          locale="en"
          next2Label={null}
          prev2Label={null}
          tileClassName={tileClassName}
        />
      </div>

      <div className={styles.popupList}>
        {selectedPopups.length > 0 ? (
          <>
            <AiOutlineLeft
              onClick={() => swiper.slidePrev()}
              className={styles.leftButton}
            />
            <Swiper
              modules={[Navigation]}
              breakpoints={{
                1: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              onSwiper={(e) => {
                setSwiper(e);
              }}
              speed={500}
              loop={true}
            >
              {selectedPopups.map((popup, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.popupItem}>
                    <div className={styles.popupIndicator}></div>
                    <p className={styles.popupName}>{popup.name}</p>
                    <p className={styles.popupDate}>
                      {new Date(popup.dateRange.start).toLocaleDateString(
                        "ko-KR",
                        {
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}{" "}
                      ~
                      {new Date(popup.dateRange.end).toLocaleDateString(
                        "ko-KR",
                        {
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <AiOutlineRight
              onClick={() => swiper.slideNext()}
              className={styles.rightButton}
            />
          </>
        ) : (
          <div className={styles.noPopup}>선택한 날짜에 팝업이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPopupSection;
