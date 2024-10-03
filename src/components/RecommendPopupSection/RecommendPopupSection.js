import React, { useEffect, useState } from "react";
import styles from "./RecommendPopupSection.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import leftImage from "../../assets/MainPage/RecommendPopupSection/leftImage.svg";
import rightImage from "../../assets/MainPage/RecommendPopupSection/rightImage.svg";

const RecommendPopupSection = () => {
  const [popupItems, setPopupItems] = useState({ userName: "", popups: [] });
  const navigate = useNavigate();

  const serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/popups/home/personalized-popups`,
          {
            withCredentials: true,
          }
        );
        setPopupItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/popup/${id}`); // 클릭 시 해당 경로로 이동
  };

  return (
    <div className={styles.recommendPopupSection}>
      <img src={leftImage} alt="Left Decorative" className={styles.leftImage} />
      <img
        src={rightImage}
        alt="Right Decorative"
        className={styles.rightImage}
      />

      <div className={styles.header}>
        <div className={styles.title}>‘{popupItems.userName}’을 위한</div>
      </div>
      <div className={styles.grid}>
        {popupItems.popups.map((item) => (
          <div key={item.id} className={styles.popupItem}>
            <div
              className={styles.popupImage}
              onClick={() => handleCardClick(item.id)}
            >
              <img src={item.poster} alt={`${item.title} Poster`} />
              <div className={styles.popupDetails}>
                <p>{item.location}</p>
                <div>
                  <p>기간 : {item.dateRange}</p>
                  <p>금액 : {item.fee.toLocaleString()}원</p>
                </div>
                <div>
                  {item.category.map((category, index) => (
                    <button key={index} className={styles.categoryButton}>
                      #{category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.popupTitle}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendPopupSection;
