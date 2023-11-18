import { React, useState, useEffect } from "react";
import { GetAllUsers, RemoveUser } from "../../Services/UsersService";
import { UsersAdminRow } from "./UsersAdminRow";
import { UsersAdminModalForm } from "./UsersAdminModalForm";
import { Navbar } from "../NavBar";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [passForm, setPassForm] = useState(true);

  const initialUserForm = {
    dni: null,
    edad: null,
    email: "",
    nombre: "",
    tipoPersona: "Tipo de persona...",
    username: "",
    password: "",
  };

  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [actionRemove, setActionRemove] = useState(false);

  const handlerUserSelectedForm = (user, remove = false) => {
    setActionRemove(remove);
    setUserSelected({ ...user });
    if (!actionRemove) {
      setVisibleForm(true);
    } else {
      handlerRemoveUser()
        .then((res) => alert(res))
        .then(setVisibleForm(false))
        .then(setActionRemove(false));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let initialUsers = await GetAllUsers();
      console.log(initialUsers);
      return initialUsers;
    };
    fetchUsers().then((res) => setUsers(res));
  }, [visibleForm]);

  const handlerOpenForm = () => {
    setPassForm(true);
    setVisibleForm(true);
  };

  const handlerRemoveUser = async (user) => {
    // eslint-disable-next-line no-restricted-globals
    let result = confirm("Confirma la eliminacion del usuario?");
    if (result) {
      const res = await RemoveUser(user);
      return res;
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>ABM de usuarios</h1>
      {!visibleForm || (
        <UsersAdminModalForm
          setVisibleForm={setVisibleForm}
          initialUserForm={initialUserForm}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          passForm={passForm}
          setPassForm={setPassForm}
        />
      )}
      {users.length === 0 ? (
        <div className="alert alert-warning my-4">
          No hay usuarios en el sistema.
        </div>
      ) : (
        <table className="table table-hover table-stripped ">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Tipo usuario</th>
              <th>Username</th>
              <th>Email</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <div className="alert alert-warning my-4">
                No hay usuarios en el sistema.
              </div>
            ) : (
              users.map(
                ({ nombre, dni, edad, username, email, tipoPersona }) => (
                  <UsersAdminRow
                    id={dni}
                    key={dni}
                    nombre={nombre}
                    dni={dni}
                    edad={edad}
                    email={email}
                    tipoPersona={tipoPersona}
                    username={username}
                    handlerUserSelectedForm={handlerUserSelectedForm}
                    setPassForm={setPassForm}
                  />
                )
              )
            )}
          </tbody>
        </table>
      )}
      <button className="btn btn-primary my-2" onClick={handlerOpenForm}>
        Nuevo
      </button>
    </div>
  );
};

export default UsersAdmin;
