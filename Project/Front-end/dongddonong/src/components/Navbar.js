import React, { useState } from "react";
import { Link } from "react-router-dom";

import Modal from './common/Modal';
import SocialLogin from './login/SocialLogin';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <li className="transition-all border-black delay-100 ease-in-out hover:border-b">
            경기
          </li>
          <li>기록실</li>
          <li>
            <button onClick={openModal}>로그인</button>
          </li>
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onLogin={SocialLogin} />
    </nav>
  );
};

export default Navbar;
