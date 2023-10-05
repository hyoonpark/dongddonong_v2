import React from 'react';
// import loading from '../../assets/loading.png'
import loading from '../../assets/loading.gif'

const StatusAnalzeItem = ({ data }) => {
  const thumbnail = data.thumbnail
  const videoTitle = data.fileName
  const videoLength = parseFloat(data.videoLength).toFixed(1); const statusContents = ' · 분석 중..'
  
  return (
    <div className="flex absoulte w-[320px] h-31 left-59 top-395">
      
      <div className='flex mt-2 gap-2 items-center'>
        <img className="h-8 mb-1 w-8" src={loading} alt="분석 중 아이콘" />
        <img className="h-11 w-16" src={thumbnail} alt="썸네일 이미지" />
        <div className='flex flex-col'>
          <div>{videoTitle}</div>
          <div>
          <span>{videoLength}초</span><span className='text-gray-400'>{statusContents}</span>
          </div>
        </div>
      </div>
      
      
      
    </div>
  );
};

export default StatusAnalzeItem;