import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useTranslation } from 'react-i18next';
import '../i18nConfig';

const EventoList = () => {
    const [eventos, setEventos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        setIsLoading(true);
        axios.get('/eventos/')
            .then(response => {
                setEventos(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                //setError(err.message || t('events.errorLoadingEvents')); // Localized error message
                setIsLoading(false);
            });
    }, [t]); // Added 't' to dependencies as it's used inside the hook

    if (isLoading) {
        return <p>{t('events.loadingEvents')}</p>; // Localized loading message
    }

    if (error) {
        return <p className="text-danger">{error}</p>; // Show error message if request fails
    }

    return (
        <div>
            <h2>{t('eventoList.title')}</h2>
            {eventos.length > 0 ? (
                <ul>
                    {eventos.map(evento => (
                        <li key={evento.id}>{evento.titulo}</li> // Correct usage of 'key'
                    ))}
                </ul>
            ) : (
                <p>{t('events.noEvents')}</p> // Show message if no events
            )}
        </div>
    );
};

export default EventoList;
