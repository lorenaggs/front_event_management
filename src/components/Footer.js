import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();
    const creatorName = "Lorena Guartazaca";

    return (
        <footer className="bg-dark text-white py-3 fixed-bottom" aria-label="Footer">
                <div className="container text-center">
                    <p role="contentinfo" aria-live="polite">
                        {t('footer.copyright', {year: currentYear})}
                    </p>
                    <p className="d-flex align-items-center justify-content-center">
                        {t('footer.createdBy', {name: creatorName})}
                        <a href="https://www.linkedin.com/in/lorenaggs" target="_blank" aria-label="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedin} className="ms-2 icon-linkedin"/>
                        </a>
                        <a href="https://wa.me/593994607544" target="_blank" aria-label="WhatsApp">
                            <FontAwesomeIcon icon={faWhatsapp} className="ms-2 icon-whatsapp"/>
                        </a>
                    </p>
                </div>
        </footer>
    );
};

export default Footer;
