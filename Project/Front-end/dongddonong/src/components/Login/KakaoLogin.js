import React from "react";
import KakaoLoginLogo from "../../assets/kakao_login_btn.png";

const KakaoLogin = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <img
        src={KakaoLoginLogo}
        alt="Kakao Login Logo"
        onClick={handleLogin}
        style={{ cursor: "pointer" }}
      />
    </>
  );
};

export default KakaoLogin;
