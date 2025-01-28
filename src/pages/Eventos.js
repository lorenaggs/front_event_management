import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EventoForm from '../components/EventoForm';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await api.get('/eventos/');
                setEventos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar eventos:', error);
                setError('Error al cargar los eventos. Por favor, intente nuevamente.');
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    const handleAddEvento  = async (evento) => {
        const formData = new FormData();
        Object.keys(evento).forEach((key) => {
            formData.append(key, evento[key]);
        })

        try {
            const response = await api.post('/eventos/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            setEventos([...eventos, response.data]);
        }catch (error){
            console.error('Error al agregar evento:', error);
        }
    }

    const onDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
            try {
                await api.delete(`/eventos/${id}/`);
                setEventos(eventos.filter((evento) => evento.id !== id)); // Actualiza el estado sin el evento eliminado
                if (selectedEvent && selectedEvent.id === id) {
                    setSelectedEvent(null); // Limpia el formulario si el evento eliminado estaba seleccionado
                }
                alert("Evento eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar evento:", error);
                alert("Hubo un error al eliminar el evento.");
            }
        }
    };


    const onEdit = (id) => {
        const evento = eventos.find((evento) => evento.id === id);
        setSelectedEvent(evento);
    };

    const handleUpdateEvento = async (updatedEvento) => {
        try {
            const response = await api.put(`/eventos/${selectedEvent.id}/`, updatedEvento);
            setEventos(eventos.map((e) => (e.id === selectedEvent.id ? response.data : e)));
            setSelectedEvent(null); // Resetea el formulario
            alert("Evento actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar evento:", error);
            alert("Hubo un error al actualizar el evento.");
        }
    };


    return (
        <div className="container py-4 form">
            <h1 className="text-center mb-4">Gestión de Eventos</h1>
            {selectedEvent ? (
                <EventoForm onAdd={handleUpdateEvento} initialData={selectedEvent}/>
            ) : (
                <EventoForm onAdd={handleAddEvento}/>
            )}

            <div className="mt-5">
                <h2>Lista de Eventos</h2>
                {loading ? (
                    <p>Cargando eventos...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : eventos.length === 0 ? (
                    <p>No hay eventos registrados.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                            <tr>
                                <th>Título</th>
                                <th>Fecha y Hora</th>
                                <th>Zona Horaria</th>
                                <th>Invitados</th>
                                <th>Descripción</th>
                                <th>Repetición</th>
                                <th>Recordatorio</th>
                                <th>Clasificación</th>
                                <th>Lugar</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {eventos.map((evento, index) => (
                                <tr key={index}>
                                    <td>{evento.titulo}</td>
                                    <td>{new Date(evento.fecha_hora).toLocaleString()}</td>
                                    <td>{evento.zona_horaria}</td>
                                    <td>{evento.invitados}</td>
                                    <td>{evento.descripcion || "Sin descripción"}</td>
                                    <td>{evento.repeticion}</td>
                                    <td>{evento.recordatorio ? "Sí" : "No"}</td>
                                    <td>{evento.clasificacion || "Sin clasificación"}</td>
                                    <td>{evento.lugar}</td>
                                    <td >
                                        <div className="d-flex ">
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => onEdit(evento.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onDelete(evento.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>

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
