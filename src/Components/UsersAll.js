import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const UsersAll = () => {
  const { token } = useContext(AuthContext);

  const fetchUsers = async () => {
    console.log("Este es el token:", token);

    try {
      var bearer = "Bearer " + token;
      const response = await fetch("http://localhost:8080/users/all", {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        origin: "http://localhost:3000",
        credentials: "include",
        referrerPolicy: "strict-origin-when-cross-origin",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Página de Usuarios</h1>
      <button onClick={fetchUsers}>Obtener Usuarios</button>
    </div>
  );
};

export default UsersAll;
