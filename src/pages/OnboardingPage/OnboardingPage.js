import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OnboardingPage.module.css";
import image1 from "../../assets/onboardingPage1.svg";
import image2 from "../../assets/onboardingPage2.svg";

const OnboardingPage = ({ onFinishOnboarding }) => {
  const [startTransition, setStartTransition] = useState(false);
  const [showSlideOut, setShowSlideOut] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 첫 번째 애니메이션 실행
    const fadeInTimer = setTimeout(() => {
      setStartTransition(true); // 첫 번째 이미지가 등장
    }, 200);

    // 두 번째 애니메이션 실행 (첫 번째 이미지 사라짐)
    const slideOutTimer = setTimeout(() => {
      setShowSlideOut(true); // 첫 번째 이미지가 왼쪽으로 이동하며 사라짐
    }, 1500);

    // 페이드 아웃 시작 (메인 페이지 전환 전)
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2100);

    const endTimer = setTimeout(() => {
      localStorage.setItem("hasSeenOnboarding", "true"); // 온보딩 봤음을 기록
      onFinishOnboarding(); // App 컴포넌트에서 온보딩이 완료되었음을 알려줌
    }, 3200);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(slideOutTimer);
      clearTimeout(endTimer);
    };
  }, [navigate, onFinishOnboarding]);

  return (
    <div
      className={`${styles.OnboardingPage} ${fadeOut ? styles.fadeOut : ""}`}
    >
      <img
        src={image1}
        alt="onboarding1"
        className={`${styles.image1} ${startTransition ? styles.fadeIn : ""} ${
          showSlideOut ? styles.slideOut : ""
        }`}
      />
      <img
        src={image2}
        alt="onboarding2"
        className={`${styles.image2} ${
          showSlideOut ? styles.slideIn : styles.hidden
        }`}
      />
    </div>
  );
};

export default OnboardingPage;
