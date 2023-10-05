import React from 'react';
import complete from '../../assets/complete.png'
import { Link } from "react-router-dom";


const StatusNotAssignedItem = ({ data, gameId }) => {
  const thumbnail = data.thumbnail
  const videoTitle = data.fileName
  const videoLength = parseFloat(data.videoLength).toFixed(1);
  const statusContents = ' · 분석 완료! 분류가 필요해요..'
  console.log(data)

  return (
    // <div className="absoulte w-272 h-80 left-59 top-395">
    //   <img className="h-8 w-8" src={complete} alt="분석 중 아이콘" />
    //   <img className="h-9 w-16" src={thumbnail} alt="썸네일 이미지" />
    //   {videoTitle}
    //   {videoLength}초
    //   {statusContents}
    // </div>
    <Link
            to={
              data.mode === "1"
                ? `/practice/${gameId}`
                : `/game/${gameId}`
            }
          >
    <div className="flex absoulte w-[320px] h-31 left-59 top-395">
      
      <div className='flex mt-2 gap-2 items-center'>
        <img className="h-8 mb-1 w-8" src={complete} alt="분석 중 아이콘" />
        <img className="h-11 w-16" src={thumbnail} alt="썸네일 이미지" />
        <div className='flex flex-col'>
          <div>{videoTitle}</div>
          <div>
          <span className='text-gray-400'>{statusContents}</span>
          </div>
        </div>
      </div>
      
      
      
    </div>
    </Link>
  );
};

export default StatusNotAssignedItem;