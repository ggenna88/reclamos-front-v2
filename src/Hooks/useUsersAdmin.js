import { useReducer, useState } from "react";
import Swal from "sweetalert2";
import { usersAdminReducer } from "../Reducers/usersAdminReducer";
import { useNavigate } from "react-router-dom";
import UsersServiceGetAll from "../Services/UsersService";

const initialUsers = [];

const initialUserForm = {
  id: 0,
  username: "",
  password: "",
  email: "",
};

export const useUsersAdmin = () => {
  const [users, dispatch] = useReducer(usersAdminReducer, initialUsers);
  const getUsers = async () => {
    const result = await UsersServiceGetAll();
    console.log(result);
    dispatch({
      type: "loadingUsers",
      payload: result,
    });
  };
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();
  const handlerAddUser = (user) => {
    //invocar servicio addUser
    Swal.fire(
      user.id === 0 ? "Usuario creado" : "Usuario actualizado",
      user.id === 0
        ? "El usuario ha sido creado con éxito!"
        : "El usuario ha sido actualizado con éxito!",
      "success"
    );
    handlerCloseForm();
    navigate("/usersAdmin");
  };

  const handlerRemoveUser = (id) => {
    Swal.fire({
      title: "Está seguro?",
      text: "Cuidado el usuario será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        //invocar servicio removeUser
        Swal.fire(
          "Usuario eliminado!",
          "El usuario ha sido eliminado con éxito.",
          "success"
        );
      }
    });
  };

  const handlerUserSelectedForm = (user) => {
    setUserSelected({ ...user });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  };

  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    getUsers,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
  };
};
