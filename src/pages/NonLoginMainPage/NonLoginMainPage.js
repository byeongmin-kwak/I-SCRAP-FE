import React from "react";
import styles from "./NonLoginMainPage.module.css";
import MainSection from "../../components/MainSection/MainSection";
import MonthlyPopupSection from "../../components/MonthlyPopupSection/MonthlyPopupSection";
import NonLoginSection from "../../components/NonLoginSection/NonLoginSection";
import Footer from "../../components/Footer/Footer";
import PopupTasteTestSection from "../../components/PopupTasteTestSection/PopupTasteTestSection";

const NonLoginMainPage = () => {
  return (
    <div className={styles.NonLoginMainPage}>
      <MainSection />
      <MonthlyPopupSection />
      <PopupTasteTestSection />
      <NonLoginSection />
      <Footer />
    </div>
  );
};

export default NonLoginMainPage;
