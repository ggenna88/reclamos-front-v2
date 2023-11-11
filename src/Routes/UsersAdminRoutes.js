/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { UsersAdmin } from "../Pages/UsersAdmin";
import { UsersAdminProvider } from "../Context/UsersAdmin/UsersAdminProvider";
import { UsersAdminList } from "../Components/UsersAdminList";

export const UsersAdminRoutes = () => {
  return (
    <>
      <UsersAdminProvider>
        <Routes>
          <Route path="/usersAdmin/abm" element={<UsersAdmin />} />
        </Routes>
      </UsersAdminProvider>
    </>
  );
};
