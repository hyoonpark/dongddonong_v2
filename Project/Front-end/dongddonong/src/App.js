import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Modal from './components/common/Modal';
import CallbackKakao from './components/login/CallbackKakao';

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/oauth/callback/kakao" element={<CallbackKakao />}></Route>
      </Routes>
      <Modal></Modal>
    </BrowserRouter>
  );
}

export default App;
