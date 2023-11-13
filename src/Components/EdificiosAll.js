
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import EdificioEliminarButton from './EdificiosDel';
import EdificioModificarButton from './EdificioModificarButton';
import EdificioVerButton from './EdificioVerButton';

const EdificiosAll = () => {
    const { token } = useContext(AuthContext);
    const [edif, setEdif] = useState([]);

    const fetchEdif = async () => {
        try {
            const response = await fetch('http://localhost:8080/edificios/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const edifData = await response.json();
                setEdif(edifData);
                console.log("Edificios", edifData);
            } else {
                console.error('Error al obtener edificios:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchEdif();
    }, [token]);

    const handleEliminarSuccess = () => {
        fetchEdif();
    };

    return (
        <div>
            <h1>Lista de Edificios</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Dirección</th>
                        <th style={cellStyle}>Unidades</th>
                        <th style={cellStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {edif.map((edificio) => (
                        <tr key={edificio.direccion}>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>{edificio.direccion}</td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                {edificio.unidades.length}
                                {/* Agregar el botón 'Ver' */}
                                <EdificioVerButton direccion={edificio.direccion} />
                            </td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                {/* Agregar el botón 'Eliminar' */}
                                <EdificioEliminarButton
                                    direccion={edificio.direccion}
                                    onDeleteSuccess={handleEliminarSuccess}
                                />
                                {/* Agregar el botón 'Modificar' */}
                                <EdificioModificarButton direccion={edificio.direccion} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center'
};

export default EdificiosAll;
