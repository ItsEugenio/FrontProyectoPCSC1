import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:4000");

const ChatComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("conectado al chat");
      setIsConnected(true);
    });

    socket.on("chat_message", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
      console.log();
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, []);

  const enviarMensaje = () => {
    socket.emit("chat_message", {
      usuario: socket.id,
      mensaje: nuevoMensaje,
    });
    const input = document.getElementById("inputChat");
    input.value = "";
  };

  const GoRoom = () => {
    const inpuntGR = document.getElementById("goRoom");
    console.log("INPUT GOOO ROOMS", inpuntGR.value);
    if (inpuntGR.value === "geoguessr") {
      window.location.assign("/GameRoom");
    } else {
      alert("No existe la sala a la que quieres entrar");
    }
  };

  return (
    <div>
      <h2>{isConnected ? "CONECTADO" : "NO CONECTADO"}</h2>
      <ul>
        {mensajes.map((mensaje) => (
          <li key={mensaje}>
            {mensaje.usuario}: {mensaje.mensaje}
          </li>
        ))}
      </ul>
      <input
        id="inputChat"
        type="text"
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button onClick={enviarMensaje}>Enviar</button>
      <h3>Quieres entrar a una room chat</h3>
      <h3>Ingresa el codigo de la room </h3>
      <input id="goRoom" type="text"></input>
      <button onClick={GoRoom}>Entrar a la room</button>
    </div>
  );
};

export default ChatComponent;
