import React  from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate} from 'react-router-dom';

const UsersAll = () => {
  const { token, isAuthenticated, userPermissions } = useAuth();

  //console.log("Este es el token:", token);
  //console.log("Este es el permiso:", userPermissions);
  //console.log("Esta autenticado:" , isAuthenticated)

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }


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
      {userPermissions === 'Administrador' && <h1>Página de Usuarios</h1>}
      {userPermissions === 'Administrador'  && <button onClick={fetchUsers}>Obtener Usuarios</button>}
    </div>
  );
};

export default UsersAll;
