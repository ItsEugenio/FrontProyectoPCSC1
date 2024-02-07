import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from './components/Game'
import Login from './components/Log'
import CreateUser from './components/CreateUser'
import GameRoom from "./components/GameRoom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/CrearUsuario" element={<CreateUser/>} />
        <Route path="/Game" element={<Game />} />
        <Route path="/GameRoom" element={<GameRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
