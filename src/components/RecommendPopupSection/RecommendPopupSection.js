import React, { useEffect, useState } from "react";
import styles from "./RecommendPopupSection.module.css";
import axios from "axios";

const RecommendPopupSection = () => {
  const [popupItems, setPopupItems] = useState({ userName: "", popups: [] });

  const serverURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/popups/home/personalized-popups`
        );
        setPopupItems(response.data);
        console.log("recommendPopup", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.recommendPopupSection}>
      <div className={styles.header}>
        <div className={styles.title}>‘{popupItems.userName}’을 위한</div>
        <div className={styles.viewAllButton}>전체보기</div>
      </div>
      <div className={styles.grid}>
        {popupItems.popups.map((item) => (
          <div key={item.id} className={styles.popupItem}>
            <div className={styles.popupImage}>
              <img src={item.poster} alt={`${item.title} Poster`} />
              <div className={styles.popupDetails}>
                <div>
                  <p>{item.location}</p>
                  <p>기간 : {item.dateRange}</p>
                  <p>금액 : {item.fee.toLocaleString()}원</p>
                </div>
                <div>
                  <button className={styles.categoryButton}>
                    #{item.category}
                  </button>
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
