import React, { useEffect, useState } from "react";
import styles from "./PopupPage.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";
import { CiBookmark } from "react-icons/ci";

const PopupPage = () => {
  const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  const serverURL = process.env.REACT_APP_SERVER_URL;

  const [popupData, setPopupData] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/popups/detail/64dcbf56f001b623d8a71ba0`
        );
        // const response = await axios.get(
        //   `${serverURL}/popups/detail?id=${id}` // 받아온 ID로 API 요청
        // );
        setPopupData(response.data); // 데이터를 상태에 저장
        console.log(response.data);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };
    fetchPopupData(); // 컴포넌트 마운트 시 데이터 요청
  }, []);

  const formatOperatingHours = (operatingHours) => {
    const daysOfWeek = {
      Monday: "월",
      Tuesday: "화",
      Wednesday: "수",
      Thursday: "목",
      Friday: "금",
      Saturday: "토",
      Sunday: "일",
    };

    const groupedHours = [];
    let currentGroup = [];
    let previousTimeRange = null;

    for (let day in operatingHours) {
      const dayData = operatingHours[day];
      if (!dayData.closed) {
        const timeRange = `${dayData.open} - ${dayData.close}`;
        if (timeRange === previousTimeRange) {
          currentGroup.push(daysOfWeek[day]);
        } else {
          if (currentGroup.length > 0) {
            groupedHours.push({
              days: currentGroup,
              timeRange: previousTimeRange,
            });
          }
          currentGroup = [daysOfWeek[day]];
          previousTimeRange = timeRange;
        }
      }
    }

    // 마지막 그룹 처리
    if (currentGroup.length > 0) {
      groupedHours.push({
        days: currentGroup,
        timeRange: previousTimeRange,
      });
    }

    // 그룹화된 결과를 문자열로 변환, 요일을 쉼표로 구분
    return groupedHours.map((group, index) => (
      <span key={index}>
        {group.days.length > 1 ? group.days.join(", ") : group.days[0]} :{" "}
        {group.timeRange}
        <br />
      </span>
    ));
  };
  const ReviewCard = ({ review }) => {
    return (
      <div className={styles.card}>
        <div className={styles.cardInner}>
          {/* 카드 앞면 */}
          <div className={styles.cardFront}>
            <img
              src={review.cardFront}
              alt="Card Front"
              className={styles.cardImage}
            />
            <div className={styles.cardStats}>
              <div className={styles.stats}>
                <span>⭐ {review.reviewLikes}</span>
                <span>💬 {review.comments}</span>
              </div>
            </div>
          </div>

          {/* 카드 뒷면 */}
          <div className={styles.cardBack}>
            <div className={styles.cardBackContent}>
              <p>{review.shortComment}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.popupPage}>
      {popupData ? (
        <>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="팝업명"
              className={styles.searchInput}
            />
          </div>

          <div className={styles.title}>
            <div className={styles.imageContainer}>
              <div className={styles.smallImages}>
                {popupData.detailImages.map((image, index) => (
                  <img key={index} src={image} alt={`Small ${index + 1}`} />
                ))}
              </div>
              <div className={styles.largeImage}>
                <img src={popupData.poster} alt="Large" />
              </div>
            </div>
            <div className={styles.titleInfo}>
              <div className={styles.top}>
                <div className={styles.bookmark}>
                  <CiBookmark size="30" color="#4AC7CF" />
                </div>
                <button>관련 페이지 바로가기</button>
              </div>
              <div>{popupData.name}</div>
              <div className={styles.tags}>
                <span className={styles.tag}>{popupData.category}</span>
              </div>
              <ul>
                <li>{popupData.location.address}</li>
                <li>
                  기간:{" "}
                  {new Date(popupData.dateRange.start).toLocaleDateString(
                    "ko-KR",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}{" "}
                  -
                  {new Date(popupData.dateRange.end).toLocaleDateString(
                    "ko-KR",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </li>
                <li>입장료: {popupData.fee}원</li>
                <li>
                  이용시간: <br />
                  {formatOperatingHours(popupData.operatingHours)}
                </li>
                <li>
                  팝업/전시 크기 정보: {popupData.sizeInfo.width} x{" "}
                  {popupData.sizeInfo.height}
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.info}>
            <h2>팝업스토어 소개</h2>
            <p>{popupData.description}</p>
          </div>
          <div className={styles.map}>
            <h2>찾아오는 길</h2>
            <p>{popupData.location.address}</p>
            <MapDiv
              style={{
                height: 400,
              }}
            >
              <NaverMap
                defaultCenter={{
                  lat: `${popupData.location.latitude}`,
                  lng: `${popupData.location.longitude}`,
                }}
              >
                <Marker
                  defaultPosition={{
                    lat: `${popupData.location.latitude}`,
                    lng: `${popupData.location.longitude}`,
                  }}
                />
              </NaverMap>
            </MapDiv>
          </div>
          <div className={styles.review}>
            <h2>후기</h2>
            <div className={styles.reviewTop}>
              <div style={{ display: "flex" }}>
                <div>전체평점</div>
                <div>별{/* <div></div> 별점 */}</div>
                <div>별점</div>
              </div>
              <button>후기 작성</button>
            </div>
            <div className={styles.reviewContainer}>
              {popupData.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
  );
};

export default PopupPage;
