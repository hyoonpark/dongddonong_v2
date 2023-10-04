import React from 'react';
import loading from '../../assets/loading.png'

const StatusAnalzeItem = ({ data }) => {
  const thumbnail = data.thumbnail
  const videoTitle = data.fileName
  const videoLength = parseFloat(data.videoLength).toFixed(1); const statusContents = ' · 분석 중..'

  return (
    <div className="absoulte w-272 h-30 left-59 top-395">
      <img className="h-8 w-8" src={loading} alt="분석 중 아이콘" />
      <img className="h-9 w-16" src={thumbnail} alt="썸네일 이미지" />
      {videoTitle}
      {videoLength}초
      {statusContents}
    </div>
  );
};

export default StatusAnalzeItem;