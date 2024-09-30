import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import NonLoginMainPage from "./pages/NonLoginMainPage/NonLoginMainPage";
import LoginMainPage from "./pages/LoginMainPage/LoginMainPage";
import CardBasicPage from "./pages/CardBasicPage/CardBasicPage";
import CardMakingPage from "./pages/CardMakingPage/CardMakingPage";
import ArchivingPage from "./pages/ArchivingPage/ArchivingPage";
import WritingDetailPage from "./pages/WritingDetailPage/WritingDetailPage";
import TestPage from "./pages/TestPage/TestPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import PopupPage from "./pages/PopupPage/PopupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import MyPage from "./pages/MyPage/MyPage";
import axios from "axios"; // axios import 추가

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 'hasSeenOnboarding' 확인
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

    if (!hasSeenOnboarding) {
      setShowOnboarding(true); // 처음 방문자라면 온보딩 페이지를 보여줌
    }

    // 로그인 상태 확인 요청
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/auth/profile`,
          {
            withCredentials: true, // 쿠키를 함께 전송하여 인증 정보를 전달
          }
        );
        console.log("fetchUserProfile", response.data);
        if (response.data) {
          setIsLoggedIn(true); // 유저 정보가 있으면 로그인 상태로 설정
          setUsername(response.data.name); // 유저 이름 상태에 저장
        } else {
          setIsLoggedIn(false); // 유저 정보가 없으면 비로그인 상태로 설정
        }
      } catch (err) {
        console.error("로그인 정보를 불러오는 중 오류 발생:", err);
        setIsLoggedIn(false); // 에러 발생 시 비로그인 상태로 설정
      }
    };

    fetchUserProfile();
  }, []);

  const handleOnboardingFinish = () => {
    setShowOnboarding(false); // 온보딩 페이지가 끝나면 더 이상 보여주지 않도록 함
  };

  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} username={username} />
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
        <Route path="/archiving" element={<ArchivingPage />} />
        <Route path="/writing/:id" element={<WritingDetailPage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/popup/:popupId" element={<PopupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
