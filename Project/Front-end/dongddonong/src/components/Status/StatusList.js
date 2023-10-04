import React, { useEffect, useState } from 'react';
import StatusItem from './StatusItem';
import { getGameData } from '../../api/gameApi';

const StatusList = (props) => {
  const { uploadedList } = props;
  console.log('업로드 리스트', uploadedList)

  const [gameDataList, setGameDataList] = useState([]);

  useEffect(() => {
    console.log('게임데이터', gameDataList)
    Promise.all(
      uploadedList.map((gameId) => getGameData(gameId))
    )
      .then((responses) => {
        const data = responses.map((res) => res.data).filter(Boolean);
        setGameDataList(data);
      })
      .catch((err) => {
        console.error(`실패!`, err);
      });
  }, [uploadedList]);


  return (
    <div>
      {gameDataList.map((gameData, index) => (
        <StatusItem key={index} data={gameData} />
      ))}
      {/* <StatusItem /> */}
    </div>
  );
};

export default StatusList;