import React from "react";
import styles from "./RecommendPopupSection.module.css";

const popupItems = [
  { id: 1, title: "뭐뭐뭐한 팝업", image: "이미지" },
  { id: 2, title: "뭐뭐뭐한 팝업", image: "이미지" },
  { id: 3, title: "뭐뭐뭐한 팝업", image: "이미지" },
  { id: 4, title: "뭐뭐뭐한 팝업", image: "이미지" },
  { id: 5, title: "뭐뭐뭐한 팝업", image: "이미지" },
  { id: 6, title: "뭐뭐뭐한 팝업", image: "이미지" },
  { id: 7, title: "뭐뭐뭐한 팝업", image: "이미지" },
  { id: 8, title: "뭐뭐뭐한 팝업", image: "이미지" },
  { id: 9, title: "뭐뭐뭐한 팝업", image: "이미지" },
];

const RecommendPopupSection = () => {
  return (
    <div className={styles.recommendPopupSection}>
      <div className={styles.header}>
        <div className={styles.title}>‘oo’을 위한</div>
        <div className={styles.viewAllButton}>전체보기</div>
      </div>
      <div className={styles.grid}>
        {popupItems.map((item) => (
          <div key={item.id} className={styles.popupItem}>
            <div className={styles.popupImage}>{item.image}</div>
            <div className={styles.popupTitle}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendPopupSection;
