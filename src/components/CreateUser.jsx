import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/prueba.module.css'

const Log = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [creo, setCreo] = useState(false);

  const handleCrearUsuario = async () => {
    try {
      // Realizar la solicitud POST al endpoint del servidor
      const response = await axios.post("http://localhost:5000/api/users/", {
        user: user,
        password: password,
      });

      console.log("Usuario creado:", response.data);

      setCreo(!creo);
      alert("Usuario creado exitosamente");
      window.location.assign("/");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/");
      console.log("Usuarios obtenidos:", response.data);
      if (mounted.current) {
        setUsuarios(response.data);
        console.log("seteoseteo:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const mounted = React.useRef(true);

  useEffect(() => {
    // Se ejecuta cuando el componente se monta
    mounted.current = true;

    // Limpia la referencia cuando el componente se desmonta
    return () => {
      mounted.current = false;
    };
  }, []);

  // Llama a obtenerUsuarios al montar el componente para cargar la lista inicial
  useEffect(() => {
    obtenerUsuarios();

    // Establece un intervalo para obtener usuarios cada 5 segundos
    const intervalId = setInterval(obtenerUsuarios, 10000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <div className={styles.form}>
        <h2>Crear Usuario</h2>
        <label>
          Usuario:
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <label>
          Contra
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleCrearUsuario}>Crear Usuario</button>
        <a href="/">Ya tengo una cuenta</a>
      </div>




      <div className={styles.form}>
      <h2>Usuarios Creados</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.user}>--{usuario.user}--</li>
        ))}
      </ul>
      </div>
      
    </div>
  );
};

export default Log;
