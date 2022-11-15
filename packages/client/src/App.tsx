import React from "react";
import { Routes, Route } from "react-router-dom";

import Friends from "./pages/Friends";
import Lobby from "./pages/Lobby";
import RoomDetail from "./pages/RoomDetail";
import RoomList from "./pages/RoomList";
import SeeMore from "./pages/SeeMore";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lobby />}></Route> {/* 로비페이지*/}
      <Route path="/friends" element={<Friends />}></Route> {/* 친구 목록 */}
      <Route path="/rooms" element={<RoomList />}></Route> {/* 채팅방 목록 */}
      <Route path="/rooms:roomId" element={<RoomDetail />}></Route>{/* 채팅방 상세 */}
      <Route path="/more" element={<SeeMore />}></Route> {/* 더보기 */}
    </Routes>
  );
}

export default App;
