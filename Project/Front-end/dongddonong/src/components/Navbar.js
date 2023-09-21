import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import KakaoLogin from "./../components/Login/KakaoLogin";
import LoginModal from "./../components/Login/LoginModal";
import video from "../assets/icon/video.png";
import VideoModal from "./VideoModal";

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

  return (
    <nav className="h-20">
      <div className="flex items-center justify-between h-20 px-4 mx-auto border-b border-black max-w-7xl">
        <Link to="/">
          <img
            className="h-14"
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="로고"
          />
        </Link>

        <div className="w-1/4"></div>
        <ul className="flex items-center justify-between w-1/3">
          <Link to="/game">
            <Li>경기</Li>
          </Link>

          <Link to="/recordroom">
            <Li>기록실</Li>
          </Link>
          <Li onClick={() => setIsModalOpen(true)}>로그인</Li>
        </ul>

        <button>
          <img className="w-8" src={video} alt="업로드" />
        </button>
      </div>

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={KakaoLogin}
      />
      <VideoModal></VideoModal>
    </nav>
  );
};

export default Navbar;
