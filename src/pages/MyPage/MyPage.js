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

const StyledCalendar2 = styled(Calendar)`
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background: beige;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }

  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__tile--now {
    background: #ffff76;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }

  .react-calendar__tile--hasActive {
    background: #76baff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }

  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;

const MyPage = () => {
  const [expanded, setExpanded] = useState(false); // 캘린더 확장 상태를 관리하는 상태 변수
  const [date, setDate] = useState(new Date()); // 선택된 날짜 상태
  const [currentStatus, setCurrentStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [weekPopupsLoading, setWeekPopupsLoading] = useState(true);
  const [popups, setPopups] = useState([]);
  const [weekPopups, setWeekPopups] = useState([]);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  console.log(weekPopups);

  // 북마크된 팝업 데이터를 가져오는 함수
  const fetchPopups = async (status) => {
    try {
      setLoading(true); // 데이터 로딩 상태 시작
      const response = await axios.get(
        `${serverURL}/bookmarks/bookmarked-popups?page=1&status=${status}`
      );
      setPopups(response.data); // 받아온 데이터 상태에 저장
      console.log(response.data);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false); // 데이터 로딩 상태 종료
    }
  };

  // 주간 팝업 데이터를 가져오는 함수
  const fetchWeekPopups = async (startDate, endDate) => {
    try {
      setWeekPopupsLoading(true);
      const response = await axios.get(
        `${serverURL}/bookmarks/date-range?startDate=${startDate}&endDate=${endDate}`
      );
      setWeekPopups(response.data);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setWeekPopupsLoading(false);
    }
  };

  // 주간 범위에 맞는 데이터 요청
  useEffect(() => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = addDays(start, 6);
    fetchWeekPopups(format(start, "yyyy-MM-dd"), format(end, "yyyy-MM-dd"));
  }, [date]);

  useEffect(() => {
    fetchPopups(currentStatus); // 컴포넌트 마운트 시 데이터 요청
  }, [currentStatus]); // 상태 변경 시 데이터 다시 요청

  const handleStatusChange = (status) => {
    if (currentStatus === status) {
      setCurrentStatus("all"); // 현재 선택된 상태를 다시 클릭하면 "all"로 변경
    } else {
      setCurrentStatus(status);
    }
  };

  const renderWeekView = () => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = addDays(start, 6);
    const weekDays = eachDayOfInterval({ start, end });

    const sortedPopups = [...weekPopups].sort(
      (a, b) => new Date(a.dateRange.start) - new Date(b.dateRange.start)
    );

    return (
      <div className={styles.weekView}>
        <div className={styles.weekNav}>
          <AiOutlineLeft
            onClick={() => setDate(subDays(date, 7))}
            className={styles.navIcon}
          />
          {weekDays.map((day) => (
            <div key={day} className={styles.weekDay}>
              <div
                className={`${styles.dayNumber} ${
                  format(day, "E") === "Sun" ? styles.sunday : ""
                } ${format(day, "E") === "Sat" ? styles.saturday : ""}`}
              >
                {format(day, "d")}
              </div>{" "}
              <div className={styles.dayName}>{format(day, "E")}</div>
            </div>
          ))}
          <AiOutlineRight
            onClick={() => setDate(addDays(date, 7))}
            className={styles.navIcon}
          />
        </div>
        <div className={styles.weekPopupsContainer}>
          {sortedPopups.slice(0, 3).map((popup, index) => {
            const popupStartDate = new Date(popup.dateRange.start);
            const popupEndDate = new Date(popup.dateRange.end);

            const gridStart = Math.max(
              differenceInDays(popupStartDate, start) + 1,
              1
            );
            const gridEnd = Math.min(
              differenceInDays(popupEndDate, start) + 2,
              8
            );

            return (
              <div
                key={popup.id}
                className={`${styles.popupBar} ${
                  gridEnd === 8 ? styles.lastDay : ""
                }`}
                style={{
                  gridColumn: `${gridStart} / ${gridEnd}`, // 끝에 여유 공간 확보
                }}
              >
                {popup.name}
              </div>
            );
          })}
          {sortedPopups.length > 3 && (
            <div className={styles.morePopup}>...</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.myPage}>
      {/* 왼쪽 사용자 프로필 섹션 */}
      <div className={styles.profileSection}>
        <img
          src={
            "https://i.namu.wiki/i/3-KkBTJPKKcJhZ843jaHKml1ACBrS76wyrtrNIpXgOgApnxW0a9FOdwcIewvu1mmUY0-8uQRoz2ulAr-1pbrmw.webp"
          } // 실제 사용자 프로필 이미지 URL로 변경 필요
          alt="User Profile"
          className={styles.profileImage}
        />
        <h2>ㅇㅇㅇ</h2>
        <p>ㅇㅇㅇ@gmail.com</p>
        <div className={styles.profileStats}>
          <div>방문한 팝업: 21</div>
          <div>작성한 기록: 18</div>
          <div>받은 좋아요: 176</div>
        </div>
        <button className={styles.editButton}>회원정보 수정</button>
        <button className={styles.notificationButton}>팝업 알림 설정</button>
        <button className={styles.logoutButton}>로그아웃</button>
      </div>

      {/* 오른쪽 북마크 섹션 */}
      <div className={styles.bookmarkSection}>
        <h2>북마크한 팝업</h2>
        <div className={styles.calendarContainer}>
          <h3>다가오는 팝업</h3>
          <button
            onClick={() => setExpanded(!expanded)}
            className={styles.expandButton}
          >
            {expanded ? "접기" : "펼쳐보기"}
          </button>
          <div
            className={`${styles.calendar} ${expanded ? styles.expanded : ""}`}
          >
            {expanded ? (
              // 월간 달력
              <StyledCalendar2
                onChange={setDate}
                value={date}
                className={styles.calendarComponent} // 커스텀 CSS 클래스 추가
                view="month" // 월간 뷰
                showNeighboringMonth={false} // 이웃하는 달의 날짜 숨김
              />
            ) : (
              // 주간 달력
              renderWeekView()
            )}
          </div>
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
