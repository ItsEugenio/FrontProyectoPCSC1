import { useState, useEffect } from "react";
import axios from "axios";

const UsersOnline = () => {
  const [longitudObjeto, setLongitudObjeto] = useState(0);
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/");
      console.log("Usuarios obtenidos:", response.data);
      if (response) {
        const cantUsers = response.data;
        setLongitudObjeto(Object.keys(cantUsers).length);
        console.log("seteoseteo:", response.data.length);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };
  useEffect(() => {
   
    const intervalId = setInterval(obtenerUsuarios, 5000);
    obtenerUsuarios();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>Usuarios creados :{longitudObjeto}</p>
    </div>
  );
};

export default UsersOnline;
