import React, { useEffect, useState } from "react";
import styles from "./PopupPage.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PopupPage = () => {
  const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  const serverURL = process.env.REACT_APP_SERVER_URL;

  const [popupData, setPopupData] = useState(null);
  const [error, setError] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { popupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopupData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/popups/detail/${popupId}`,
          {
            withCredentials: true,
          } // 받아온 ID로 API 요청
        );
        setPopupData(response.data); // 데이터를 상태에 저장
        setIsBookmarked(response.data.isBookmarked);
        console.log("popupData", response.data);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };
    fetchPopupData(); // 컴포넌트 마운트 시 데이터 요청
  }, []);

  const clickBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked);

      await axios.post(
        `${serverURL}/bookmarks/${popupData.id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  // 평점 평균 계산 함수
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating.toFixed(1); // 소수점 한 자리까지 표시
  };

  // 별점 아이콘을 생성하는 함수
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // 꽉 찬 별의 개수
    const hasHalfStar = rating - fullStars >= 0.5; // 반별이 필요한지 확인
    const totalStars = 5;

    const stars = [];

    // 꽉 찬 별 추가
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} color="black" size="20px" />); // 노란색으로 채운 별
    }

    // 반 별 추가
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="black" size="20px" />);
    }

    // 빈 별 추가
    const remainingStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaRegStar key={fullStars + i + 1} color="black" size="20px" />
      );
    }

    return stars;
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
              placeholder={popupData.name}
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
                <div className={styles.bookmark} onClick={clickBookmark}>
                  {isBookmarked ? (
                    <FaBookmark size="30" color="#4AC7CF" />
                  ) : (
                    <FaRegBookmark size="30" color="#4AC7CF" />
                  )}
                </div>
                <button>관련 페이지 바로가기</button>
              </div>
              <div className={styles.popupName}>{popupData.name}</div>
              <div className={styles.tags}>
                <span className={styles.tag}>{popupData.category}</span>
              </div>
              <ul>
                <li>{popupData.location.address}</li>
                <li>기간: {popupData.dateRange}</li>
                <li>입장료: {popupData.fee}</li>
                <li>
                  이용시간: <br />
                  <div style={{ lineHeight: "2.0" }}>
                    {popupData.operatingHours.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </li>
                <li>
                  팝업/전시 크기 정보:{" "}
                  {popupData.sizeInfo
                    ? `${popupData.sizeInfo.width} x ${popupData.sizeInfo.height}`
                    : "정보 없음"}
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.info}>
            <h2>팝업스토어 소개</h2>
            <p>
              {popupData.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>{" "}
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
                <div>
                  {renderStars(calculateAverageRating(popupData.reviews))}
                </div>
                <div>{calculateAverageRating(popupData.reviews)}</div>
              </div>
              <button onClick={() => navigate("/card-basic")}>후기 작성</button>
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
