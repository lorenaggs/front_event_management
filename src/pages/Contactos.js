import React, { useState, useEffect } from 'react';
import ContactoForm from '../components/ContactoForm';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contactos = () => {
    const [contactos, setContactos] = useState([]);
    const [selectedContacto, setSelectedContacto] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await api.get('/contactos/');
                setContactos(response.data);
            } catch (error) {
                console.error('Error al cargar contactos:', error);
                //toast.error(t('contactManagement.errorLoadingEvents'));
            }
        };
        fetchContactos();
    }, []);

    const handleAddOrUpdateContacto = async (contacto) => {
        const formData = new FormData();
        Object.keys(contacto).forEach(key => formData.append(key, contacto[key]));
        try {
            const response = selectedContacto
                ? await api.put(`/contactos/${selectedContacto.id}/`, formData)
                : await api.post('/contactos/', formData);

            const updatedContactos = selectedContacto
                ? contactos.map(c => c.id === selectedContacto.id ? response.data : c)
                : [...contactos, response.data];

            setContactos(updatedContactos);
            toast.success(selectedContacto ? t('contactManagement.contactUpdated') : t('contactManagement.contactAdded'));
        } catch (error) {
            console.error('Error al guardar contacto:', error);
            toast.error(t('contactManagement.errorSaving'));
        } finally {
            setSelectedContacto(null);
        }
    };

    const onEdit = (id) => {
        const contacto = contactos.find(c => c.id === id);
        setSelectedContacto(contacto);
    };

    const onDelete = async (id) => {
        if (window.confirm(t('contactManagement.confirmDelete'))) {
            try {
                await api.delete(`/contactos/${id}/`);
                setContactos(contactos.filter(c => c.id !== id));
                toast.success(t('contactManagement.contactDeleted'));
            } catch (error) {
                console.error('Error al eliminar contacto:', error);
                toast.error(t('contactManagement.errorDeleting'));
            }
        }
    };

    return (
        <div className="container form">
            <ToastContainer />
            <h1 className="text-center mb-4">{t('contactManagement.pageTitle')}</h1>
            <ContactoForm onSubmit={handleAddOrUpdateContacto} initialData={selectedContacto} />
            <div className="mt-5">
                <h2>{t('contactManagement.contactListTitle')}</h2>
                {contactos.length === 0 ? (
                    <p>{t('contactManagement.noContactsRegistered')}</p>
                ) : (
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                        <tr>
                            <th>{t('contactManagement.headerNumber')}</th>
                            <th>{t('contactManagement.headerGreeting')}</th>
                            <th>{t('contactManagement.headerFullName')}</th>
                            <th>{t('contactManagement.headerID')}</th>
                            <th>{t('contactManagement.headerEmail')}</th>
                            <th>{t('contactManagement.headerPhone')}</th>
                            <th>{t('contactManagement.headerPhoto')}</th>
                            <th>{t('contactManagement.headerActions')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contactos.map((contacto, index) => (
                            <tr key={contacto.id}>
                                <td>{index + 1}</td>
                                <td>{contacto.saludo}</td>
                                <td>{contacto.nombre_completo}</td>
                                <td>{contacto.numero_identificacion}</td>
                                <td>{contacto.correo_electronico}</td>
                                <td>{contacto.numero_telefono}</td>
                                <td>
                                    {contacto.fotografia ? (
                                        <img src={contacto.fotografia} alt={contacto.nombre_completo} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    ) : t('contactManagement.noAvailable')}
                                </td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(contacto.id)}>
                                        {t('contactManagement.edit')}
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(contacto.id)}>
                                        {t('contactManagement.delete')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Contactos;
