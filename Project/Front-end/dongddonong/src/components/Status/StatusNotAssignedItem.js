import React from 'react';
import complete from '../../assets/complete.png'

const StatusNotAssignedItem = ({ data }) => {
  const thumbnail = data.thumbnail
  const videoTitle = data.fileName
  const videoLength = parseFloat(data.videoLength).toFixed(1);
  const statusContents = ' · 분석 완료! 분류가 필요해요..'

  return (
    <div className="absoulte w-272 h-80 left-59 top-395">
      <img className="h-8 w-8" src={complete} alt="분석 중 아이콘" />
      <img className="h-9 w-16" src={thumbnail} alt="썸네일 이미지" />
      {videoTitle}
      {videoLength}초
      {statusContents}
    </div>
  );
};

export default StatusNotAssignedItem;