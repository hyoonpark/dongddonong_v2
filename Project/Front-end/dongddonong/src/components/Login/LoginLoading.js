import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { userContext } from './../../constexts/userContext';

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  // console.log(code);
  const navigator = useNavigate();
  
  const { accessToken, setAccessToken } = useState(null);

  useEffect(() => {
    axios.get(`https://j9e103.p.ssafy.io:8589/user/login?code=${code}`
    // axios.get(`http://localhost:8080/user/login?code=${code}`
    ).then((res) => {
      console.log('성공!!', res.data);
      const token = res.data.data.accessToken
      setAccessToken(token);
      console.log(accessToken)
      navigator('/') // 로그인 시도하던 페이지로 이동
    }).catch(error => {
      console.log('실패!!!!!!', error);
    });
  }, [code, setAccessToken]);


  return (
    <div>
      로그인 중..
    </div>
  );
};

export default LoginLoading;