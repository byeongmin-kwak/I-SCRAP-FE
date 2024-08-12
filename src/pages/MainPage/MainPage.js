import React from "react";
import "./MainPage.css";
import MainSection from "../../components/MainSection/MainSection";
import MonthlyPopupSection from "../../components/MonthlyPopupSection/MonthlyPopupSection";
import MapSection from "../../components/MapSection/MapSection";
import NonLoginSection from "../../components/NonLoginSection/NonLoginSection";

const MainPage = () => {
  return (
    <div className="main-page">
      <MainSection />
      <MonthlyPopupSection />
      <MapSection />
      <NonLoginSection />
    </div>
  );
};

export default MainPage;
