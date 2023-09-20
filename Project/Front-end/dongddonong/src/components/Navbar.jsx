import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import KakaoLogin from './../components/Login/KakaoLogin';
import LoginModal from './../components/Login/LoginModal';

const Li = styled.li`
  position: relative;
  display: inline-block;
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    margin-top: 0.25rem;
    background-color: orange;
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

  return (
    <nav className="h-20 border-black border-b">
      <div class="flex justify-between items-center h-20 max-w-7xl mx-4 mb:m-auto">
        <Link to="/">
          <img
            className="h-14"
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="로고"
          />
        </Link>
        <ul class="w-1/2 flex justify-between md:w-1/3">
          <li className="hidden md:block">홈</li>
          <Link to="/game">
            <Li>경기</Li>
          </Link>

          <Link to="/recordroom">
            <Li>기록실</Li>
          </Link>
          <Li onClick={() => setIsModalOpen(true)}>로그인</Li>
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
