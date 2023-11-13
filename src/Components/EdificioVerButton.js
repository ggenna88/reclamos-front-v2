// EdificioVerButton.js
import React from 'react';
import { Link } from 'react-router-dom';

const EdificioVerButton = ({ direccion }) => {
    return (
        <Link to={`/detalle-unidades/${direccion}`}>
            <button>Ver</button>
        </Link>
    );
};

export default EdificioVerButton;
