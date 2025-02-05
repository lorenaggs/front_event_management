import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import EventoForm from '../components/EventoForm';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        let isMounted = true;
        const fetchEventos = async () => {
            setLoading(true);
            try {
                const response = await api.get('/eventos/');
                if (isMounted) setEventos(response.data);
            } catch (error) {
                //  (isMounted) setError(t('errors.loadingEvents'));
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchEventos();
        return () => { isMounted = false; };
    }, [t]);

    const handleAddOrUpdateEvento = async (evento, id) => {
        const formData = new FormData();
        Object.keys(evento).forEach(key => formData.append(key, evento[key]));

        const toastId = toast.loading ?
            toast.loading(t('events.eventAwait')) :
            toast.info(t('events.eventAwait'), { autoClose: false });

        setLoading(true);

        try {
            const response = id
                ? await api.put(`/eventos/${id}/`, formData)
                : await api.post('/eventos/', formData);

            setEventos(prevEventos =>
                id ? prevEventos.map(e => (e.id === id ? response.data : e))
                    : [...prevEventos, response.data]
            );
            setSelectedEvent(null);

            toast.dismiss(toastId);
            toast.success(id ? t('events.eventUpdated') : t('events.eventAdded'));
        } catch (error) {
            console.error('Error:', error);
            toast.dismiss(toastId);
            toast.error(t('errors.updateFailed'));
        } finally {
            setLoading(false);
        }
    };

    const onDelete = useCallback(async (id) => {
        if (window.confirm(t('events.confirmDelete'))) {  // Consider replacing with a modal for a better UX
            const toastId = toast.loading ?
                toast.loading(t('events.deleting')) :
                toast.info(t('events.deleting'), { autoClose: false });

            try {
                await api.delete(`/eventos/${id}/`);
                setEventos(prevEventos => prevEventos.filter(evento => evento.id !== id));
                setSelectedEvent(null);
                toast.dismiss(toastId);
                toast.success(t('events.eventDeleted'));
            } catch (error) {
                console.error("Error al eliminar evento:", error);
                toast.dismiss(toastId);
                toast.error(t('errors.deleteFailed'));
            }
        }
    }, [t]);

    const onEdit = useCallback(id => {
        const evento = eventos.find(evento => evento.id === id);
        if (evento) {
            setSelectedEvent(evento);
            toast.info(t('events.eventEditLoaded'));
        } else {
            toast.error(t('events.eventNotFound'));
        }
    }, [eventos, t]);


    return (
        <div className="container form">
            <ToastContainer />
            <h1 className="text-center mb-4">{t('events.manageEvents')}</h1>
            <EventoForm onAddOrUpdate={handleAddOrUpdateEvento} initialData={selectedEvent} />

            <div className="mt-5">
                <h2>{t('events.eventListTitle')}</h2>
                {loading ? (
                    <p>{t('events.loadingEvents')}</p>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : eventos.length === 0 ? (
                    <p>{t('events.noEvents')}</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                            <tr>
                                {['title', 'dateTime', 'timeZone', 'guests', 'description', 'repetition', 'reminder', 'classification', 'place', 'actions'].map(key => (
                                    <th key={key}>{t(`events.${key}`)}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {eventos.map(evento => (
                                <tr key={evento.id}>
                                    <td>{evento.titulo}</td>
                                    <td>{new Date(evento.fecha_hora).toLocaleString()}</td>
                                    <td>{evento.zona_horaria}</td>
                                    <td>{evento.invitados}</td>
                                    <td>{evento.descripcion || t('events.descriptionUnavailable')}</td>
                                    <td>{evento.repeticion}</td>
                                    <td>{evento.recordatorio ? t('events.yes') : t('events.no')}</td>
                                    <td>{evento.clasificacion || t('events.noClassification')}</td>
                                    <td>{evento.lugar}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(evento.id)}>
                                            {t('events.edit')}
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => onDelete(evento.id)}>
                                            {t('events.delete')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Eventos;
