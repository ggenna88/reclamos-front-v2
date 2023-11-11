import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
export const UsersAdminRow = ({
  nombre,
  dni,
  edad,
  username,
  email,
  tipoPersona,
}) => {
  return (
    <tr>
      <td>{dni}</td>
      <td>{nombre}</td>
      <td>{edad}</td>
      <td>{tipoPersona}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <button className="btn btn-secondary" type="button">
          Update
        </button>
      </td>
      <td>
        <button className="btn btn-danger" type="button">
          Remove
        </button>
      </td>
    </tr>
  );
};
