import React, {useState, useEffect} from 'react';
import api from '../services/api';
import '../i18nConfig';
import {useTranslation} from "react-i18next";

const Home = () => {
    const [eventosDestacados, setEventosDestacados] = useState([]);
    const [error, setError] = useState(null);
    const {t} = useTranslation();

    useEffect(() => {
        const fetchEventosDestacados = async () => {
            try {
                const response = await api.get('/eventos/');
                setEventosDestacados(response.data.slice(0, 3));
            } catch (error) {
                console.error('Error al cargar eventos destacados:', error);
                // setError(t('errors.fetchingEvents'));
            }
        };

        fetchEventosDestacados();
    }, [t]);  // Include `t` to handle changes in language

    return (
        <div className="container-body form">
            <div className="text-center mb-5">
                <h1 className="display-4">{t('home.title')}</h1>
                <p className="lead">{t('home.subtitle')}</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <section className="text-center mb-5">
                <h2>{t('home.titleVideo')}</h2> {/* Example title use */}
                {/*<div className='player-wrapper'>
                    <ReactPlayer
                        url='https://www.youtube.com/watch?v=61_G4TtJlog'
                        className='react-player'
                        playing
                        width='100%'
                        height='100%'
                        controls={true}
                    />
                </div>*/}
            </section>

            <section className="mb-5">
                <h2>{t('home.whatYouCanDo')}</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <strong>{t('home.eventManagement')}</strong> {t('home.eventDetails')}
                    </li>
                    <li className="list-group-item">
                        <strong>{t('home.locations')}</strong> {t('home.locationDetails')}
                    </li>
                    <li className="list-group-item">
                        <strong>{t('home.contacts')}</strong> {t('home.contactDetails')}
                    </li>
                </ul>
            </section>
            <section>
                <h2 className="mb-4">{t('home.featuredEvents')}</h2>
                <div className="row">
                    {eventosDestacados.length > 0 ? (
                        eventosDestacados.map((evento) => (
                            <div className="col-md-4" key={evento.id}>
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-body">
                                        <span className="card-title">{evento.titulo}</span>
                                        <p className="card-text">
                                            {evento.descripcion ? evento.descripcion : t('home.descriptionUnavailable')}
                                        </p>
                                        <p className="card-text">
                                            <small
                                                className="text-muted">{t('home.dateTime')} {new Date(evento.fecha_hora).toLocaleString()}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>{t('home.noEventsAvailable')}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
