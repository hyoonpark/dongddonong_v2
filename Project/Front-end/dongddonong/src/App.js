import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GamePage from './pages/Game/GamePage';
import RecordRoom from './components/Recordroom/Recordroom';
import LoginLoading from './components/Login/LoginLoading';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recordroom" element={<RecordRoom />}/>
        <Route path="/game" element={<GamePage />}/>
        <Route path="/oauth/callback/kakao" element={<LoginLoading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
