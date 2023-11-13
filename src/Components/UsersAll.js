import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UsersAll = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    console.log("fetchsuers");
    try {
      const response = await fetch('http://localhost:8080/users/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
      } else {
        console.error('Error al obtener usuarios:', response.status);
        // Manejar el error de solicitud
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error de red u otro error
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={cellStyle}>DNI</th>
            <th style={cellStyle}>Edad</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Nombre</th>
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>Tipo de Persona</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td style={cellStyle}>{user.dni}</td>
              <td style={cellStyle}>{user.edad}</td>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>{user.nombre}</td>
              <td style={cellStyle}>{user.username}</td>
              <td style={cellStyle}>{user.tipoPersona}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  border: '1px solid black',
  padding: '8px'
};

export default UsersAll;
