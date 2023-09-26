import React from 'react'
import { useParams } from 'react-router';

const ResultPage = () => {
  const { gameId } = useParams();
  console.log(gameId)

  return (
    <div>
      게임 코드: {gameId} <br />
      경기 결과 페이지!
    </div>
  );
};

export default ResultPage;