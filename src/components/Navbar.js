import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLanguage} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const {t, i18n} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const closeNav = () => setIsOpen(false);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top container-navbar">
            <div className="container">
                <NavLink className="navbar-brand " to="/">
                    <div className="container-title">
                        {t('navbar.eventManagementSystem')}
                    </div>
                </NavLink>
                <div className="nav-options">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={isOpen}
                            aria-label="Toggle navigation" onClick={toggle}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}
                                    to="/eventos"
                                    onClick={closeNav}>
                                    {t('navbar.events')}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}
                                    to="/ubicaciones"
                                    onClick={closeNav}>
                                    {t('navbar.locations')}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}
                                    to="/contactos"
                                    onClick={closeNav}>
                                    {t('navbar.contacts')}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <button className="btn btn-secondary dropdown-toggle d-flex align-items-center "
                    type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="icon-language">
                    {t('language.changeLanguage')}
                </div>
                <FontAwesomeIcon className="mx-1" icon={faLanguage}/>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="#" onClick={() => changeLanguage('en')}>{t('navbar.english')}</a>
                </li>
                <li><a className="dropdown-item" href="#" onClick={() => changeLanguage('es')}>{t('navbar.spanish')}</a>
                </li>
            </ul>
        </nav>
    );


};

export default Navbar;
