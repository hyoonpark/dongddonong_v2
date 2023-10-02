import React, { useEffect, useState } from 'react';
// import { getGameAll } from '../api/gameApi';
import getUserRecord from '../api/getUserRecord';
import { useUserContext } from "../contexts/userContext"



const TestPage = () => {
  // const [gameInfo, setGameInfo] = useState(null);
  const [recordInfo, setRecordInfo] = useState(null);
  const { user } = useUserContext()
  const userId = user.id
  console.log(userId)


  // useEffect(() => {
  //   const getGameInfo = async () => {
  //     try {
  //       const gameInfo = await getGameAll();
  //       setGameInfo(gameInfo);
  //       console.log('게임정보요청 성공!', gameInfo)
  //     } catch (error) {
  //       console.error('게임 정보를 가져오는 중 오류 발생:', error);
  //     }
  //   };

  //   getGameInfo();
  // }, []);

  useEffect(() => {
    const getRecordInfo = async () => {
      try {
        const recordInfo = await getUserRecord();
        setRecordInfo(recordInfo);
        console.log('기록실정보요청 성공!', recordInfo)
      } catch (error) {
        console.error('기록실 정보를 가져오는 중 오류 발생:', error);
      }
    };

    getRecordInfo();
  }, []);

  return (
    <div>
      테스트 중 . .
    </div>
  );
};

export default TestPage;