import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const UbicacionForm = ({ onSubmit, initialData = null }) => {
    const { t } = useTranslation();
    const [ubicacion, setUbicacion] = useState({
        titulo: '',
        direccion: '',
        coordenadas: '',
    });

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
        setUbicacion(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(ubicacion);
        setUbicacion({
            titulo: '',
            direccion: '',
            coordenadas: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">{t('ubicacionForm.title')}</label>
                <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={ubicacion.titulo}
                    onChange={handleChange}
                    required
                    placeholder={t('ubicacionForm.placeholderTitle')}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="direccion" className="form-label">{t('ubicacionForm.address')}</label>
                <textarea
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    value={ubicacion.direccion}
                    onChange={handleChange}
                    rows="3"
                    required
                    placeholder={t('ubicacionForm.placeholderAddress')}
                ></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="coordenadas" className="form-label">{t('ubicacionForm.coordinates')}</label>
                <input
                    type="text"
                    className="form-control"
                    id="coordenadas"
                    name="coordenadas"
                    value={ubicacion.coordenadas}
                    onChange={handleChange}
                    required
                    placeholder={t('ubicacionForm.placeholderCoordinates')}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                {initialData ? t('ubicacionForm.updateButton') : t('ubicacionForm.submitButton')}
            </button>
        </form>
    );
};

export default UbicacionForm;
