import { forwardRef, useEffect, memo } from "react";

import upload from "../../assets/icon/upload.png";
import time from "../../assets/icon/time.png";
import check from "../../assets/icon/check.png";
import UploadModal from "../UploadModal/UploadModal";

const VideoModal = forwardRef((_, ref) => {
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
        <div className="py-3 border-b border-black">
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
    </>
  );
});

export default memo(VideoModal);
