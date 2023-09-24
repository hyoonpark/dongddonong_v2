import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GamePage from './pages/Game/GamePage';
import Recordroom from './pages/Recordroom/Recordroom';
import LoginLoading from './components/Login/LoginLoading';
import { useUserContext } from './contexts/userContext';


function App() {
  // context 로그인 여부에 따라서 라우팅 접근을 제한한다. 
  const { loggedIn } = useUserContext();
  // const accessToken = localStorage.getItem('accessToken');


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/game"
          element={loggedIn ? <GamePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/recordroom"
          element={loggedIn ? <Recordroom /> : <Navigate to="/" replace />}
        />
        <Route path="/oauth/callback/kakao" element={<LoginLoading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
