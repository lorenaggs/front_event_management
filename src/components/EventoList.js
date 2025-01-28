import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const EventoList = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axios.get('/eventos/').then(response => setEventos(response.data));
    }, []);

    return (
        <div>
            <h2>Lista de Eventos</h2>
            <ul>
                {eventos.map(evento => (
                    <li key={evento.id}>{evento.titulo}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventoList;
