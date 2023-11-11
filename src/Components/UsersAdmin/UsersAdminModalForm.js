/* eslint-disable react/prop-types */
import { useState } from "react";
import { UsersAdminForm } from "./UsersAdminForm.js";

export const UsersAdminModalForm = ({ setVisibleForm }) => {
  const initialUserForm = {
    dni: 1,
    edad: 0,
    email: "",
    nombre: "",
    tipoPersona: "",
    username: "",
    password: "",
  };

  const [userSelected, setUserSelected] = useState(initialUserForm);

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  };

  return (
    <div className="abrir-modal animacion fadeIn">
      <div
        className="modal"
        style={{
          display: "block",
        }}
        tabIndex="-1"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {userSelected.id > 1 ? "Editar" : "Crear"}
              </h5>
            </div>
            <div className="modal-body">
              <UsersAdminForm
                userSelected={userSelected}
                initialUserForm={initialUserForm}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
