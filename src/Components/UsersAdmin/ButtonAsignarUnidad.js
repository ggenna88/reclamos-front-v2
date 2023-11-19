// EdificioVerButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../Boton";
import { UpdateUnidadUser } from "../../Services/UsersService";

const ButtonAsignarUnidad = ({ id_unidad, username }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    let response = await UpdateUnidadUser(username, id_unidad);
    return response;
  };

  return (
    <Boton
      label="Asignar"
      onClick={() =>
        handleClick().then((res) => {
          if (res) {
            alert("Usuario actualizado");
            navigate("/usersall");
          } else {
            alert("La unidad no pudo ser asignada");
          }
        })
      }
    ></Boton>
  );
};

export default ButtonAsignarUnidad;
