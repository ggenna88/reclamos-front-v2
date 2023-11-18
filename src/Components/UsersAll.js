import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";


const UsersAll = () => {
  const { token, isAuthenticated, userPermissions, userNames, logout } =
    useAuth();

  console.log("Este es el token:", token);
  console.log("Este es el permiso:", userPermissions);
  console.log("Este es el usuario:", userNames);
  console.log("Esta autenticado:", isAuthenticated);


  //verifica si esta autenticado
  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }


  //este fetch de ejemplo trae el listado de usuarios (aca pueden modificar a gusto)
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
    <div className="container my-4">
      
        <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {<h1>Página de {userNames}</h1>}
          <button className="btn btn-primary ml-right" onClick={logout}>Logout</button>
          </div>
         </header>
        

      {userPermissions === "Administrador" && (
        <button onClick={fetchUsers}>Obtener Usuarios</button>
      )}
    </div>
  );
};

export default UsersAll;
