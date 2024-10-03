import React, { useState } from "react";
import axios from "axios";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Nav = ({ isLoggedIn, username }) => {
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

  const handleMyClick = () => {
    window.location.href = "/my";
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleArchivingClick = () => {
    window.location.href = "/archiving";
  };

  const handleLogoutClick = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
        withCredentials: true,
      });
      window.location.href = "/"; // 로그아웃 후 메인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

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
        {isLoggedIn && (
          <>
            <li onClick={handleArchivingClick}>기록</li>
            <li onClick={handleMyClick}>My</li>
          </>
        )}
        {isLoggedIn ? (
          <>
            <li className={styles.loginButton} onClick={handleLogoutClick}>
              logout
            </li>
            <li className={styles.userInfo}>{username}님</li>
          </>
        ) : (
          <li className={styles.loginButton} onClick={handleLoginClick}>
            login / join
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
