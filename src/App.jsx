import { useEffect, useState } from "react";
import ChatComponent from "./components/Chat";
import styles from './styles/prueba.module.css'
const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [titPregunta, setTitPregunta] = useState();
  const [respuestasPreg, setRespuestasPreg] = useState();

  useEffect(() => {
    // Se ejecuta al montar el componente
    const newSocket = new WebSocket("ws://localhost:3000");

    newSocket.addEventListener("open", () => {
      console.log("Conectado al servidor WebSocket",newSocket.readyState);
   
    });

    newSocket.addEventListener("error", (error) => {
      console.error("Error en la conexión WebSocket:", error);
    });
  
    newSocket.addEventListener("close", () => {
      console.log("Conexión cerrada. Estado:", newSocket.readyState);
    });

    newSocket.addEventListener("message", (event) => {
      const mensaje = JSON.parse(event.data);
      console.log("datosss", mensaje);

      if (mensaje.tipo === "pregunta") {
        mostrarPregunta(mensaje);
      } else if (mensaje.tipo === "resultado") {
        mostrarResultado(mensaje);
      } else if (mensaje.tipo === "mensaje") {
        mostrarMensaje(mensaje);
      }
    });

    setSocket(newSocket);

    // Se ejecuta al desmontar el componente
    return () => {
      newSocket.close();
    };
  }, []);

  const mostrarPregunta = (pregunta) => {
    // Implementa la lógica para mostrar la pregunta en el estado de React

    const tituloPregunta = pregunta.pregunta;
    setTitPregunta(tituloPregunta);
    const respuestasArray = pregunta.respuestas || [];
    setRespuestasPreg(respuestasArray);
    console.log("repuestas que HAY", respuestasArray);

    const respuestasUL = document.getElementById("respuestasUL");
    respuestasArray.forEach((respuesta) => {
      const li = document.createElement("li");
      li.textContent = respuesta;
      li.addEventListener("click", () => enviarRespuesta(respuesta));
      respuestasUL.appendChild(li);
    });
  };

  const mostrarResultado = (resultado) => {
    // Implementa la lógica para mostrar el resultado en el estado de React
  };

  const mostrarMensaje = (mensaje) => {
    // Implementa la lógica para mostrar el mensaje en el estado de React
  };

  const enviarRespuesta = (respuesta) => {
    console.log("del boton", respuesta);
    console.log("Conectado al servidor WebSocket",socket.readyState);
    console.log("Estado del socket:", socket); // Agrega esto para depurar

    if (socket && socket.readyState === WebSocket.OPEN) {
      const respuestaSeleccionada = {
        tipo: "respuesta",
        respuesta: respuesta,
      };
      socket.send(JSON.stringify(respuestaSeleccionada));
    } else {
      console.error("El socket no está disponible o no está abierto.");
    }
  };

  const enviarRespuestaDesdeInput = () => {
    const inputRespuesta = document.getElementById("respuestaInput");
    const respuesta = inputRespuesta.value;
    if (respuesta) {
      enviarRespuesta(respuesta);
      inputRespuesta.value = ""; // Limpiar el input después de enviar la respuesta
    }
  };

  return (
    <div className={styles.div}>
      <h1>La app que te prepara para geoguessr</h1>
      <h1>Preguntas</h1>
      <h2>{titPregunta}</h2>

      <ul id="respuestasUL">
        {''}
      </ul>

      <div id="pregunta"></div>
      <ul id="respuestas"></ul>
      <input
        type="text"
        id="respuestaInput"
        placeholder="Ingrese su respuesta"
      />
      <button onClick={enviarRespuestaDesdeInput}>Enviar Respuesta</button>
      <h1>ABAJO EL CHAT</h1>
      <ChatComponent />
    </div>
  );
};

export default WebSocketComponent;
