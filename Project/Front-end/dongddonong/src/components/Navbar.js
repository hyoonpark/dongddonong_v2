import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import KakaoLogin from "./../components/Login/KakaoLogin";
import LoginModal from "./../components/Login/LoginModal";
import { useUserContext } from "../contexts/userContext";
import video from "../assets/icon/video.png";
import VideoModal from "./Modal/VideoModal";
import Wrapper from "../components/Wrapper";

const Li = styled.li`
  position: relative;
  display: inline-block;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    bottom: -2px;
    margin-top: 0.25rem;
    background-color: var(--primary);
    width: 0;
    height: 2px;
    transition: all 0.4s;
  }
  &:hover:before {
    width: 100%;
  }
  &.active:before {
    width: 100%;
  }
`;

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const location = useLocation();
  const { setLoggedOut } = useUserContext();
  const accessToken = localStorage.getItem("accessToken");
  const { user } = useUserContext();
  const videoRef = useRef(null);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    setLoggedOut();
  };

  return (
    <nav className="h-20 border-b border-black">
      <Wrapper>
        <div className="relative flex items-center justify-between h-20">
          <Link to="/">
            <img
              className="h-14"
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="로고"
            />
          </Link>

          <div className="w-1/12 max-w-xs md:w-1/4"></div>
          {!accessToken ? (
            <>
              <Li onClick={handleLoginClick}>경기</Li>
              <Li onClick={handleLoginClick}>기록실</Li>
              <Li onClick={handleLoginClick}>로그인</Li>
            </>
          ) : (
            <>
              <Link to="/game">
                <Li className={location.pathname === "/game" ? "active" : ""}>
                  경기
                </Li>
              </Link>
              <Link to="/recordroom">
                <Li
                  className={
                    location.pathname === "/recordroom" ? "active" : ""
                  }
                >
                  기록실
                </Li>
              </Link>
              <Li onClick={handleLogoutClick}>로그아웃</Li>
            </>
          )}
          {user && <button
            className=""
            onClick={() => {
              setVideoModalOpen(true);
              videoRef.current.classList.toggle("scale-0");
            }}
          >
            <img className="w-8" src={video} alt="업로드" />
          </button>}
          <VideoModal
            ref={videoRef}
            videoModalOpen={videoModalOpen}
          ></VideoModal>
        </div>
      </Wrapper>
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={KakaoLogin}
      />
    </nav>
  );
};

export default Navbar;
