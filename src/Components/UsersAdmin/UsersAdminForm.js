/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import OptionSelectDropdown from "../OptionSelectDropdown";
import { Navigate } from "react-router-dom";
import { AddUser } from "../../Services/UsersService";

export const UsersAdminForm = ({
  handlerCloseForm,
  userSelected,
  initialUserForm,
}) => {
  const handlerAddUser = async (user) => {
    const resUser = await AddUser(user);
    resUser ? alert("Usuario creado") : alert("Usuario actualizado");
    handlerCloseForm();
    Navigate("/usersAdmin");
  };

  const [userForm, setUserForm] = useState(userSelected);
  const { dni, edad, email, nombre, tipoPersona, username, password } =
    userForm;

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
    console.log(userForm);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || (dni === 0 && !password) || !email) {
      alert("Error de validación");
      return;
    }
    if (!email.includes("@")) {
      alert("Error de validación");
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
        placeholder="DNI"
        name="dni"
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Nombre"
        name="nombre"
        value={nombre}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Edad"
        name="edad"
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <OptionSelectDropdown
        listOption={["Administrador", "Usuario"]}
        userForm={userForm}
        setUserForm={setUserForm}
        tipoPersona={tipoPersona}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Password"
        type="password"
        name="password"
        value={password}
        onChange={onInputChange}
      />
      <button className="btn btn-primary" type="submit">
        {dni > 1 ? "Editar" : "Crear"}
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
