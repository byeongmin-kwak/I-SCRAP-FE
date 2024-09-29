import React, { useState } from "react";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림/닫힘 상태 관리

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // 메뉴 토글
  };

  const handleLogoClick = () => {
    window.location.href = "/"; // 로고 클릭 시 새로고침과 함께 메인 페이지로 이동
  };

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  const handleSearchClick = () => {
    window.location.href = "/search"; // "찾기" 클릭 시 새로고침과 함께 /search 페이지로 이동
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleMyClick = () => {
    window.location.href = "/my";
  };

  const handleArchiving = () => {
    window.location.href = "/archiving"
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Logo" onClick={handleLogoClick} />
      </div>

      <div className={styles.menuIcon} onClick={toggleMenu}>
        {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>

      <ul className={`${styles.navbarMenu} ${menuOpen ? styles.active : ""}`}>
        <li onClick={handleHomeClick}>홈</li>
        <li onClick={handleSearchClick}>찾기</li>
        <li onClick={handleArchiving}>기록</li>
        <li onClick={handleMyClick}>My</li>
        <li className={styles.loginButton} onClick={handleLoginClick}>
          login / join
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
