import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import Toast from "../../components/Modal/Toast";
import share from "../../assets/icon/share.png";
import styles from "./HightLight.module.css";

const HighLight = (props) => {
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
      ></ReactPlayer>

      <Toast toastOpen={toastOpen}>링크를 클립보드에 복사했습니다.</Toast>
    </div>
  );
};

export default HighLight;
