import React from "react";
import style from "./Nav.module.css";
import logo from "../../assets/logo.svg";

const Nav = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.navbarLogo}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={style.navbarMenu}>
        <li>지도</li>
        <li>찾기</li>
        <li>기록</li>
        <li>My</li>
        <li className={style.loginButton}>login / join</li>
      </ul>
    </nav>
  );
};

export default Nav;
