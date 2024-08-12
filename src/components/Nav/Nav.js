import React from "react";
import "./Nav.css";
import logo from "../../assets/logo.svg";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-menu">
        <li>지도</li>
        <li>찾기</li>
        <li>기록</li>
        <li>My</li>
        <li className="login-button">login / join</li>
      </ul>
    </nav>
  );
};

export default Nav;
