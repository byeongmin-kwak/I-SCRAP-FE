import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import styles from "./MyPage.module.css";
import axios from "axios";
import styled from "styled-components";
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  eachDayOfInterval,
  differenceInDays,
} from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import calendarImage from "../../assets/calendarImage.svg";

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
  .react-calendar__month-view__days__day--weekend {
    color: #f44336;
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

const MyPage = () => {
  const [date, setDate] = useState(new Date()); // 선택된 날짜 상태
  const [currentStatus, setCurrentStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [weekPopupsLoading, setWeekPopupsLoading] = useState(true);
  const [popups, setPopups] = useState([]);
  const [weekPopups, setWeekPopups] = useState([]);
  const [profileData, setProfileData] = useState(null); // 프로필 데이터를 저장할 상태
  const [popupData, setPopupData] = useState([]); // 데이터를 저장할 상태

  const serverURL = process.env.REACT_APP_SERVER_URL;

  // 사용자 프로필 데이터를 가져오는 함수
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${serverURL}/users/profile`, {
        withCredentials: true,
      });
      setProfileData(response.data); // 받아온 프로필 데이터 상태에 저장
      console.log("profile", response.data);
    } catch (error) {
      console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const fetchPopupData = async () => {
    try {
      const response = await axios.get(`${serverURL}/bookmarks/popups`, {
        withCredentials: true,
      });
      // 받아온 데이터를 날짜별로 분류
      const sortedData = sortDataByDate(response.data.popups);
      console.log("bookmark", response.data);
      setPopupData(sortedData);
    } catch (error) {
      console.error("Error fetching popup data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
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

  const handleStatusChange = (status) => {
    if (currentStatus === status) {
      setCurrentStatus("all"); // 현재 선택된 상태를 다시 클릭하면 "all"로 변경
    } else {
      setCurrentStatus(status);
    }
  };

  return (
    <div className={styles.myPage}>
      {/* 왼쪽 사용자 프로필 섹션 */}
      <div className={styles.profileSection}>
        <div className={styles.profile}>PROFILE</div>
        {profileData ? (
          <>
            <img
              src={profileData.profileImage} // 사용자 프로필 이미지 URL
              alt="User Profile"
              className={styles.profileImage}
            />
            <div className={styles.userInfo}>
              <p>{profileData.name}</p>
              <p>{profileData.email}</p>
            </div>

            <div className={styles.profileStats}>
              <div>
                <div>{profileData.bookmarks.count}</div>
                <p>방문한 팝업</p>
              </div>
              <div>
                <div>{profileData.reviews.count}</div>
                <p>작성한 기록</p>
              </div>
              <div>
                <div>{profileData.reviews.totalLikes}</div>
                <p>받은 좋아요</p>
              </div>
            </div>
          </>
        ) : (
          <div>로딩 중...</div>
        )}
        <div>
          <button className={styles.editButton}>회원정보 수정</button>
          <button className={styles.notificationButton}>팝업 알림 설정</button>
          <button className={styles.logoutButton}>로그아웃</button>
        </div>
      </div>

      {/* 오른쪽 북마크 섹션 */}
      <div className={styles.bookmarkSection}>
        <h2>북마크한 팝업</h2>
        <div className={styles.calendarContainer}>
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
          />
        </div>
        <div className={styles.filterButtons}>
          <button
            className={currentStatus === "ongoing" ? styles.active : ""}
            onClick={() => handleStatusChange("ongoing")}
          >
            진행중
          </button>
          <button
            className={currentStatus === "upcoming" ? styles.active : ""}
            onClick={() => handleStatusChange("upcoming")}
          >
            진행 예정
          </button>
          <button
            className={currentStatus === "ended" ? styles.active : ""}
            onClick={() => handleStatusChange("ended")}
          >
            진행 종료
          </button>
        </div>

        {/* 북마크된 팝업 포스터를 표시하는 부분 */}
        <div className={styles.popupGrid}>
          {loading ? (
            <div>로딩 중...</div>
          ) : popups.length > 0 ? (
            popups.map((popup) => (
              <div key={popup.id} className={styles.popupCard}>
                <div className={styles.imageContainer}>
                  <img src={popup.poster} alt={`${popup.name} Poster`} />
                  <div className={styles.dateOverlay}>
                    {popup.dateRange.start} ~ {popup.dateRange.end}
                  </div>
                </div>
                <div className={styles.popupName}>{popup.name}</div>
              </div>
            ))
          ) : (
            <div>북마크된 팝업이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
