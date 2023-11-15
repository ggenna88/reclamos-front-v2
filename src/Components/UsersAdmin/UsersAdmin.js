import { React, useState, useEffect } from "react";
import { GetAllUsers } from "../../Services/UsersService";
import { UsersAdminRow } from "./UsersAdminRow";
import { UsersAdminModalForm } from "./UsersAdminModalForm";
import { Navbar } from "../NavBar";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      let initialUsers = await GetAllUsers();
      console.log(initialUsers);
      return initialUsers;
    };
    fetchUsers().then((res) => setUsers(res));
  }, []);

  const handlerOpenForm = () => {
    setVisibleForm(true);
  };

  return (
    <div className="container">
      <Navbar />
      <h1>ABM de usuarios</h1>
      {!visibleForm || <UsersAdminModalForm setVisibleForm={setVisibleForm} />}
      {users.length === 0 ? (
        <div className="alert alert-warning my-4">
          No hay usuarios en el sistema.
        </div>
      ) : (
        <table className="table table-hover table-stripped ">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Tipo usuario</th>
              <th>Email</th>
              <th>Username</th>
              <th>Update</th>
              <th>Remove</th>
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
      <button className="btn btn-primary my-2 mx-2">Guardar</button>
    </div>
  );
};

export default UsersAdmin;
