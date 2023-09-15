import React, { useEffect } from 'react';
import Axios from 'axios';

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  // const navigator = useNavigate();

  useEffect(() => {
    Axios({
      method: "GET",
      url: 'https://j9e103.p.ssafy.io/user/login?code=${code}',
    }).then((res) => {
      console.log('성공!!', res.data);
    }).catch(error => {
      console.log('실패!!!!!!', error);
      throw new Error(error);
    });
  }, []);


  return (
    <div>
      로그인 중..
    </div>
  );
};

export default LoginLoading;