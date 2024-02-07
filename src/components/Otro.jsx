import { io } from "socket.io-client";
import { useState, useEffect } from "react";


const socket = io("http://localhost:4000");

const Otro = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);


  useEffect(() => {

    socket.on("connect", () => {
      console.log("conectado al chat");
      setIsConnected(true);

    });

    socket.emit('joinRoom', 'geoguessr');

    socket.on("messageRoom", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
      console.log('mensajes de data', mensajes)
    });



    return () => {
      socket.off("connect");
      socket.off("messageRoom");
    };
  }, []);


  const enviarMensaje = () => {
    const messageObject = {
      type: 'messageRoom',
      content: nuevoMensaje,
      username: socket.id,
      room: 'geoguessr',
    };

    socket.emit('messageRoom', messageObject);
    console.log('FUNCION MESAGE',messageObject)
    const input = document.getElementById("inputChatRoom")
    input.value= "";
  };


  return (
    <div>
      <h1>C H A T -- R O O M S</h1>
      <h2>{isConnected ? "CONECTADO" : "NO CONECTADO"}</h2>
      <ul>
        {mensajes.map((mensaje) => (
          <li key={mensaje}>
            {mensaje.username}: {mensaje.content}
          </li>
        ))}
      </ul>
      <input id="inputChatRoom" type="text" onChange={(e) => setNuevoMensaje(e.target.value)} />
      <button onClick={enviarMensaje}>Enviar</button>

   
    </div>
  );
};

export default Otro;
