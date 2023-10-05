import { forwardRef, useEffect, useState, memo } from "react";

import upload from "../../assets/icon/upload.png";
// import time from "../../assets/icon/time.png";
// import check from "../../assets/icon/check.png";
import UploadModal from "../UploadModal/UploadModal";
import StatusList from "../Status/StatusList";
import { getGameData, getAnalyzingArray, getNotAssignedArray } from '../../api/gameApi';
import { useUserContext } from '../../contexts/userContext';

const VideoModal = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(null)
  const closeHandler = () => {
    setIsOpen()
  }

  const handleClickOutside = (event) => {
    if (event.target.alt === "업로드") return;

    if (
      ref.current &&
      !ref.current.classList.contains("scale-0") &&
      !ref.current.contains(event.target)
    ) {
      ref.current.classList.add("scale-0", 1);
    }
  };

  //로컬스토리지에 저장된 분석 중 gamdId 목록을 가져온다.
  // const gameIdInLocal = localStorage.getItem('gameId');
  // console.log('로컬 게임 아이디', gameIdInLocal)

  // const gameIdArray = gameIdInLocal.split(',');
  // console.log('배열로 변환됐나', gameIdArray)

  // 문자열로 저장되어있는 게임아이디를 정수로 변환
  // const uploadedList = gameIdArray.map(str => parseInt(str.trim()));
  // console.log('정수 변환됐나', uploadedList)

  const { user } = useUserContext();
  const userId = user.id;
  // console.log('유저아이디', userId)

  const [analyzingData, setAnalyzingData] = useState([]);
  const [notAssignedData, setNotAssignedData] = useState([]);

  // 분석 중인 게임 아이디 가져오기
  useEffect(() => {
    const getAnalyzingGameId = async () => {
      try {
        const userAnalyzingData = await getAnalyzingArray(userId, true);
        setAnalyzingData(userAnalyzingData.data.gameIdList);
        // console.log('분석중 게임아이디 요청 성공!')
      } catch (error) {
        console.error('분석중 게임아이디를 가져오는 중 오류 발생:', error);
      }
    };

    getAnalyzingGameId();
  }, []);

  //분석 완료 + 미할당된 게임아이디 가져오기
  useEffect(() => {
    const getNotAssignedGameId = async () => {
      try {
        const userNotAssignedData = await getNotAssignedArray(userId, false);
        setNotAssignedData(userNotAssignedData.data.gameIdList);
        // console.log('미할당된 게임아이디 요청 성공!', userNotAssignedData.data)
      } catch (error) {
        console.error('분석중 게임아이디를 가져오는 중 오류 발생:', error);
      }
    };

    getNotAssignedGameId();
  }, []);

  // console.log('분석중데이터 잘들어왓나', analyzingData)
  // console.log('미할당데이터 잘들어왓나', notAssignedData)


  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="absolute z-10 w-88 px-2 transition-all origin-top-right scale-0 bg-white border rounded-md shadow right-0 top-14"
        style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}
      >
        <div onClick={() => { setIsOpen(true) }} className=" cursor-pointer py-3 border-b border-black">
          <img className="inline h-6  pr-4" src={upload} alt="업로드" />
          영상 업로드
        </div>
        {isOpen && (
          <UploadModal
            onConfirm={closeHandler}
          />
        )}
        <div className="py-3 h-auto">
          <strong>분석실</strong>
          <StatusList analyzingData={analyzingData} notAssignedData={notAssignedData} />
          {/* <StatusList /> */}
        </div>
      </div>
    </>
  );
});

export default memo(VideoModal);
