import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Home = () => {
    const [eventosDestacados, setEventosDestacados] = useState([]);

    // Cargar eventos destacados desde la API
    useEffect(() => {
        const fetchEventosDestacados = async () => {
            try {
                const response = await api.get('/eventos/');
                setEventosDestacados(response.data.slice(0, 3)); // Mostrar solo los primeros 3 eventos
            } catch (error) {
                console.error('Error al cargar eventos destacados:', error);
            }
        };

        fetchEventosDestacados();
    }, []);

    return (
        <div className="container-body form">
            <div className="text-center mb-5">
                <h1 className="display-4">Sistema de Gestión de Eventos</h1>
                <p className="lead">
                    Un sistema diseñado para ayudarte a organizar, registrar y consultar eventos importantes en tu institución educativa.
                </p>
            </div>
            <section className="mb-5">
                <h2>¿Qué puedes hacer con este sistema?</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <strong>Gestión de Eventos:</strong> Crea, consulta y administra conferencias, talleres y seminarios.
                        <br />
                        <em>Datos necesarios:</em> título, invitados, fecha y hora, zona horaria, descripción, lugar y recordatorio.
                    </li>
                    <li className="list-group-item">
                        <strong>Ubicaciones:</strong> Registra y consulta los lugares donde se llevarán a cabo los eventos.
                        <br />
                        <em>Datos necesarios:</em> título, dirección y coordenadas geográficas.
                    </li>
                    <li className="list-group-item">
                        <strong>Contactos:</strong> Gestiona la información de los contactos relevantes para tus eventos.
                        <br />
                        <em>Datos necesarios:</em> saludo, nombre completo, número de identificación, correo electrónico, número de teléfono y fotografía.
                    </li>
                </ul>
            </section>
            <section>
                <h2 className="mb-4">Eventos Destacados</h2>
                <div className="row">
                    {eventosDestacados.length > 0 ? (
                        eventosDestacados.map((evento) => (
                            <div className="col-md-4" key={evento.id}>
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{evento.titulo}</h5>
                                        <p className="card-text">
                                            {evento.descripcion ? evento.descripcion : 'Sin descripción disponible.'}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">Fecha y hora: {evento.fecha_hora}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No hay eventos destacados disponibles.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
