import React from "react";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.svg";

const Nav = () => {
  const handleLogoClick = () => {
    window.location.href = "/"; // 로고 클릭 시 새로고침과 함께 메인 페이지로 이동
  };

  const handleMapClick = () => {
    window.location.href = "/map"; // "지도" 클릭 시 새로고침과 함께 /map 페이지로 이동
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Logo" onClick={handleLogoClick} />
      </div>
      <ul className={styles.navbarMenu}>
        <li>
          <li onClick={handleMapClick}>지도</li>
        </li>
        <li>찾기</li>
        <li>기록</li>
        <li>My</li>
        <li className={styles.loginButton}>login / join</li>
      </ul>
    </nav>
  );
};

export default Nav;
