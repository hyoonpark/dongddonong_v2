import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import Toast from "../../components/Modal/Toast";
import share from "../../assets/icon/share.png";
import styles from "./HightLight.module.css";

const HighLight = () => {
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
        className="absolute w-8 right-1 top-1 z-10 cursor-pointer"
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
        url="https://player.vimeo.com/external/480437160.sd.mp4?s=8cc88c0030d7e674a75656c8af76a0582fbc438b&profile_id=165&oauth2_token_id=57447761"
        controls
        ref={videoRef}
        width={"100%"}
      ></ReactPlayer>

      <Toast toastOpen={toastOpen}>링크를 클립보드에 복사했습니다.</Toast>
    </div>
  );
};

export default HighLight;
