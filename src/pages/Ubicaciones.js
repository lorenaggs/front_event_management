import React, { useState, useEffect } from 'react';
import UbicacionForm from '../components/UbicacionForm';
import api from '../services/api';

const Ubicaciones = () => {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUbicacion, setSelectedUbicacion] = useState(null); // Estado para la ubicación seleccionada

    useEffect(() => {
        const fetchUbicaciones = async () => {
            try {
                const response = await api.get('/ubicaciones/');
                setUbicaciones(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar ubicaciones:', error);
                setError('Error al cargar las ubicaciones. Por favor, inténtelo nuevamente.');
                setLoading(false);
            }
        };

        fetchUbicaciones();
    }, []);

    const handleAddUbicacion = async (nuevaUbicacion) => {
        try {
            const response = await api.post('/ubicaciones/', nuevaUbicacion);
            setUbicaciones((prevUbicaciones) => [...prevUbicaciones, response.data]); // Actualiza la tabla inmediatamente
            alert('Ubicación guardada correctamente'); // Muestra la alerta después
        } catch (error) {
            console.error('Error al agregar ubicación:', error);
            alert('Hubo un error al guardar la ubicación.');
        }
    };


    const handleUpdateUbicacion = async (ubicacionActualizada) => {
        try {
            const response = await api.put(
                `/ubicaciones/${selectedUbicacion.id}/`,
                ubicacionActualizada
            );
            setUbicaciones(
                ubicaciones.map((ubicacion) =>
                    ubicacion.id === selectedUbicacion.id ? response.data : ubicacion
                )
            );
            setSelectedUbicacion(null); // Limpia el formulario de edición
            alert('Ubicación actualizada correctamente');
        } catch (error) {
            console.error('Error al actualizar ubicación:', error);
            alert('Hubo un error al actualizar la ubicación.');
        }
    };

    const onDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
            try {
                await api.delete(`/ubicaciones/${id}/`);
                setUbicaciones(ubicaciones.filter((ubicacion) => ubicacion.id !== id));
                if (selectedUbicacion && selectedUbicacion.id === id) {
                    setSelectedUbicacion(null); // Limpia el formulario si el registro eliminado estaba seleccionado
                }
                alert('Ubicación eliminada correctamente');
            } catch (error) {
                console.error('Error al eliminar ubicación:', error);
                alert('Hubo un error al eliminar la ubicación.');
            }
        }
    };

    const onEdit = (id) => {
        const ubicacion = ubicaciones.find((ubicacion) => ubicacion.id === id);
        setSelectedUbicacion(ubicacion); // Selecciona la ubicación para edición
    };

    return (
        <div className="container py-4 form">
            <h1 className="text-center">Gestión de Ubicaciones</h1>
            {selectedUbicacion ? (
                <UbicacionForm onSubmit={handleUpdateUbicacion} initialData={selectedUbicacion} />
            ) : (
                <UbicacionForm onSubmit={handleAddUbicacion} />
            )}
            <div className="mt-5">
                <h2>Lista de Ubicaciones</h2>
                {loading ? (
                    <p>Cargando ubicaciones...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : ubicaciones.length === 0 ? (
                    <p>No hay ubicaciones registradas.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered mt-3">
                            <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Dirección</th>
                                <th>Coordenadas</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ubicaciones.map((ubicacion) => (
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
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(ubicacion.id)}
                                        >
                                            Eliminar
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
