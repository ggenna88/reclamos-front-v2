/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UsersAdminForm } from "./UsersAdminForm";
import { UsersAdminContext } from "../Context/UsersAdmin/UsersAdminContext";

export const UsersAdminModalForm = () => {
  const { handlerCloseForm, userSelected } = useContext(UsersAdminContext);
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
                {userSelected.id > 0 ? "Editar" : "Crear"}
              </h5>
            </div>
            <div className="modal-body">
              <UsersAdminForm
                userSelected={userSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
