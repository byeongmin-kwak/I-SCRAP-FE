import React from "react";
import styles from "./RecentHistorySection.module.css";
import topImage from "../../assets/mainPageImage4.svg";

const history = [
  {
    id: 1,
    title: "뭐뭐뭐한 팝업",
    image: "",
    date: "07.05",
  },
  {
    id: 2,
    title: "뭐뭐뭐한 팝업",
    image: "",
    date: "07.05",
  },
  {
    id: 3,
    title: "뭐뭐뭐한 팝업",
    image: "",
    date: "07.05",
  },
  {
    id: 4,
    title: "뭐뭐뭐한 팝업",
    image: "",
    date: "07.05",
  },
  {
    id: 5,
    title: "뭐뭐뭐한 팝업",
    image: "",
    date: "07.05",
  },
];

const RecentHistorySection = () => {
  return (
    <div className={styles.RecentHistorySection}>
      <img src={topImage} alt="" className={styles.topImage} />
      <div className={styles.container}>
        <div className={styles.topText}>
          <div className={styles.title}>최근 쓴 기록</div>
          <div className={styles.button}>전체보기</div>
        </div>
        <div>
          <div className={styles.content}>
            {history.map((itme) => (
              <div key={itme.id} className={styles.history}>
                <img src={itme.image} alt="" className={styles.historyImage} />
                <div className={styles.historyTitle}>{itme.title}</div>
                <div className={styles.historyDate}>{itme.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentHistorySection;
