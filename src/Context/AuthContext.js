import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userPermissions, setUserPermissions] = useState(localStorage.getItem("permission") || null);
  const [userNames, setUserNames] = useState(localStorage.getItem("username") || null);


  const updateToken = (newToken, newPermission, newUsername) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUserPermissions(newPermission);
    localStorage.setItem("permission", newPermission);
    setUserNames(newUsername);
    localStorage.setItem("username", newUsername);
    setAuthenticated(true);
  };

  const logout = () => {
    //implementar logout con boton
    setAuthenticated(false); //le saco la autenticacion y lo fuerzo a loguearse nuevamente
    setToken();
    setUserPermissions(); //lo dejo sin permisos nuevamente para asignarselo en el 
    setUserNames();
  }

  return (
    <AuthContext.Provider value={{ token, updateToken, isAuthenticated, userPermissions, userNames, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider , useAuth};
