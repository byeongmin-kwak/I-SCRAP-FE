import React from "react";
import styles from "./LoginMainPage.module.css";
import MainSection from "../../components/MainSection/MainSection";
import MonthlyPopupSection from "../../components/MonthlyPopupSection/MonthlyPopupSection";
import RecommendPopupSection from "../../components/RecommendPopupSection/RecommendPopupSection";
import BookmarkPopupSection from "../../components/BookmarkPopupSection/BookmarkPopupSection";
import RecentHistorySection from "../../components/RecentHistorySection/RecentHistorySection";

const LoginMainPage = () => {
  return (
    <div className={styles.LoginMainPage}>
      <MainSection />
      <MonthlyPopupSection />
      <RecommendPopupSection />
      <BookmarkPopupSection />
      <RecentHistorySection />
    </div>
  );
};

export default LoginMainPage;
