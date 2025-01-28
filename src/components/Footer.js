import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-3 fixed-bottom">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Gestión de Eventos. Todos los derechos reservados.</p>
                <p>Realizado por: <strong>Lorena Guartazaca</strong></p>
            </div>
        </footer>
    );
};

export default Footer;
