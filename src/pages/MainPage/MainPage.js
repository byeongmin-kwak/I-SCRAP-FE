import React from "react";
import "./MainPage.css";
import MainSection from "../../components/MainSection/MainSection";
import MonthlyPopupSection from "../../components/MonthlyPopupSection/MonthlyPopupSection";
import MapSection from "../../components/MapSection/MapSection";
import NonLoginSection from "../../components/NonLoginSection/NonLoginSection";
import Footer from "../../components/Footer/Footer";

const MainPage = () => {
  return (
    <div className="main-page">
      <MainSection />
      <MonthlyPopupSection />
      <MapSection />
      <NonLoginSection />
      <Footer />
    </div>
  );
};

export default MainPage;
