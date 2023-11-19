import { NavLink } from "react-router-dom";
import { useState } from "react";

/* eslint-disable react/prop-types */
export const UsersAdminRowUnidad = ({
  id,
  key,
  estado,
  edificio_id,
  nro,
  piso,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{estado}</td>
      <td>{}</td>
      <td>{nro}</td>
      <td>{piso}</td>
      {/* <td>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            setPassForm(true);
            handlerUserSelectedForm({
              nombre,
              dni,
              edad,
              username,
              email,
              tipoPersona,
            });
          }}
        >
          Password
        </button>
      </td> */}
    </tr>
  );
};
