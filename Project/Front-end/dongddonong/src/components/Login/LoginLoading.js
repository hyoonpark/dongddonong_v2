import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../constexts/userContext';

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigator = useNavigate();

  const { setLoggedUser, setLoggedIn } = useUserContext();

  useEffect(() => {
    axios.get(`https://j9e103.p.ssafy.io:8589/user/login?code=${code}`
      // axios.get(`http://localhost:8589/user/login?code=${code}`
    ).then((res) => {
      console.log('성공!!', res.data);
      localStorage.setItem('token', res.data.data.accessToken)
      setLoggedUser(res.data.data);
      navigator('/') // 로그인 시도하던 페이지로 이동
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