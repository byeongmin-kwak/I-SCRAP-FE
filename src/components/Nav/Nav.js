import React from "react";
import styles from "./Nav.module.css";
import logo from "../../assets/logo.svg";

const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={styles.navbarMenu}>
        <li>지도</li>
        <li>찾기</li>
        <li>기록</li>
        <li>My</li>
        <li className={styles.loginButton}>login / join</li>
      </ul>
    </nav>
  );
};

export default Nav;
