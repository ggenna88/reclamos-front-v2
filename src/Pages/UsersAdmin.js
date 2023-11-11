/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { UsersAdminModalForm } from "../Components/UsersAdminModalForm";
import { UsersAdminList } from "../Components/UsersAdminList";
import { UsersAdminContext } from "../Context/UsersAdmin/UsersAdminContext";

export const UsersAdmin = () => {
  const { visibleForm, handlerOpenForm, users, getUsers } =
    useContext(UsersAdminContext);

  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <>
      {!visibleForm || <UsersAdminModalForm />}

      <div className="container my-4">
        <h2>ABM Usuarios</h2>
        <div className="row">
          <div className="col">
            {visibleForm || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Nuevo Usuario
              </button>
            )}

            {users.length === 0 ? (
              <div className="alert alert-warning my-4">
                No hay usuarios en el sistema.
              </div>
            ) : (
              <UsersAdminList />
            )}
            <button className="btn btn-primary my-2" onClick={getUsers}>
              obtener
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
