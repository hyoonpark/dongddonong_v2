import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getGameData } from '../api/gameApi';


const ResultPage = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState();

  useEffect(() => {
    try {
      getGameData(gameId)
        .then(val => {
          setGameData(val.data)
          console.log('성공! val.data', val.data)
        });
    } catch (err) {
      console.log("에러남 ㄱ-");
    }
  }, [gameId]);

  return (
    <div>
      게임 코드: {gameId} <br />
      {gameData && <div>유저 아이디: {gameData.userId}</div>}
      경기 결과 페이지!
    </div>
  );
};

export default ResultPage;