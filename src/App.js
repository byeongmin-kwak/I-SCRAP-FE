import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import NonLoginMainPage from "./pages/NonLoginMainPage/NonLoginMainPage";
import LoginMainPage from "./pages/LoginMainPage/LoginMainPage";
import MapPage from "./pages/MapPage/MapPage";
import CardBasicPage from "./pages/CardBasicPage/CardBasicPage";
import CardMakingPage from "./pages/CardMakingPage/CardMakingPage";
import ArchivingPage from "./pages/ArchivingPage/ArchivingPage";
import WritingDetailPage from "./pages/WritingDetailPage/WritingDetailPage";
import TestPage from "./pages/TestPage/TestPage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Nav />
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<LoginMainPage />} />
        ) : (
          <Route path="/" element={<NonLoginMainPage />} />
        )}
        <Route path="/map" element={<MapPage />} />
        <Route path="/card-basic" element={<CardBasicPage />} />
        <Route path="/card-making" element={<CardMakingPage />} />
        <Route path="/archiving" element={<ArchivingPage />} />
        <Route path="/writing" element={<WritingDetailPage />} />
        <Route path='/test' element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
