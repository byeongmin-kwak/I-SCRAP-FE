import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import NonLoginMainPage from "./pages/NonLoginMainPage/NonLoginMainPage";
import LoginMainPage from "./pages/LoginMainPage/LoginMainPage";

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
      </Routes>
    </div>
  );
}

export default App;
