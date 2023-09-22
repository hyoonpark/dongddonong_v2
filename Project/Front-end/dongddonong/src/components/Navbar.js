import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import KakaoLogin from "./../components/Login/KakaoLogin";
import LoginModal from "./../components/Login/LoginModal";
import { useUserContext } from "../constexts/userContext";

import video from "../assets/icon/video.png";
import VideoModal from "./Modal/VideoModal";
import Wrapper from "../components/Wrapper";

const Li = styled.li`
  position: relative;
  display: inline-block;
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    margin-top: 0.25rem;
    background-color: var(--primary);
    width: 0;
    height: 2px;
    transition: all 0.3s;
  }
  &:hover:before {
    width: 100%;
  }
`;

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { loggedIn, setLoggedOut } = useUserContext();
  const videoRef = useRef(null);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    setLoggedOut()
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
          {loggedIn ? (
            <>
              <Link to="/game">
                <Li>경기</Li>
              </Link>
              <Link to="/recordroom">
                <Li>기록실</Li>
              </Link>
              <Li onClick={handleLogoutClick}>로그아웃</Li> 
            </>
          ) : (
            <>
              <Li onClick={handleLoginClick}>경기</Li>
              <Li onClick={handleLoginClick}>기록실</Li>
              <Li onClick={handleLoginClick}>로그인</Li>
            </>
          )}
          <button
            onClick={() => {
              setVideoModalOpen(true);
              videoRef.current.classList.toggle("scale-0");
            }}
          >
            <img className="w-8" src={video} alt="업로드" />
          </button>
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
