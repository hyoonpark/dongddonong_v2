import React, { useEffect, useState } from 'react';
import { getGameAll } from '../api/gameApi';


const TestPage = () => {
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    const getGameInfo = async () => {
      try {
        const gameInfo = await getGameAll();
        setGameInfo(gameInfo);
        console.log('게임정보요청 성공!', gameInfo)
      } catch (error) {
        console.error('게임 정보를 가져오는 중 오류 발생:', error);
      }
    };

    getGameInfo();
  }, []);

  return (
    <div>
      테스트 중 . .
    </div>
  );
};

export default TestPage;