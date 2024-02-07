import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/prueba.module.css'


const Log = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [creo, setCreo] = useState(false);



  const iniciar = async () => {
    try {
      // Realizar la solicitud POST al endpoint del servidor
      const response = await axios.post("http://localhost:5000/api/users/login", {
        user: user,
        password: password,
      });
      console.log("endpoint:", response.data);
      const sesion = true;
      localStorage.setItem('sesion',sesion.toString())
      setCreo(!creo);
      window.location.assign('/Game')
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };



  const mounted = React.useRef(true);

  useEffect(() => {
    // Se ejecuta cuando el componente se monta
    localStorage.removeItem('sesion')
    mounted.current = true;

    // Limpia la referencia cuando el componente se desmonta
    return () => {
      mounted.current = false;
    };
  }, []);

  // Llama a obtenerUsuarios al montar el componente para cargar la lista inicial
  useEffect(() => {


    // Establece un intervalo para obtener usuarios cada 5 segundos
    

    // Limpia el intervalo cuando el componente se desmonta

  }, []); 

  return (
    <div>
      <div className={styles.form}> 
      <h2>Iniciar Sesion</h2>
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <a href="/CrearUsuario">crear user</a>
      <button onClick={iniciar}>Iniciar Sesion</button>
      {creo ? <p>MAMALON</p> : <p></p>}
      </div>      
    </div>
  );
};

export default Log;
