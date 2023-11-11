import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UsersAdminContext } from "../Context/UsersAdmin/UsersAdminContext";

/* eslint-disable react/prop-types */
export const UsersAdminRow = ({ id, username, email }) => {
  const { handlerRemoveUser, handlerUserSelectedForm } =
    useContext(UsersAdminContext);
  return (
    <tr>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() =>
            handlerUserSelectedForm({
              id,
              username,
              email,
            })
          }
        >
          Update
        </button>
      </td>
      <td>
        <NavLink
          className={"btn btn-secondary btn-sm"}
          to={"/users/edit/" + id}
        >
          update route
        </NavLink>
      </td>
      <td>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => handlerRemoveUser(id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
