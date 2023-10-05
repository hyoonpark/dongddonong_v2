import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../contexts/userContext';

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigator = useNavigate();
  const { setLoggedUser } = useUserContext();

  useEffect(() => {
    axios.get(`https://j9e103.p.ssafy.io:8589/user/login?code=${code}`
    ).then((res) => {
      // console.log('성공!!', res.data);
      console.log('인가코드', code);
      setLoggedUser(res.data.data);
      navigator('/')
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

