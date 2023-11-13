// EdificioUpdate.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const EdificioUpdate = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const [edificio, setEdificio] = useState({});
    const [direccion, setDireccion] = useState('');

    useEffect(() => {
        const fetchEdificio = async () => {
            try {
                const response = await fetch(`http://localhost:8080/edificios/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const edificioData = await response.json();
                    setEdificio(edificioData);
                    setDireccion(edificioData.direccion);
                    // Puedes setear otras propiedades aquí si es necesario
                } else {
                    console.error('Error al obtener el edificio:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEdificio();
    }, [id, token]);

    const handleActualizarEdificio = async () => {
        try {
            const response = await fetch(`http://localhost:8080/edificios/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    direccion: direccion,
                    // Otras propiedades actualizadas del edificio
                })
            });

            if (response.ok) {
                console.log('Edificio actualizado correctamente');
                navigate('/edificiosall');
            } else {
                console.error('Error al actualizar el edificio:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Actualizar Edificio</h1>
            <label>
                Nueva Dirección:
                <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
            </label>
            {/* Puedes agregar más campos para otras propiedades del edificio si es necesario */}
            <button onClick={handleActualizarEdificio}>Actualizar Edificio</button>
        </div>
    );
};

export default EdificioUpdate;
