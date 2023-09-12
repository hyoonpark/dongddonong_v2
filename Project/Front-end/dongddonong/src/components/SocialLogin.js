import React from 'react';
import KakaoLoginLogo from "../assets/images/kakao_login_btn.png";

const SocialLogin = () => {
  const Rest_api_key = '4e01b41f45f312031ef4c97ed183fa71'; //REST API KEY
  const redirect_uri = 'http://localhost:3000/oauth/callback/kakao'; //Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
    console.log(window.location.href)

    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
  };

  return (
    <>
    <img src={KakaoLoginLogo} alt="Kakao Login Logo" onClick={handleLogin} style={{cursor:'pointer'}}/>
    </>
  );
};

export default SocialLogin;