import React, { useState, useEffect } from 'react';
import api from '../services/api';
import UbicacionForm from '../components/UbicacionForm';
import '../i18nConfig';
import { useTranslation } from "react-i18next";
import {toast, ToastContainer} from "react-toastify";

const Ubicaciones = () => {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUbicacion, setSelectedUbicacion] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUbicaciones = async () => {
            setLoading(true);
            try {
                const response = await api.get('/ubicaciones/');
                setUbicaciones(response.data);
            } catch (error) {
                console.error(t('events.errorLoadingEvents'), error);
                // setError(t('events.errorLoadingEvents'));
            } finally {
                setLoading(false);
            }
        };

        fetchUbicaciones();
    }, [t]);

    const handleAddUbicacion = async (nuevaUbicacion) => {
        const toastId = toast.loading ?
            toast.loading(t('events.eventAwait')) :
            toast.info(t('events.eventAwait'), { autoClose: false });

        try {
            const response = await api.post('/ubicaciones/', nuevaUbicacion);
            setUbicaciones(prev => [...prev, response.data]);
            toast.dismiss(toastId);
            toast.success(t('events.locationAdded'));
        } catch (error) {
            console.error(t('events.errorSaving'), error);
            toast.dismiss(toastId);
            toast.error(t('events.errorSaving'));
        }
    };

    const handleUpdateUbicacion = async (ubicacionActualizada) => {
        const toastId = toast.loading ?
            toast.loading(t('events.eventAwait')) :
            toast.info(t('events.eventAwait'), { autoClose: false });

        try {
            const response = await api.put(`/ubicaciones/${selectedUbicacion.id}/`, ubicacionActualizada);
            setUbicaciones(prev => prev.map(ubicacion => ubicacion.id === selectedUbicacion.id ? response.data : ubicacion));
            setSelectedUbicacion(null);
            toast.dismiss(toastId);
            toast.success(t('events.locationUpdated'));
        } catch (error) {
            console.error(t('events.errorUpdatingEvent'), error);
            toast.dismiss(toastId);
            toast.error(t('events.errorUpdatingEvent'));
        }
    };

    const onDelete = async (id) => {
        if (window.confirm(t('contactForm.confirmDelete'))) {
            const toastId = toast.loading ?
                toast.loading(t('events.eventAwait')) :
                toast.info(t('events.eventAwait'), { autoClose: false });

            try {
                await api.delete(`/ubicaciones/${id}/`);
                setUbicaciones(prev => prev.filter(ubicacion => ubicacion.id !== id));
                if (selectedUbicacion && selectedUbicacion.id === id) {
                    setSelectedUbicacion(null);
                }
                toast.dismiss(toastId);
                toast.success(t('events.locationDeleted'));
            } catch (error) {
                console.error(t('events.errorDeletingEvent'), error);
                toast.dismiss(toastId);
                toast.error(t('events.errorDeletingEvent'));
            }
        }
    };

    const onEdit = (id) => {
        const ubicacion = ubicaciones.find(ubicacion => ubicacion.id === id);
        setSelectedUbicacion(ubicacion);
        toast.info(t('events.locationEditLoaded'));
    };


    return (
        <div className="container form">
            <ToastContainer />
            <h1 className="text-center">{t('navbar.locations')}</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {selectedUbicacion ? (
                <UbicacionForm onSubmit={handleUpdateUbicacion} initialData={selectedUbicacion} />
            ) : (
                <UbicacionForm onSubmit={handleAddUbicacion} />
            )}
            <div className="mt-5">
                <h2>{t('ubicacionForm.title')}</h2>
                {loading ? <p>{t('events.loadingEvents')}</p> : ubicaciones.length === 0 ? (
                    <p>{t('events.noEvents')}</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered mt-3">
                            <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>{t('ubicacionForm.title')}</th>
                                <th>{t('ubicacionForm.address')}</th>
                                <th>{t('ubicacionForm.coordinates')}</th>
                                <th>{t('events.actions')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ubicaciones.map(ubicacion => (
                                <tr key={ubicacion.id}>
                                    <td>{ubicacion.id}</td>
                                    <td>{ubicacion.titulo}</td>
                                    <td>{ubicacion.direccion}</td>
                                    <td>{ubicacion.coordenadas}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => onEdit(ubicacion.id)}
                                        >
                                            {t('events.edit')}
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(ubicacion.id)}
                                        >
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

export default Ubicaciones;
