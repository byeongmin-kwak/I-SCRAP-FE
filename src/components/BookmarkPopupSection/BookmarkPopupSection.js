import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BookmarkPopupSection.module.css";
import Calendar from "react-calendar";
import calendarImage from "../../assets/calendarImage.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import leftButton from "../../assets/leftButton.svg";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import noBookmark from "../../assets/mainPageImage5.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledCalendar1 = styled(Calendar)`
  .react-calendar {
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    padding: 20px;
    padding-top: 32px;
    background-color: #4ac7cf; /* 흰색 배경 */
  }

  /* 상단의 월과 연도 표시 영역 */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .react-calendar__navigation button {
    color: black;
    min-width: 44px;
    background: none;
    font-size: 16px;
    border: none;
    font-family: "Noto Sans KR Bold", sans-serif;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6f7f9;
    border-radius: 8px;
  }

  .react-calendar__viewContainer {
    background-color: white;
    border-radius: 12px;
  }

  /* 요일 헤더 스타일 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    color: #777777;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday {
    font-family: "Noto Sans KR Medium", sans-serif;
    padding: 10px 0;
  }

  .react-calendar__month-view__days__day {
    font-family: "Noto Sans KR Medium", sans-serif;
  }

  /* 날짜 타일 스타일 */
  .react-calendar__tile {
    padding: 15px 0;
    background: none;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color: #333;
    border: 1px solid transparent;
    transition: background-color 0.3s, color 0.3s;
    position: relative;
  }

  .react-calendar__tile:hover {
    cursor: pointer;
    background-color: rgb(231, 231, 231);
  }
  .react-calendar__tile abbr {
    position: relative;
    z-index: 10 !important;
  }

  /* 기본 날짜 타일 hover 효과 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
  }

  /* 선택된 날짜 스타일 */
  .react-calendar__tile--active {
  }

  .react-calendar__tile--now {
    position: relative;
  }

  .react-calendar__tile--now::before {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid black;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* 비활성화된 날짜 스타일 */
  .react-calendar__tile--disabled {
    color: #d6d6d6 !important;
  }

  /* 주말 날짜 스타일 */
  /* 토요일 날짜 스타일 */
  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: blue; /* 토요일을 파란색으로 */
  }

  /* 일요일 날짜 스타일 */
  .react-calendar__month-view__days__day--weekend:nth-child(7n-6) {
    color: #f44336; /* 일요일은 빨간색 */
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #777777;
  }

  /* 전체 캘린더의 패딩 및 반응형 스타일 */
  @media (max-width: 600px) {
    .react-calendar {
      padding: 10px;
    }

    .react-calendar__tile {
      padding: 10px 0;
    }

    .react-calendar__navigation button {
      font-size: 14px;
    }
  }

  /* 팝업이 1개 있는 날짜 */
  .react-calendar__tile.single-popup::before {
    content: "";
    position: absolute;
    width: 28px; /* 크기 조정 */
    height: 28px;
    border-radius: 50%;
    background-color: #4ac7cf;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }
  .react-calendar__tile.single-popup {
    color: white;
  }
  /* 팝업이 2개 있는 날짜 */
  .react-calendar__tile.double-popup::before {
    content: "";
    position: absolute;
    width: 28px; /* 크기 조정 */
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(0deg, #fedc74 0%, #4ac7cf 100%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .react-calendar__tile.double-popup {
    color: white;
  }

  /* 팝업이 3개 이상 있는 날짜 */
  .react-calendar__tile.multiple-popup::before {
    content: "";
    position: absolute;
    width: 28px; /* 크기 조정 */
    height: 28px;
    border-radius: 50%;
    background: conic-gradient(#eea984 0%, #fedc74 50%, #4ac7cf 100%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .react-calendar__tile.multiple-popup {
    color: white;
  }
`;

const BookmarkPopupSection = () => {
  const [date, setDate] = useState(new Date());
  const [swiper, setSwiper] = useState();
  const [popupData, setPopupData] = useState([]); // 데이터를 저장할 상태
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  const serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await axios.get(`${serverURL}/bookmarks/popups`, {
          withCredentials: true,
        });
        // 받아온 데이터를 날짜별로 분류
        const sortedData = sortDataByDate(response.data.popups);
        console.log("bookmark", response.data);
        setPopupData(sortedData);
        setUsername(response.data.userName);
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    fetchPopupData(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  const handlePopupClick = (id) => {
    navigate(`/popup/${id}`); // 클릭 시 해당 경로로 이동
  };

  const handleButtonClick = () => {
    navigate("/my"); // 클릭 시 해당 경로로 이동
  };

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

  console.log("selectedPopups", selectedPopups);

  const getColorByIndex = (index) => {
    const colors = ["#4ac7cf", "#fedc74", "#eea984", "#8ac926", "#ff595e"]; // 원하는 색상 배열
    return colors[index % colors.length]; // 인덱스를 색상 배열 길이로 나눈 나머지를 이용해 색상 선택
  };

  if (!popupData || Object.keys(popupData).length === 0) {
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
        <span className={styles.boldText}>‘{username}’의 팝업 일정</span>
      </div>

      {/* 이미지가 캘린더 헤더 위에 배치됨 */}
      <div className={styles.calendarWrapper}>
        <div className={styles.button} onClick={handleButtonClick}>
          북마크 관리
        </div>

        <img
          src={calendarImage}
          alt="Calendar Decoration"
          className={styles.calendarImage}
        />
        <StyledCalendar1
          className={styles.calendar}
          onChange={setDate}
          value={date}
          locale="en"
          next2Label={null}
          prev2Label={null}
          tileClassName={tileClassName}
          calendarType="gregory"
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
                  <div
                    className={styles.popupItem}
                    onClick={() => handlePopupClick(popup._id)}
                  >
                    <div
                      className={styles.popupIndicator}
                      style={{
                        backgroundColor: getColorByIndex(index),
                      }}
                    ></div>
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
