import React, { useEffect } from 'react';
import axios from 'axios';

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  // const navigator = useNavigate();

  useEffect(() => {
    axios.get(`https://j9e103.p.ssafy.io/user/login?code=${code}`
    ).then((res) => {
      console.log('성공!!', res.data);
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