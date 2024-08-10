import React from "react";
import "./MainPage.css";
import MainSection from "../../components/MainSection/MainSection";
import MonthlyPopupSection from "../../components/MonthlyPopupSection/MonthlyPopupSection";

const MainPage = () => {
  return (
    <div className="main-page">
      <MainSection />
      <MonthlyPopupSection />
    </div>
  );
};

export default MainPage;
