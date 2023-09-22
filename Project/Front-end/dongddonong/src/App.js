import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GamePage from './pages/Game/GamePage';
import RecordRoom from './components/Recordroom/Recordroom';
import LoginLoading from './components/Login/LoginLoading';
import { useUserContext } from './constexts/userContext';


function App() {
  const { loggedIn } = useUserContext();

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
          element={loggedIn ? <RecordRoom /> : <Navigate to="/" replace />}
        />
        <Route path="/oauth/callback/kakao" element={<LoginLoading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
