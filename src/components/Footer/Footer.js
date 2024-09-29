import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/MainPage/logo.svg";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <p>찾아오는 길</p>
          <p>고객센터</p>
          <p>
            서울캠퍼스 (02447) 서울특별시 동대문구 정화대로 26 &nbsp;&nbsp;
            국제캠퍼스 (17104) 경기도 용인시 기흥구 덕영대로 1732
          </p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.logoSection}>
          <img src={logo} alt="" className={styles.logo} />
          <p>@purv.iscrap.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
