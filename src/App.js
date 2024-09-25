import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import NonLoginMainPage from "./pages/NonLoginMainPage/NonLoginMainPage";
import LoginMainPage from "./pages/LoginMainPage/LoginMainPage";
import CardBasicPage from "./pages/CardBasicPage/CardBasicPage";
import CardMakingPage from "./pages/CardMakingPage/CardMakingPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import PopupPage from "./pages/PopupPage/PopupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 'hasSeenOnboarding' 확인
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

    if (!hasSeenOnboarding) {
      setShowOnboarding(true); // 처음 방문자라면 온보딩 페이지를 보여줌
    }
  }, []);

  const handleOnboardingFinish = () => {
    setShowOnboarding(false); // 온보딩 페이지가 끝나면 더 이상 보여주지 않도록 함
  };

  return (
    <div className="App">
      <Nav />
      <Routes>
        {showOnboarding ? (
          <Route
            path="/"
            element={
              <OnboardingPage onFinishOnboarding={handleOnboardingFinish} />
            }
          />
        ) : isLoggedIn ? (
          <Route path="/" element={<LoginMainPage />} />
        ) : (
          <Route path="/" element={<NonLoginMainPage />} />
        )}
        <Route path="/card-basic" element={<CardBasicPage />} />
        <Route path="/card-making" element={<CardMakingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/popup" element={<PopupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
