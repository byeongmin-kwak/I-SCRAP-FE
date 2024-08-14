import React from "react";
import style from "./LoginMainPage.module.css";
import MainSection from "../../components/MainSection/MainSection";
import MonthlyPopupSection from "../../components/MonthlyPopupSection/MonthlyPopupSection";
import RecommendPopupSection from "../../components/RecommendPopupSection/RecommendPopupSection";

const LoginMainPage = () => {
  return (
    <div className={style.LoginMainPage}>
      <MainSection />
      <MonthlyPopupSection />
      <RecommendPopupSection />
    </div>
  );
};

export default LoginMainPage;
