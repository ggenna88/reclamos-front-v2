// EdificiosAll.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import EdificioEliminarButton from './EdificiosDel';
import EdificioModificarButton from './EdificioModificarButton';
import EdificioVerButton from './EdificioVerButton';
import BackButton from './BackButton';
import EdificiosAdd from './EdificiosAdd';
import Boton from './Boton';
import { Navbar } from './NavBar';

const EdificiosAll = () => {
    const { token } = useContext(AuthContext);
    const [edif, setEdif] = useState([]);
    const [showEdificioAddModal, setShowEdificioAddModal] = useState(false);
    const [showUnidadesAddModal, setShowUnidadesAddModal] = useState(false);
    const [idEdificio, setIdEdificio] = useState(null);

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

    const handleReload = () => {
        fetchEdif();
    };


    const openModal = () => {
        setShowEdificioAddModal(true);
    };

    const closeModal = () => {
        setShowEdificioAddModal(false);
        setShowUnidadesAddModal(false);
        setIdEdificio(null);
    };

    const renderTabla = () => {
        return (
            <table className="table table-hover tabla-edificiosall" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Dirección</th>
                        <th style={cellStyle}></th>
                        <th style={cellStyle}></th>
                        <th style={cellStyle}></th>
                    </tr>
                </thead>
                <tbody>
                    {edif.map((edificio) => (
                        <tr key={edificio.direccion}>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>{edificio.direccion}</td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                <EdificioVerButton id={edificio.id} direccion={edificio.direccion} />
                            </td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                <EdificioModificarButton id={edificio.id} direccion={edificio.direccion} />
                            </td>
                            <td style={{ ...cellStyle, textAlign: 'center' }}>
                                <EdificioEliminarButton
                                    direccion={edificio.direccion}
                                    onDeleteSuccess={handleReload}
                                />

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );



    }

    const renderVacio = () => {
        return (
            <div className="container d-flex flex-column align-items-center justify-content-center border border-light p-4">
                <h2>No hay edificios para mostrar</h2>

            </div>
        );

    }



    return (
        <div className="container">
            <Navbar />
            <div className="container d-flex flex-column align-items-center justify-content-center border border-light p-4">
                <h1>Gestión de edificios</h1>
                {edif.length === 0 ? renderVacio() : renderTabla()}
                <div>
                    <Boton label="Agregar edificio" onClick={openModal} />
                    {showEdificioAddModal && (
                        <EdificiosAdd
                            onSubmit={(newIdEdificio) => {
                                setIdEdificio(newIdEdificio);
                            }}
                            onClose={closeModal}
                            reload={handleReload}
                        />
                    )}
                </div>
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

export default EdificiosAll;
