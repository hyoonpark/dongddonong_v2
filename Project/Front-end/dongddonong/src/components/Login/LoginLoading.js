import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  // console.log(code);
  const navigator = useNavigate();

  useEffect(() => {
    axios.get(`https://j9e103.p.ssafy.io:8589/user/login?code=${code}`
    ).then((res) => {
      console.log('성공!!', res.data);
      console.log('엑세스토큰', res.data.accessToken);
      navigator("/")
    }).catch(error => {
      console.log('실패!!!!!!', error);
    });
  }, []);


  return (
    <div>
      로그인 중..
    </div>
  );
};

export default LoginLoading;