import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const EventoForm = ({onAddOrUpdate, initialData = null}) => {
    const [evento, setEvento] = useState({
        titulo: '',
        invitados: '',
        fecha_hora: '',
        zona_horaria: '',
        descripcion: '',
        repeticion: 'Ninguna', // Default value for repetition
        recordatorio: false,
        clasificacion: '',
        lugar: '',
    });
    const {t} = useTranslation();

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
        if (!evento.titulo || !evento.fecha_hora || !evento.lugar) {
            alert(t('eventoForm.mandatoryFields'));
            return;
        }

        if (typeof onAddOrUpdate === 'function') {
            onAddOrUpdate(evento);
        } else {
            console.error('onAddOrUpdate is not a function');
        }
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
                <label htmlFor="titulo" className="form-label">{t('eventoForm.title')}</label>
                <input type="text" className="form-control" id="titulo" name="titulo" value={evento.titulo}
                       onChange={handleChange} required placeholder={t('eventoForm.placeholderTitle')}/>
            </div>
            <div className="mb-3">
                <label htmlFor="invitados" className="form-label">{t('eventoForm.guests')}</label>
                <textarea className="form-control" id="invitados" name="invitados" value={evento.invitados}
                          onChange={handleChange} rows="3" placeholder={t('eventoForm.placeholderGuests')}/>
            </div>
            <div className="mb-3">
                <label htmlFor="fecha_hora" className="form-label">{t('eventoForm.dateTime')}</label>
                <input type="datetime-local" className="form-control" id="fecha_hora" name="fecha_hora"
                       value={evento.fecha_hora} onChange={handleChange} required
                       placeholder={t('eventoForm.placeholderDateTime')}/>
            </div>
            <div className="mb-3">
                <label htmlFor="zona_horaria" className="form-label">{t('eventoForm.timeZone')}</label>
                <select className="form-control" id="zona_horaria" name="zona_horaria" value={evento.zona_horaria}
                        onChange={handleChange} required placeholder={t('eventoForm.placeholderTimeZone')}>
                    <option value="">{t('eventoForm.selectTimeZone')}</option>
                    <option value="UTC-5">UTC-5</option>
                    <option value="UTC+0">UTC+0</option>
                    <option value="UTC+5">UTC+5</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">{t('eventoForm.description')}</label>
                <textarea className="form-control" id="descripcion" name="descripcion" value={evento.descripcion}
                          onChange={handleChange} rows="4" placeholder={t('eventoForm.placeholderDescription')}/>
            </div>
            <div className="mb-3">
                <label htmlFor="repeticion" className="form-label">{t('eventoForm.repetition')}</label>
                <select className="form-control" id="repeticion" name="repeticion" value={evento.repeticion}
                        onChange={handleChange} placeholder={t('eventoForm.placeholderRepetition')}>
                    <option value="Ninguna">{t('eventoForm.none')}</option>
                    <option value="Diaria">{t('eventoForm.daily')}</option>
                    <option value="Semanal">{t('eventoForm.weekly')}</option>
                </select>
            </div>
            <div className="mb-3 form-check">
                <label className="form-check-label" htmlFor="recordatorio">{t('eventoForm.reminder')}</label>
                <input type="checkbox" className="form-check-input" id="recordatorio" name="recordatorio"
                       checked={evento.recordatorio} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="clasificacion" className="form-label">{t('eventoForm.classification')}</label>
                <input type="text" className="form-control" id="clasificacion" name="clasificacion"
                       value={evento.clasificacion} onChange={handleChange}
                       placeholder={t('eventoForm.placeholderClassification')}/>
            </div>
            <div className="mb-3">
                <label htmlFor="lugar" className="form-label">{t('eventoForm.place')}</label>
                <input type="text" className="form-control" id="lugar" name="lugar" value={evento.lugar}
                    onChange={handleChange} required placeholder={t('eventoForm.placeholderPlace')}/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                {initialData ? t('eventoForm.submitChanges') : t('eventoForm.submit')}
            </button>
        </form>

    );
};

export default EventoForm;
