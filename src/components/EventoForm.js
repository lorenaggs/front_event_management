import React, { useState, useEffect } from 'react';

const EventoForm = ({ onAdd, initialData = null }) => {
    const [evento, setEvento] = useState({
        titulo: '',
        invitados: '',
        fecha_hora: '',
        zona_horaria: '',
        descripcion: '',
        repeticion: 'Ninguna', // Valor predeterminado para repetición
        recordatorio: false,
        clasificacion: '',
        lugar: '',
    });

    // Actualiza el estado inicial cuando `initialData` cambia
    useEffect(() => {
        if (initialData) {
            setEvento(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEvento({
            ...evento,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación básica antes de enviar
        if (!evento.titulo || !evento.fecha_hora || !evento.lugar) {
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }

        // Enviar datos al backend a través del prop `onAdd`
        onAdd(evento);

        // Limpiar formulario solo si no es edición
        if (!initialData) {
            setEvento({
                titulo: '',
                invitados: '',
                fecha_hora: '',
                zona_horaria: '',
                descripcion: '',
                repeticion: 'Ninguna',
                recordatorio: false,
                clasificacion: '',
                lugar: '',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    value={evento.titulo}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Invitados</label>
                <textarea
                    className="form-control"
                    name="invitados"
                    value={evento.invitados}
                    onChange={handleChange}
                    rows="3"
                ></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Fecha y Hora</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    name="fecha_hora"
                    value={evento.fecha_hora}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Zona Horaria</label>
                <select
                    className="form-control"
                    name="zona_horaria"
                    value={evento.zona_horaria}
                    onChange={handleChange}
                    required
                >
                    <option value="UTC-5">UTC-5</option>
                    <option value="UTC+0">UTC+0</option>
                    <option value="UTC+5">UTC+5</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                    className="form-control"
                    name="descripcion"
                    value={evento.descripcion}
                    onChange={handleChange}
                    rows="4"
                ></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Repetición</label>
                <select
                    className="form-control"
                    name="repeticion"
                    value={evento.repeticion}
                    onChange={handleChange}
                >
                    <option value="Ninguna">Ninguna</option>
                    <option value="Diaria">Diaria</option>
                    <option value="Semanal">Semanal</option>
                </select>
            </div>

            <div className="mb-3 form-check">
                <label className="form-check-label">Recordatorio</label>
                <input
                    type="checkbox"
                    className="form-check-input"
                    name="recordatorio"
                    checked={evento.recordatorio}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Clasificación</label>
                <input
                    type="text"
                    className="form-control"
                    name="clasificacion"
                    value={evento.clasificacion}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Lugar</label>
                <input
                    type="text"
                    className="form-control"
                    name="lugar"
                    value={evento.lugar}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">
                {initialData ? 'Guardar Cambios' : 'Guardar Evento'}
            </button>
        </form>
    );
};

export default EventoForm;
