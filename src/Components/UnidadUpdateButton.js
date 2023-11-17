
import React from 'react';
import { Link } from 'react-router-dom';
import Boton from './Boton';

const UnidadUpdateButton = ({ uni }) => {
    return (
        <Link to={`/modificar-unidad/${uni.id}`}>
            <Boton label="Modificar"></Boton>
        </Link>
    );
};

export default UnidadUpdateButton;
