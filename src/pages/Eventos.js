import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EventoForm from '../components/EventoForm';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        fetchEventos();
    }, [t]);

    const fetchEventos = async () => {
        setLoading(true);
        try {
            const response = await api.get('/eventos/');
            setEventos(response.data);
        } catch (error) {
            toast.error(t('errors.loadingEvents'));
        } finally {
            setLoading(false);
        }
    };

    /*const handleAddOrUpdateEvento = async (evento, id) => {
        const formData = new FormData();
        Object.keys(evento).forEach(key => formData.append(key, evento[key]));
        setLoading(true);

        try {
            const response = id ? await api.put(`/eventos/${id}/`, formData) : await api.post('/eventos/', formData);
            setEventos(prev => id ? prev.map(e => e.id === id ? response.data : e) : [...prev, response.data]);
            setSelectedEvent(null);
            toast.success(id ? t('events.eventUpdated') : t('events.eventAdded'));
        } catch (error) {
            console.error('Error:', error);
            toast.error(t('errors.updateFailed'));
        } finally {
            setLoading(false);
        }
    };*/

    const handleAddOrUpdateEvento = async (evento) => {
        const formData = new FormData();
        Object.keys(evento).forEach(key => formData.append(key, evento[key]));

        const toastId = toast.loading
            ? toast.loading(t('events.loadingEvent'))
            : toast.info(t('events.loadingEvent'), { autoClose: false });

        try {
            const response = selectedEvent
                ? await api.put(`/eventos/${selectedEvent.id}/`, formData)
                : await api.post('/eventos/', formData);

            const updatedEventos = selectedEvent
                ? eventos.map(e => e.id === selectedEvent.id ? response.data : e)
                : [...eventos, response.data];

            setEventos(updatedEventos);

            toast.dismiss(toastId);
            toast.success(selectedEvent ? t('events.eventUpdated') : t('events.eventAdded'));
        } catch (error) {
            console.error('Error:', error);

            toast.dismiss(toastId);
            toast.error(t('events.errorUpdatingEvent'));
        } finally {
            setSelectedEvent(null);
        }
    };



    const onDelete = async (id) => {
        if (window.confirm(t('events.confirmDelete'))) {
            try {
                await api.delete(`/eventos/${id}/`);
                setEventos(prev => prev.filter(evento => evento.id !== id));
                toast.success(t('events.eventDeleted'));
            } catch (error) {
                console.error("Error:", error);
                toast.error(t('errors.deleteFailed'));
            }
        }
    };

    const onEdit = (id) => {
        const evento = eventos.find(e => e.id === id);
        setSelectedEvent(evento);
    };

    return (
        <div className="container form">
            <ToastContainer />
            <h1 className="text-center mb-4">{t('events.manageEvents')}</h1>
            <EventoForm onAddOrUpdate={handleAddOrUpdateEvento} initialData={selectedEvent} />
            <h2 className="mt-5">{t('events.eventListTitle')}</h2>
            {loading ? <p>{t('events.loadingEvents')}</p> : eventos.length ? (
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
                            <td>{evento.descripcion || t('home.descriptionUnavailable')}</td>
                            <td>{evento.repeticion}</td>
                            <td>{evento.recordatorio ? t('events.yesRememberEvent') : t('events.noRememberEvent')}</td>
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
            ) : <p>{t('events.noEvents')}</p>}
        </div>
    );
};

export default Eventos;








