import React from "react";
import styles from "./LoginPage.module.css";
import googleLogin from "../../assets/googleLogin.svg";

const LoginPage = () => {
  return (
    <div className={styles.LoginPage}>
      <div className={styles.white}>
        <div>로그인</div>
        <a href="https://mbnbcpl609.execute-api.ap-northeast-2.amazonaws.com/dev/auth/google/login">
          <img src={googleLogin} alt="" />
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
