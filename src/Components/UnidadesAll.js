import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import UnidadPersonasButton from './UnidadPersonasButton';
import { useParams } from 'react-router-dom';
import UnidadUpdateButton from './UnidadUpdateButton';
import BackButton from './BackButton';
import UnidadesDelButton from './UnidadesDel';
import UnidadesAdd from './UnidadesAdd';
import Boton from './Boton';

const UnidadesAll = () => {
    const { id, direccion } = useParams();
    const { token } = useContext(AuthContext);
    const [unidad, setUnidad] = useState([]);
    const [showUnidadesAddModal, setShowUnidadesAddModal] = useState(false);

    const fetchUnidad = async () => {
        try {
            const response = await fetch(`http://localhost:8080/edificios/findUnidades?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const unidadData = await response.json();
                setUnidad(unidadData);
                console.log("Unidades", unidadData);
            } else {
                console.error('Error al obtener unidades:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUnidad();
    }, [token]);

    const handleEliminarSuccess = () => {
        fetchUnidad(id);
    };

    const openModal = () => {
        setShowUnidadesAddModal(true);
    };

    const closeModal = () => {
        setShowUnidadesAddModal(false);
    };

    const handleReload = () => {
        fetchUnidad();
    };

    const renderTabla = () => {

        return (
            <table className="table table-hover tabla-edificiosall" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Número</th>
                        <th style={cellStyle}>Piso</th>
                        <th style={cellStyle}>Estado</th>
                        <th style={cellStyle}></th>
                    </tr>
                </thead>
                <tbody>
                    {unidad.map((uni) => (
                        <tr key={uni.id}>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>{uni.nro}</td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>{uni.piso}</td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>{uni.estado}</td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                <UnidadPersonasButton nro={uni.nro} piso={uni.piso} personas={uni.personas} />
                            </td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                <UnidadUpdateButton uni={uni} />
                            </td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                <UnidadesDelButton
                                    idUnidad={uni.id}
                                    onDeleteSuccess={handleEliminarSuccess}
                                />


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderVacio = () => {
        return (
            <div className="container d-flex flex-column align-items-center justify-content-center border border-light p-4">
                <h2>No hay unidades para mostrar</h2>

            </div>
        );

    }

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center border border-light p-4">
            <h1>Lista de unidades del edificio {direccion}</h1>
            {unidad.length === 0 ? renderVacio() : renderTabla()}
            <div>
                <Boton label="Agregar Unidades" onClick={openModal} />
                {showUnidadesAddModal && (
                    <UnidadesAdd
                        edificioId={id}
                        onClose={closeModal}
                        reload={handleReload}
                    />
                )}

            </div>
            <div className='text-center mt-3'>
                <BackButton />
            </div>
        </div>
    );
};

const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    border: 'none'
};

export default UnidadesAll;
