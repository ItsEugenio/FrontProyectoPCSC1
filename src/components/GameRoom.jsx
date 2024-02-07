import { useEffect, useState } from "react";
import Otro from "./Otro";
import UsersOnline from "./UsersOnline";
import styles from "../styles/prueba.module.css";

const GameRoom = () => {
  const [socket, setSocket] = useState(null);
  const [titPregunta, setTitPregunta] = useState();
  const [respuestasPreg, setRespuestasPreg] = useState();
  const [misesion, setMisesion] = useState(false);
  const [respuCli, setRespuCli] = useState("");

  useEffect(() => {
    // Se ejecuta al montar el componente
    const estadoSesion = JSON.parse(localStorage.getItem("sesion"));
    if (estadoSesion == true) {
      console.log("sesion TRUE", estadoSesion);
      setMisesion(true);
    } else {
      console.log("sesion apagada");
    }
    console.log("estado de la sesion==>", estadoSesion);
    const newSocket = new WebSocket("ws://localhost:3000");

    newSocket.addEventListener("open", () => {
      console.log("Conectado al servidor WebSocket", newSocket.readyState);
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
    respuestasUL.innerHTML = ""; // Limpiar la lista antes de agregar nuevas respuestas

    respuestasArray.forEach((respuesta) => {
      const li = document.createElement("li");
      li.textContent = respuesta;
      li.addEventListener("click", () => respuestaClick(respuesta));
      respuestasUL.appendChild(li);
    });
  };

  const mostrarMensaje = (mensaje) => {
    // Implementa la lógica para mostrar el mensaje en el estado de React
    console.log("MOSTRAR MENSAJE", mensaje.contenido);
    setRespuCli(mensaje.contenido);
  };

  const enviarRespuestaDesdeInput = () => {
    const inputRespuesta = document.getElementById("respuestaInput");
    const newRespuesta = inputRespuesta.value;
    console.log("DESDE EL INPUT", newRespuesta);
    if (newRespuesta) {
      const respuestaSeleccionada = {
        tipo: "respuesta",
        respuesta: newRespuesta,
      };

      socket.send(JSON.stringify(respuestaSeleccionada));

      inputRespuesta.value = ""; // Limpiar el input después de enviar la respuesta
    } else {
      console.error("El socket no está disponible o no está abierto.");
    }
  };

  const respuestaClick = (respuesta) => {
    const newRespuesta = respuesta;
    console.log("DESDE EL click", newRespuesta);
    console.log("tipo de datos respuesta btn", typeof newRespuesta);
    if (newRespuesta) {
      const respuestaSeleccionadaClick = {
        tipo: "respuesta",
        respuesta: newRespuesta,
      };
      socket.send(JSON.stringify(respuestaSeleccionadaClick));
    } else {
      console.error("El socket no está disponible o no está abierto.");
    }
  };

  return (
    <div className={styles.div}>
      {misesion ? (
        <>
          <a href="/">TERMINAR SESION</a>
          <h1>La app que te prepara para geoguessr</h1>
          <UsersOnline />
          <h1>Preguntas</h1>

          <h2>{titPregunta}</h2>
          <p>{respuCli}</p>
          <ul id="respuestasUL">{""}</ul>

          <div id="pregunta"></div>
          <ul id="respuestas"></ul>
          <input
            type="text"
            id="respuestaInput"
            placeholder="Ingrese su respuesta"
          />
          <button onClick={enviarRespuestaDesdeInput}>Enviar Respuesta</button>

          <h1>ABAJO EL CHAT</h1>
          <Otro />
        </>
      ) : (
        <>
          <h1>Preguntas Geoguessr</h1>
          <h1>No has inciado sesion</h1>
          <h3>Inicia sesion para poder jugar</h3>
          <a href="/">
            <button>
              <h3>Iniciar Sesion</h3>
            </button>
          </a>
        </>
      )}
    </div>
  );
};

export default GameRoom;
