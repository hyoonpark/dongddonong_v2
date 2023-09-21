import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GamePage from "./pages/Game/GamePage";
import RecordRoom from "./components/Recordroom/Recordroom";
import LoginLoading from './components/Login/LoginLoading';

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/recordroom" element={<RecordRoom />}></Route>
        <Route path="/game" element={<GamePage />}></Route>
        <Route path="/oauth/callback/kakao" element={<LoginLoading />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
