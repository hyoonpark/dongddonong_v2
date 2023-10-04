import React from 'react';
import complete from '../../assets/complete.png'
import loading from '../../assets/loading.png'

const StatusItem = ({ data }) => {
  // console.log('와랏 데이터', data)
  const thumbnail = data.thumbnail
  const videoTitle = data.fileName
  const videoLength = data.videoLength
  const isAnalyzing = data.isAnalyzing
  const statusContents = {
    loading: '분석 중..',
    complete: '분석 완료! 분류가 필요해요..'
  }

  // 분석 상태 T/F
  const statusText = isAnalyzing ? statusContents.loading : statusContents.complete;
  const statusIcon = isAnalyzing ? loading : complete;

  return (
    <div className="absoulte w-272 h-80 left-59 top-395">
      <div className="absoulte inset-0 bg-white shadow-md"></div>
      <div className="absoulte left-7.35 right-80.88 top-30 bottom-30">
        {/* 이 아이콘을 어떻게 처리할지에 따라 클래스가 다를 수 있음 */}
        <img src={statusIcon} alt="분석 중 아이콘" />
      </div>
      <div className="absoulte left-7.35 right-80.88 top-30 bottom-30 bg-black"></div>
      <div className="absoulte left-53.68 right-6.25 top-22.5 bottom-52.5 font-sans font-normal text-16 leading-20 text-center text-black">
        {/* 텍스트 내용 */}
        {videoTitle}
      </div>
      <div className="absoulte left-22.79 right-49.26 top-22.5 bottom-21.25">
        <img className="h-9 w-16" src={thumbnail} alt="썸네일 이미지" />
      </div>
      <div className="absoulte left-53.68 right-34.19 top-53.75 bottom-21.25 font-sans font-normal text-16 leading-20 text-center text-opacity-50">
        {/* 비디오 길이 텍스트 */}
        {videoLength}
      </div>
      <div className="absoulte left-68.75 right-3.68 top-53.75 bottom-21.25 font-sans font-normal text-16 leading-20 text-center text-opacity-50">
        {/* 콘텐츠 텍스트 */}
        {statusText}
      </div>
    </div>
  );
};

export default StatusItem;