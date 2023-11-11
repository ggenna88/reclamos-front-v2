/* eslint-disable react/prop-types */
import { useUsersAdmin } from "../../Hooks/useUsersAdmin";
import { UsersAdminContext } from "./UsersAdminContext";

export const UsersAdminProvider = ({ children }) => {
  const {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,
  } = useUsersAdmin();

  return (
    <UsersAdminContext.Provider
      value={{
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
      }}
    >
      {children}
    </UsersAdminContext.Provider>
  );
};
