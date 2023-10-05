import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import Toast from "../../components/Modal/Toast";
import share from "../../assets/icon/share.png";
import styles from "./HightLight.module.css";

const HighLight = (props) => {
  console.log("동영상 재생");
  const [toastOpen, SetToastOpen] = useState(false);
  const [videoURL, SetVideoURL] = useState("");
  const videoRef = useRef();

  const ToastCloseHandler = () => {
    SetToastOpen(false);
  };

  useEffect(() => {
    SetVideoURL(videoRef.current.props.url);
  }, [videoRef]);

  return (
    <div className="relative rounded-3xl">
      <img
        className="absolute w-8 right-1 top-1 z-40 cursor-pointer"
        src={share}
        alt="share"
        onClick={() => {
          window.navigator.clipboard.writeText(videoURL);
          SetToastOpen(true);

          setTimeout(() => {
            SetToastOpen(false);
          }, 2000);
        }}
      />
      <ReactPlayer
        url="https://dongddonong.s3.ap-northeast-2.amazonaws.com/1266.mp4"
        controls
        ref={videoRef}
        width={"100%"}
        poster="https://mblogthumb-phinf.pstatic.net/MjAxNzA1MzBfMTY4/MDAxNDk2MTQ3NTcyNDU3.o-Ua56y_QljYHt-b_67A2ychiUtDtPFJsDTCr0E_7a8g.XiGG5dAW__FwxmLlDKH7iYArlVx01vSQneQtFlXtMPsg.JPEG.dashlady1/%EC%99%BC%EC%86%90%EC%9D%80%EA%B1%B0%EB%93%A4%EB%BF%90.jpg?type=w800"
      ></ReactPlayer>

      <Toast toastOpen={toastOpen}>링크를 클립보드에 복사했습니다.</Toast>
    </div>
  );
};

export default HighLight;
