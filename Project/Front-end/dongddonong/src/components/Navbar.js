import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import KakaoLogin from './../components/Login/KakaoLogin';
import LoginModal from './../components/Login/LoginModal';
import { useUserContext } from "../constexts/userContext";

const Li = styled.li`
  position: relative;
  display: inline-block;
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    margin-top: 0.25rem;
    background-color: primary;
    width: 0;
    height: 1px;
    transition: all 0.3s;
  }
  &:hover:before {
    width: 100%;
  }
`;

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loggedIn } = useUserContext();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  return (
    <nav className="h-20 border-black border-b">
      <div className="flex justify-between items-center h-20 max-w-7xl mx-4 mb:m-auto">
        <Link to="/">
          <img
            className="h-14"
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="로고"
          />
        </Link>
        <ul className="w-1/2 flex justify-between md:w-1/3">
          <Link to="/">
            <Li>홈</Li>
          </Link>
          {loggedIn ? (
            <>
              <Link to="/game">
                <Li>경기</Li>
              </Link>
              <Link to="/recordroom">
                <Li>기록실</Li>
              </Link>
              <Li>로그아웃</Li>
            </>
          ) : (
            <>
              <Li onClick={handleLoginClick}>경기</Li>
              <Li onClick={handleLoginClick}>기록실</Li>
              <Li onClick={handleLoginClick}>로그인</Li>
            </>
          )}
        </ul>
      </div>
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={KakaoLogin}
      />
    </nav>
  );
};

export default Navbar;
