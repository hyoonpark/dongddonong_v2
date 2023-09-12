import { Link } from "react-router-dom";

import "./Navbar.css";
import Games from "../assets/Games.png";
import Task from "../assets/Task.png";
import Profile from "../assets/Profile.png";

const Navbar = () => {
  return (
    <nav className="h-20 mb-4 shadow-md">
      <div class="flex justify-between items-center h-20 max-w-7xl mx-4 mb:m-auto">
        <Link to="/">
          <img
            className="h-14"
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="로고"
          />
        </Link>
        <ul class="md:hidden flex justify-between w-20">
          <li>
            <img src={Games} alt="게임" />
          </li>
          <li>
            <img src={Task} alt="기록" />
          </li>
          <li>
            <img src={Profile} alt="마이페이지" />
          </li>
        </ul>

        <ul class="hidden md:flex space-x-8">
          <li>홈</li>
          <li>경기</li>
          <li>기록실</li>
          <li>로그인</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
