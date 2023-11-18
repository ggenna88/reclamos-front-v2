import { NavLink } from "react-router-dom";
import { useState } from "react";

/* eslint-disable react/prop-types */
export const UsersAdminRow = ({
  nombre,
  dni,
  edad,
  username,
  email,
  tipoPersona,
  handlerUserSelectedForm,
  setPassForm,
}) => {
  const [actionRemove, setActionRemove] = useState(false);
  return (
    <tr>
      <td>{dni}</td>
      <td>{nombre}</td>
      <td>{edad}</td>
      <td>{tipoPersona}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            setPassForm(false);
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
          Modificar
        </button>
      </td>

      <td>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            setPassForm(false);
            setActionRemove(true);
            handlerUserSelectedForm(
              {
                nombre,
                dni,
                edad,
                username,
                email,
                tipoPersona,
              },
              actionRemove
            );
          }}
        >
          Remove
        </button>
      </td>
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
