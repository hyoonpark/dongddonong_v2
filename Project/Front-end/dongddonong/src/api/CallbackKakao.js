import React, { useEffect } from 'react';
import Axios from 'axios';

const CallbackKakao = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);

    // 백엔드 서버의 엔드포인트 URL을 설정합니다.
    const backendEndpoint = 'http://localhost:8080/login';

    // Axios를 사용하여 POST 요청을 보냅니다.
    Axios.post(backendEndpoint, code)
      .then(response => {
        // 요청이 성공하면 여기에서 처리합니다.
        console.log('요청 성공:', response.data);
      })
      .catch(error => {
        // 요청이 실패하면 여기에서 처리합니다.
        console.error('요청 실패:', error);
      });
  }, []);


  return (
    <div>
      인가코드 보내라!!!!
    </div>
  );
};

export default CallbackKakao;