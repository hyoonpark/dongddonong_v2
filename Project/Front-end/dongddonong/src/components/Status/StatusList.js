import React, { useEffect, useState } from 'react';
import { getGameData } from '../../api/gameApi';
import StatusAnalzeItem from './StatusAnalyzeItem';
import StatusNotAssignedItem from './StatusNotAssignedItem';

const StatusList = (props) => {
  const { analyzingData, notAssignedData } = props;

  const [analyzingGameDataList, setAnalyzingGameDataList] = useState([]);

  const [notAssignedGameDataList, setNotAssignedGameDataList] = useState([]);

  useEffect(() => {
    Promise.all(
      analyzingData.map((gameId) => getGameData(gameId))
    )
      .then((responses) => {
        const data = responses.map((res) => res.data).filter(Boolean);
        // console.log('데이터 잘 오고 잇나!!!', data)
        setAnalyzingGameDataList(data);
      })
      .catch((err) => {
        console.error(`실패!`, err);
      });
  }, [analyzingData]);

  useEffect(() => {
    Promise.all(
      notAssignedData.map((gameId) => getGameData(gameId))
    )
      .then((responses) => {
        const data = responses.map((res) => res.data).filter(Boolean);
        // console.log('데이터 잘 오고 잇나!!!', data)
        setNotAssignedGameDataList(data);
      })
      .catch((err) => {
        console.error(`실패!`, err);
      });
  }, [notAssignedData]);


  return (
    <div>
      {analyzingGameDataList.map((gameData, index) => (
        <StatusAnalzeItem
          key={index}
          data={gameData}
        />
      ))}

      {notAssignedGameDataList.map((gameData, index) => (
        <StatusNotAssignedItem
          gameId={notAssignedData[index]}
          key={index}
          data={gameData}
        />
      ))}
    </div>
  );
};

export default StatusList;