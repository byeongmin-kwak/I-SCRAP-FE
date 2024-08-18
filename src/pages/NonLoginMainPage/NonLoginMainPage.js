import React from "react";
import styles from "./NonLoginMainPage.module.css";
import MainSection from "../../components/MainSection/MainSection";
import MonthlyPopupSection from "../../components/MonthlyPopupSection/MonthlyPopupSection";
import MapSection from "../../components/MapSection/MapSection";
import NonLoginSection from "../../components/NonLoginSection/NonLoginSection";
import Footer from "../../components/Footer/Footer";

const NonLoginMainPage = () => {
  return (
    <div className={styles.NonLoginMainPage}>
      <MainSection />
      <MonthlyPopupSection />
      <MapSection />
      <NonLoginSection />
      <Footer />
    </div>
  );
};

export default NonLoginMainPage;
