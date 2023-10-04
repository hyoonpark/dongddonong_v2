import { forwardRef, useEffect, useState, memo } from "react";

import upload from "../../assets/icon/upload.png";
import time from "../../assets/icon/time.png";
import check from "../../assets/icon/check.png";
import UploadModal from "../UploadModal/UploadModal";
import StatusList from "../Status/StatusList";

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

  //모달이 열릴 때 getStatusList axios 요청하기
  // localStorage에서 업로드한 영상 gameId 목록 가져오기
  // const uploadedList = [255, 12]

  //로컬스토리지에 저장된 분석 중 gamdId 목록을 가져온다.
  const gameIdInLocal = localStorage.getItem('gameId');
  // console.log('로컬 게임 아이디', gameIdInLocal)

  const gameIdArray = gameIdInLocal.split(',');
  // console.log('배열로 변환됐나', gameIdArray)

  // 문자열로 저장되어있는 게임아이디를 정수로 변환
  const uploadedList = gameIdArray.map(str => parseInt(str.trim()));
  // console.log('정수 변환됐나', uploadedList)






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
        className="absolute z-10 w-64 px-2 transition-all origin-top-right scale-0 bg-white border rounded-md shadow right-0 top-14"
      >
        <div onClick={() => { setIsOpen(true) }} className="py-3 border-b border-black">
          <img className="inline h-6 pr-4" src={upload} alt="업로드" />
          영상 업로드
        </div>
        {isOpen && (
          <UploadModal
            onConfirm={closeHandler}
          />
        )}
        <div className="py-3 h-auto">
          <strong>분석실</strong>
          <StatusList uploadedList={uploadedList} />
        </div>
      </div >
    </>
  );
});

export default memo(VideoModal);
