import React from "react";
import style from "./Footer.module.css";
import footerImg from "../../assets/footer.svg";

const Footer = () => {
  return (
    <div className={style.footer}>
      <img src={footerImg} alt="" />
    </div>
  );
};

export default Footer;
