// EdificioModificarButton.js
import React from 'react';
import { Link } from 'react-router-dom';

const EdificioModificarButton = ({ direccion }) => {
    return (
        <Link to={`/edificios-update/${direccion}`}>
            <button>Modificar</button>
        </Link>
    );
};

export default EdificioModificarButton;
