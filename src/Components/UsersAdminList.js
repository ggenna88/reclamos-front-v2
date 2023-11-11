import { useContext } from "react";
import { UsersAdminRow } from "./UsersAdminRow";
import { UsersAdminContext } from "../Context/UsersAdmin/UsersAdminContext";

/* eslint-disable react/prop-types */
export const UsersAdminList = () => {
  const { users } = useContext(UsersAdminContext);

  return (
    <table className="table table-hover table-stripped ">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Update</th>
          <th>Update Route</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {console.log("debug aaaa")}
        {console.log(users)}
        {users.map(({ id, username, email }) => (
          <UsersAdminRow key={id} id={id} username={username} email={email} />
        ))}
      </tbody>
    </table>
  );
};
