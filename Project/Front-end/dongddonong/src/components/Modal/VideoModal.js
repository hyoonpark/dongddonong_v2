import { forwardRef, useState } from "react";

import upload from "../../assets/icon/upload.png";
import time from "../../assets/icon/time.png";
import check from "../../assets/icon/check.png";
import UploadModal from "../UploadModal/UploadModal";

const VideoModal = forwardRef((props, ref) => {

  const [isOpen, setIsOpen]= useState(false)

  const closeHandler = () => {
    setIsOpen(null)
  }
  

  return (
    <div
      ref={ref}
      className="absolute z-10 w-64 px-2 transition-all origin-top-right scale-0 bg-white border rounded-md shadow right-4 top-14"
    >
      {isOpen && (
        <UploadModal
          onConfirm={closeHandler}
        />
      )}
      <div onClick={()=>setIsOpen(true)} className="py-3 border-b border-black">
        <img className="inline h-6 pr-4" src={upload} alt="업로드" />
        영상 업로드
      </div>
      <div className="py-3">
        최근 영상
        <div className="flex flex-col pt-3">
          <div className="pb-2">
            <img className="inline w-12 pr-4" src={time} alt="업로드" />
            분석중
          </div>
          <div className="pb-2">
            <img className="inline w-12 pr-4" src={time} alt="업로드" />
            분석 완료, (분류 필요)
          </div>
          <div className="pb-2">
            <img className="inline w-12 pr-4" src={check} alt="업로드" />
            분석 완료, (분류 필요)
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoModal;
