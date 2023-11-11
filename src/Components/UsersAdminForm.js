/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UsersAdminContext } from "../Context/UsersAdmin/UsersAdminContext";

export const UsersAdminForm = ({ handlerCloseForm, userSelected }) => {
  const { handlerAddUser, initialUserForm } = useContext(UsersAdminContext);
  const [userForm, setUserForm] = useState(initialUserForm);
  const { id, username, password, email } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: "",
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || (id === 0 && !password) || !email) {
      Swal.fire(
        "Error de validación",
        "Debe completar los datos del formulario.",
        "error"
      );
      return;
    }
    if (!email.includes("@")) {
      Swal.fire("Error de validación", "Email incorrecto.", "error");
    }
    handlerAddUser(userForm);
    setUserForm(initialUserForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      {id > 0 || (
        <input
          className="form-control my-3 w-75"
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      )}
      <input
        className="form-control my-3 w-75"
        placeholder="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <input type="hidden" name="id" value={id} />
      <button className="btn btn-primary" type="submit">
        {id > 0 ? "Editar" : "Crear"}
      </button>
      {!handlerCloseForm || (
        <button
          className="btn btn-primary mx-2"
          type="button"
          onClick={() => onCloseForm()}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
