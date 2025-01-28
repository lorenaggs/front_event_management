import React, { useState, useEffect } from 'react';

const UbicacionForm = ({ onSubmit, initialData = null }) => {
    const [ubicacion, setUbicacion] = useState({
        titulo: '',
        direccion: '',
        coordenadas: '',
    });

    // Actualizar el formulario con datos iniciales o resetearlo
    useEffect(() => {
        if (initialData) {
            setUbicacion(initialData);
        } else {
            setUbicacion({
                titulo: '',
                direccion: '',
                coordenadas: '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUbicacion({
            ...ubicacion,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(ubicacion); // Llama a la función de creación o edición
        setUbicacion({
            titulo: '',
            direccion: '',
            coordenadas: '',
        }); // Resetea el formulario después de guardar
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    value={ubicacion.titulo}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Dirección</label>
                <textarea
                    className="form-control"
                    name="direccion"
                    value={ubicacion.direccion}
                    onChange={handleChange}
                    rows="3"
                    required
                ></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Coordenadas</label>
                <input
                    type="text"
                    className="form-control"
                    name="coordenadas"
                    value={ubicacion.coordenadas}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">
                {initialData ? 'Guardar Cambios' : 'Guardar Ubicación'}
            </button>
        </form>
    );
};

export default UbicacionForm;
