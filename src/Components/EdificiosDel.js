import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Boton from './Boton';

const EdificioEliminarButton = ({ direccion, onDeleteSuccess }) => {
    const { token } = useContext(AuthContext);

    const handleEliminarEdificio = async () => {
        try {
            const response = await fetch(`http://localhost:8080/edificios/delete?address=${encodeURIComponent(direccion)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log("Edificio eliminado correctamente");
                onDeleteSuccess();
            } else {
                console.error('Error al eliminar el edificio:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Boton label="Eliminar" onClick={handleEliminarEdificio}>
            
        </Boton>
    );
};

export default EdificioEliminarButton;
