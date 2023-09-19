import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Game from "./pages/Game/Game";
import LoginLoading from "./components/LoginLoading";
import RecordRoom from "./components/Recordroom/Recordroom"

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/recordroom" element={<RecordRoom />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/oauth/callback/kakao" element={<LoginLoading />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;