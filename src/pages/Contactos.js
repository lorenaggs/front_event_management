import React, { useState, useEffect } from 'react';
import ContactoForm from '../components/ContactoForm';
import api from '../services/api';

const Contactos = () => {
    const [contactos, setContactos] = useState([]);
    const [selectedContacto, setSelectedContacto] = useState(null); // Estado para el contacto seleccionado

    // Cargar contactos desde la API
    useEffect(() => {
        const fetchContactos = async () => {
            try {
                const response = await api.get('/contactos/');
                setContactos(response.data);
            } catch (error) {
                console.error('Error al cargar contactos:', error);
            }
        };

        fetchContactos();
    }, []);

    // Manejar el envío del formulario para agregar o actualizar
    const handleAddOrUpdateContacto = async (contacto) => {
        const formData = new FormData();
        Object.keys(contacto).forEach((key) => {
            if (key === 'fotografia' && typeof contacto[key] !== 'object') {
                return; // No añadir la imagen si no es un archivo
            }
            formData.append(key, contacto[key]);
        });

        try {
            if (selectedContacto) {
                // Actualizar contacto
                const response = await api.put(`/contactos/${selectedContacto.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setContactos(
                    contactos.map((c) => (c.id === selectedContacto.id ? response.data : c))
                );
                alert('Contacto actualizado correctamente');
            } else {
                // Agregar contacto
                const response = await api.post('/contactos/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setContactos([...contactos, response.data]);
                alert('Contacto agregado correctamente');
            }
        } catch (error) {
            console.error('Error al guardar contacto:', error);
            alert('Hubo un error al guardar el contacto.');
        } finally {
            setSelectedContacto(null); // Limpia el formulario
        }
    };

    // Manejar la edición de un contacto
    const onEdit = (id) => {
        const contacto = contactos.find((c) => c.id === id);
        setSelectedContacto(contacto); // Pasa los datos al formulario
    };

    // Manejar la eliminación de un contacto
    const onDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
            try {
                await api.delete(`/contactos/${id}/`);
                setContactos(contactos.filter((c) => c.id !== id)); // Elimina el contacto de la lista
                alert('Contacto eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar contacto:', error);
                alert('Hubo un error al eliminar el contacto.');
            }
        }
    };

    return (
        <div className="container form">
            <h1 className="text-center mb-4">Gestión de Contactos</h1>
            <ContactoForm
                onSubmit={handleAddOrUpdateContacto}
                initialData={selectedContacto}
            />
            <div className="mt-5">
                <h2>Lista de Contactos</h2>
                {contactos.length === 0 ? (
                    <p>No hay contactos registrados.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Saludo</th>
                                <th>Nombre Completo</th>
                                <th>Número de Identificación</th>
                                <th>Correo Electrónico</th>
                                <th>Número de Teléfono</th>
                                <th>Fotografía</th>
                                <th>Acciones</th>
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
                                            <img
                                                src={contacto.fotografia}
                                                alt={contacto.nombre_completo}
                                                className="img-thumbnail"
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        ) : (
                                            'No disponible'
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => onEdit(contacto.id)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(contacto.id)}
                                        >
                                            Eliminar
                                        </button>
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

export default Contactos;
