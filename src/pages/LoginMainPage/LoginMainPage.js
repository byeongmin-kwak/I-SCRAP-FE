import React, { useEffect, useState } from "react";
import styles from "./LoginMainPage.module.css";
import MainSection from "../../components/MainSection/MainSection";
import MonthlyPopupSection from "../../components/MonthlyPopupSection/MonthlyPopupSection";
import RecommendPopupSection from "../../components/RecommendPopupSection/RecommendPopupSection";
import BookmarkPopupSection from "../../components/BookmarkPopupSection/BookmarkPopupSection";
import RecentHistorySection from "../../components/RecentHistorySection/RecentHistorySection";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const LoginMainPage = () => {
  useEffect(() => {
    // 서버에 요청 보낼 때 쿠키 포함하기 위해 credentials 설정
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/profile`, {
        withCredentials: true, // 쿠키 포함
      })
      .then((response) => {
        console.log("login--------", response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);
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
