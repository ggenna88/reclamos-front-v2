/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import OptionSelectDropdown from "../FormSelectOption";

export const UsersAdminForm = ({
  handlerCloseForm,
  userSelected,
  initialUserForm,
}) => {
  const handlerAddUser = (user) => {
    //invocar servicio addUser
    // Swal.fire(
    //   user.id === 0 ? "Usuario creado" : "Usuario actualizado",
    //   user.id === 0
    //     ? "El usuario ha sido creado con éxito!"
    //     : "El usuario ha sido actualizado con éxito!",
    //   "success"
    // );
    // handlerCloseForm();
    // Navigate("/usersAdmin");
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
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || (dni === 0 && !password) || !email) {
      // Swal.fire(
      //   "Error de validación",
      //   "Debe completar los datos del formulario.",
      //   "error"
      // );
      return;
    }
    if (!email.includes("@")) {
      // Swal.fire("Error de validación", "Email incorrecto.", "error");
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
      <input
        className="form-control my-3 w-75"
        placeholder="Tipo Persona"
        name="tipoPersona"
        value={tipoPersona}
        onChange={onInputChange}
      />
      <OptionSelectDropdown listOption={["Administrador", "Usuario"]} />
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
