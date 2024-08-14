import React from "react";
import styles from "./Footer.module.css";
import footerImg from "../../assets/footer.svg";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <img src={footerImg} alt="" />
    </div>
  );
};

export default Footer;
